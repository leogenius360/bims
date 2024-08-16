import { db } from '@/config/firebase-config';
import { User } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';

export interface NewProductProps {
    name: string; inventoryMethod: InventoryMethod; imageUrl: string; category: string; description: string
}

export enum InventoryMethod {
    LIFO = 'LIFO',
    FIFO = 'FIFO',
}

export class Product {
    id: string;
    name: string;
    imageUrl: string;
    category: string;
    description: string;
    inventoryMethod: InventoryMethod;
    latestUpdateBy?: string;
    latestUpdateDate?: Date;

    constructor({ name, inventoryMethod, imageUrl, category, description }: NewProductProps, authUser?: User) {
        this.id = name.split(" ").join("-").toLowerCase();
        this.name = name;
        this.inventoryMethod = inventoryMethod;
        this.imageUrl = imageUrl;
        this.category = category;
        this.description = description;
        this.latestUpdateBy = authUser?.displayName ? authUser.displayName : authUser?.email ? authUser.email : undefined;
        this.latestUpdateDate = new Date();
    }

    stock = async function* () {
        const inStocks = await InStock.getAll();
        for (const stock of inStocks) {
            if (!stock.pending && stock.isVerified()) {
                yield stock;
            }
        }
    };

    currentStock = async () => {
        const inStocks = await InStock.getAll();
        return inStocks.reduce((total, stock) => {
            if (!stock.pending && stock.isVerified()) {
                total += stock.quantity;
            }
            return total;
        }, 0);
    };

    pendingStock = async () => {
        const inStocks = await InStock.getAll();
        return inStocks.reduce((total, stock) => {
            if (stock.pending || !stock.isVerified()) {
                total += stock.quantity;
            }
            return total;
        }, 0);
    };

    pendingOutStock = async () => {
        const outStocks = await OutStock.getAll();
        return outStocks.reduce((total, stock) => {
            if (stock.pending || !stock.isVerified()) {
                total += stock.quantity;
            }
            return total;
        }, 0);
    };

    static async get(id: string): Promise<Product | null> {
        const docRef = doc(db, 'Products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const product = new Product(data as Product);
            product.latestUpdateBy = data.latestUpdateBy;
            product.latestUpdateDate = data.latestUpdateDate.toDate();
            return product;
        } else {
            return null;
        }
    }

    static async getAll(): Promise<Product[]> {
        const querySnapshot = await getDocs(collection(db, 'Products'));
        const products: Product[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const product = new Product(data as Product);
            product.latestUpdateBy = data.latestUpdateBy;
            product.latestUpdateDate = data.latestUpdateDate.toDate();
            products.push(product);
        });
        return products;
    }

    async save(): Promise<void> {
        const docRef = doc(db, 'Products', this.id);
        await setDoc(docRef, {
            name: this.name,
            inventoryMethod: this.inventoryMethod,
            imageUrl: this.imageUrl,
            category: this.category,
            description: this.description,
            latestUpdateBy: this.latestUpdateBy,
            latestUpdateDate: new Date()
        });
    }

    async update(data: Partial<Product>, authUser?: User): Promise<void> {
        const docRef = doc(db, 'Products', this.id);
        data.latestUpdateBy = authUser?.displayName ? authUser.displayName : authUser?.email ? authUser.email : undefined;
        data.latestUpdateDate = new Date();
        await updateDoc(docRef, { ...data });
    }

    async getInStock(all: boolean = false) {
        const stocks = await InStock.getAll();
        return stocks.filter(stock => all || (!stock.pending && stock.isVerified()));
    }

    async getOutStock(all: boolean = false) {
        const stocks = await OutStock.getAll();
        return stocks.filter(stock => all || (!stock.pending && stock.isVerified()));
    }

    async getPrice(all: boolean = false): Promise<number> {
        const stocks = await this.getInStock(all);
        if (this.inventoryMethod === InventoryMethod.LIFO) {
            return stocks.length ? stocks[stocks.length - 1].price : 0;
        } else {
            return stocks.length ? stocks[0].price : 0;
        }
    }

    async updateStock(qty: number): Promise<void> {
        for await (const stock of this.stock()) {
            if (qty <= stock.quantity) {
                stock.quantity -= qty;
                await stock.save();
                break;
            } else {
                qty -= stock.quantity;
                stock.quantity = 0;
                await stock.save();
            }
        }
    }

    static async delete(id: string): Promise<void> {
        const docRef = doc(db, 'Products', id);
        await deleteDoc(docRef);
    }
}


export enum StockType {
    InStock = 'In-stock',
    OutStock = 'Out-stock',
}

interface TransactionVerification {
    user: User;
    isVerified: boolean;
}

export interface StocksProps {
    id?: string;
    productId: string;
    description: string;
    price: number;
    quantity: number;
    expenses: number;
    pending: boolean;
    verifications: TransactionVerification[];
    createdBy?: User;
    createdDate?: Date | undefined;

    from?: string;
    to?: string;
}

abstract class BaseStock {
    stockType!: StockType;

    id: string;
    productId: string;
    description: string;
    price: number;
    quantity: number;
    expenses: number;
    pending: boolean;
    verifications: TransactionVerification[];
    createdBy?: User;
    createdDate?: Date;
    
    from?: string;
    to?: string;

    constructor({ productId, description, price, quantity, expenses, verifications, from, to, pending = true }: StocksProps, authUser?: User) {
        this.id = "";
        this.productId = productId;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.expenses = expenses;
        this.pending = pending;
        this.verifications = verifications;
        this.createdBy = authUser;
        this.createdDate = new Date();
        this.from = from
        this.to = to
    }

    isVerified = () => {
        return this.verifications.every((verification) => verification.isVerified);
    };

    protected generateId(): string {
        return `${this.productId}:${this.stockType}:${new Date().toISOString()}`;
    }
    

    static async get<T extends BaseStock>(this: new (props: StocksProps, authUser?: User) => T, id: string): Promise<T | null> {
        const instance = new this({} as StocksProps);
        const docRef = doc(db, `Products/${instance.productId}/${instance.stockType}`, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const stock = new this({
                productId: data.productId,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                expenses: data.expenses,
                pending: data.pending,
                verifications: data.verifications,
                from: data.from,
                to: data.to
            });
            stock.id = data.id;
            stock.createdBy = data.createdBy;
            stock.createdDate = data.createdDate.toDate();
            return stock;
        } else {
            return null;
        }
    }

    static async getAll<T extends BaseStock>(this: new (props: StocksProps, authUser?: User) => T): Promise<T[]> {
        const instance = new this({} as StocksProps);
        const stocks: T[] = [];
        const querySnapshot = await getDocs(collection(db, `PProducts/${instance.productId}/${instance.stockType}`));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const stock = new this({
                productId: data.productId,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                expenses: data.expenses,
                pending: data.pending,
                verifications: data.verifications,
                from: data.from,
                to: data.to
            });
            stock.id = data.id;
            stock.createdBy = data.createdBy;
            stock.createdDate = data.createdDate.toDate();
            stocks.push(stock);
        });
        return stocks;
    }

    async save(): Promise<void> {
        this.id = this.generateId();
        const docRef = doc(db, `Products/${this.productId}/${this.stockType}`, this.id);
        const data = {
            id: this.id,
            productId: this.productId,
            description: this.description,
            price: this.price,
            quantity: this.quantity,
            expenses: this.expenses,
            pending: this.pending,
            verifications: this.verifications,
            createdBy: this.createdBy,
            createdDate: this.createdDate,
            from: this.from,
            to: this.to
        }
        await setDoc(docRef, data);
    }

    async verify(user: User): Promise<void> {
        const docRef = doc(db, `Products/${this.productId}/${this.stockType}`, this.id);
        if (this.verifications.some((v) => v.user.email === user.email && v.isVerified)) {
            console.warn("User has already verified this stock.");
            return;
        }
        this.verifications.push({ user: user, isVerified: true });
        await updateDoc(docRef, { verifications: this.verifications });
    }

    async delete(): Promise<void> {
        const docRef = doc(db, `Products/${this.productId}/${this.stockType}`, this.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const stockData = docSnap.data();
            const canDelete = !stockData.verifications.some((verification: TransactionVerification) => verification.isVerified);

            if (canDelete) {
                await deleteDoc(docRef);
            }
        }
    }
}

export class InStock extends BaseStock {
    from: string

    constructor(props: StocksProps, authUser?: User) {
        super(props, authUser);
        this.stockType = StockType.InStock;
        this.from = props.from!;
    }
}

export class OutStock extends BaseStock {
    to: string

    constructor(props: StocksProps, authUser?: User) {
        super(props, authUser);
        this.stockType = StockType.OutStock;
        this.to = props.to!;
    }

}


export enum StockTransactionType {
    InStock = "In-stock",
    OutStock = "Out-stock",
    InStockRequest = "In-stock request",
    OutStockRequest = "Out-stock request",
}


export interface StockProductProps {
    productId: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
}

abstract class Stock{
    id: string
    products: StockProductProps[]
    expenses: number
    description: string

    verifications: TransactionVerification[]
    processedBy: string
    date: Date

    constructor(products: StockProductProps[], expenses: number, description: string, verifications: TransactionVerification[], processedBy: string) {
        this.id = ""
        this.products = products
        this.expenses = expenses
        this.description = description
        this.verifications = verifications
        this.processedBy = processedBy
        this.date = new Date()
    }
    
    isVerified = () => {
        return this.verifications.every((verification) => verification.isVerified);
    };

}

export class InStock2 extends Stock{
    origin: string

    constructor(products: StockProductProps[], origin:string, expenses: number, description: string, verifications:TransactionVerification[], processedBy: string) {
        super(products, expenses, description, verifications, processedBy)
        this.origin = origin
    }
}

export class OutStock2 extends Stock{
    destination: string

    constructor(products: StockProductProps[], destination:string, expenses: number, description: string, verifications:TransactionVerification[], processedBy: string) {
        super(products, expenses, description, verifications, processedBy)
        this.destination = destination
    }
}

