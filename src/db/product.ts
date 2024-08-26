import { db } from '@/config/firebase-config';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';
import { PaymentProps, PaymentStatus, Sales, SalesProductProps, SalesProps, TransactionVerification } from './sales';
import { BaseUser } from '@/types/db';
import { StockRequestProduct } from '@/stock-request/provider';
import { isAdminUser } from '@/auth/utils';
import { User } from 'firebase/auth';


export interface ProductStockProps {
    qty: number;
    incoming: number;
    outgoing: number;
}

export interface NewProductProps {
    name: string;
    // inventoryMethod: InventoryMethod;
    price: number;
    stock: ProductStockProps;
    category: string;
    imageUrl: string;
    description?: string
}

// export enum InventoryMethod {
//     LIFO = 'LIFO',
//     FIFO = 'FIFO',
// }

export class Product {
    id: string;
    name: string;
    price: number;
    stock: ProductStockProps;
    imageUrl: string;
    category: string;
    description?: string;
    // inventoryMethod: InventoryMethod;
    latestUpdateBy?: string;
    latestUpdateDate?: Date;

    constructor({ name, price, stock, imageUrl, category, description }: NewProductProps, authUser?: BaseUser) {
        this.id = name.split(" ").join("-").toLowerCase();
        this.name = name;
        this.price = price;
        this.stock = stock;
        // this.inventoryMethod = inventoryMethod;
        this.imageUrl = imageUrl;
        this.category = category;
        this.description = description;
        this.latestUpdateBy = authUser?.displayName ? authUser.displayName : authUser?.email ? authUser.email : undefined;
        this.latestUpdateDate = new Date();
    }

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

    async getPendingStocks(): Promise<StockRequestProduct[]> {
        const pendingProducts: StockRequestProduct[] = [];

        try {
            // Fetch all stock requests
            const allRequests = await StockRequest.getAll();

            // Filter through the requests to find those that are fully verified
            for (const request of allRequests) {
                if (request.isVerified()) {
                    // Filter the products in the request to find those matching this product's ID
                    const matchingProducts = request.products.filter((product) => product.id === this.id);

                    // Add the matching products to the pending products list
                    pendingProducts.push(...matchingProducts);
                }
            }
        } catch (e) {
            throw e
        }

        return pendingProducts;
    }

    async getPendingDelivery(): Promise<SalesProductProps[]> {
        const pendingDelivery: SalesProductProps[] = [];

        try {
            // Fetch all stock requests
            const allSales = await Sales.getAll();

            // Filter through the requests to find those that are fully verified
            for (const sales of allSales) {
                if (sales.isPending()) {
                    // Filter the products in the sales to find those matching this product's ID
                    const matchingProducts = sales.products.filter((product) => product.id === this.id);

                    // Add the matching products to the pending delivery list
                    pendingDelivery.push(...matchingProducts);
                }
            }
        } catch (e) {
            throw e
        }

        return pendingDelivery;
    }

    async save(): Promise<void> {
        const docRef = doc(db, 'Products', this.id);
        await setDoc(docRef, {
            name: this.name,
            price: this.price,
            stock: this.stock,
            // inventoryMethod: this.inventoryMethod,
            imageUrl: this.imageUrl,
            category: this.category,
            description: this.description || "",
            latestUpdateBy: this.latestUpdateBy || "",
            latestUpdateDate: new Date()
        });
    }

    async update(data: Partial<Product>, authUser?: BaseUser): Promise<void> {
        const docRef = doc(db, 'Products', this.id);
        if (authUser) data.latestUpdateBy = authUser?.displayName ? authUser.displayName : authUser?.email ? authUser.email : undefined;
        data.latestUpdateDate = new Date();
        await updateDoc(docRef, { ...data });
    }

    async updateStock({ qty, isSales, pending = true }: { qty: number, isSales?: boolean, pending?: boolean }): Promise<void> {
        if (isSales) {
            if (this.stock?.qty) this.stock?.qty - qty
            else this.stock = { ...this.stock, incoming: qty }
        } else if (pending) {
            if (this.stock?.incoming) {
                this.stock.incoming += qty
            } else {
                this.stock = { ...this.stock, incoming: qty }
            }
        } else if (this.stock?.qty) {
            this.stock.qty += qty
        } else {
            this.stock = { ...this.stock, qty: qty }
        }

        await this.save()
    }

    static async delete(id: string): Promise<void> {
        const docRef = doc(db, 'Products', id);
        await deleteDoc(docRef);
    }
}

export interface StockProductProps extends SalesProductProps { }


export interface StockProps {
    products: SalesProductProps[];
    payment?: PaymentProps
    expenses?: number;
    description: string;
    supplier: SupplierProps
}


export interface SupplierProps {
    name: string;
    email?: string;
    contact?: string;
    address?: string
}


export class Stock {
    id: string;
    products: StockProductProps[];
    payment?: PaymentProps;
    expenses?: number
    description: string;
    supplier: SupplierProps

    verifications: TransactionVerification[]
    processedBy: string
    date: Date

    constructor({ description, products, payment, expenses, supplier }: StockProps, authUser?: BaseUser) {
        this.id = ""
        this.products = products
        this.payment = payment;
        this.expenses = expenses
        this.supplier = supplier
        this.description = description
        this.verifications = []
        this.processedBy = authUser?.displayName ? authUser.displayName : authUser?.email ? authUser.email : "undefined";
        this.date = new Date()
    }

    async getTotalCost(): Promise<number> {
        return this.products.reduce((total, product) => total + product.price * product.qty, 0);
    }

    isVerified = () => {
        return this.verifications.every((verification) => verification.isVerified);
    };


    static async get(id: string): Promise<Stock | null> {
        const docRef = doc(db, 'Stocks', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const sales = new Stock({
                products: data.products,
                payment: data.payment,
                expenses: data.expenses,
                supplier: data.supplier,
                description: data.description,
                verifications: data.verifications,
                processedBy: data.processedBy
            } as StockProps);
            sales.id = data.id;
            sales.date = data.date;
            return sales;
        } else {
            return null;
        }
    }

    static async getAll(): Promise<Stock[]> {
        const allSales: Stock[] = [];
        const querySnapshot = await getDocs(collection(db, 'Stocks'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const sales = new Stock({
                products: data.products,
                payment: data.payment,
                expenses: data.expenses,
                supplier: data.supplier,
                description: data.description,
                verifications: data.verifications,
                processedBy: data.processedBy
            } as StockProps);
            sales.id = data.id;
            sales.date = data.date;
            allSales.push(sales);
        });
        return allSales;
    }

    async save(): Promise<void> {
        this.id = `${this.processedBy}::${new Date().toISOString()}`;
        for (const product of this.products) {
            const p = await Product.get(product.id);
            if (p) {
                await p.updateStock({ qty: product.qty, pending: false });
            } else throw Error(`Product ${product.name} does not exist in products`) // else remove the product `p` the stock products
        }
        const docRef = doc(db, 'Stocks', this.id);
        await setDoc(docRef, {
            id: this.id,
            products: this.products,
            payment: this.payment || {},
            expenses: this.expenses || 0,
            supplier: this.supplier,
            description: this.description,
            verifications: this.verifications,
            processedBy: this.processedBy,
            date: new Date()
        });
    }

    async updatePayment({ amountPaid }: { amountPaid: number }): Promise<void> {
        const docRef = doc(db, 'Stocks', this.id);
        if (!this.payment) this.payment = { amountPaid: 0 }
        const currentAmount = this.payment.amountPaid! + amountPaid;
        const totalPrice = await this.getTotalCost();
        await updateDoc(docRef, {
            'payment.amountPaid': currentAmount,
            'payment.balance': totalPrice - currentAmount,
            'payment.status': currentAmount >= totalPrice ? PaymentStatus.FullPayment : PaymentStatus.PartPayment,
        });
    }

    async delete(): Promise<void> {
        const docRef = doc(db, 'Stocks', this.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data.payment.status.includes(PaymentStatus.FullPayment)) {
                await deleteDoc(docRef);
            }
        }
    }

    async verify(user: BaseUser): Promise<void> {
        const docRef = doc(db, "Stocks", this.id);
        if (this.verifications.some((v) => v.user.email === user.email && v.isVerified)) {
            console.warn("User has already verified this stock.");
            return;
        }
        if (this.verifications.every((v) => v.user.email !== user.email)) {
            this.verifications.push({ user: user, isVerified: true });
            return await updateDoc(docRef, { verifications: this.verifications });
        }
        this.verifications.push({ user: user, isVerified: true });
        await updateDoc(docRef, { verifications: this.verifications });
    }
}

export interface StockRequestProps {
    products: StockRequestProduct[];
    supplier: SupplierProps
}

export class StockRequest {
    id: string;
    products: StockRequestProduct[];
    supplier?: SupplierProps;

    verifications: TransactionVerification[]
    processedBy: string
    date!: Date

    constructor({ products, supplier }: StockRequestProps, authUser?: BaseUser) {
        this.id = ""
        this.products = products
        this.supplier = supplier;
        this.verifications = isAdminUser(authUser as User) ? [{ user: authUser as User, isVerified: true }] : []
        this.processedBy = authUser?.displayName ? authUser.displayName : authUser?.email ? authUser.email : "undefined";
        // this.date = new Date()
    }

    isVerified = () => {
        return this.verifications.every((verification) => verification.isVerified);
    };


    static async get(id: string): Promise<StockRequest | null> {
        const docRef = doc(db, 'Stock Requests', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const req = new StockRequest({
                products: data.products,
                supplier: data.supplier,
            });
            req.verifications = data.verifications,
                req.processedBy = data.processedBy
            req.id = data.id;
            req.date = data.date;
            return req;
        } else {
            return null;
        }
    }

    static async getAll(): Promise<StockRequest[]> {
        const allRequest: StockRequest[] = [];
        const querySnapshot = await getDocs(collection(db, 'Stock Requests'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const req = new StockRequest({
                products: data.products,
                supplier: data.supplier,
            });
            req.verifications = data.verifications,
                req.processedBy = data.processedBy
            req.id = data.id;
            req.date = data.date;
            allRequest.push(req);
        });
        return allRequest;
    }

    async save(): Promise<void> {
        this.id = `${this.processedBy}::${new Date().toISOString()}`;
        const docRef = doc(db, 'Stock Requests', this.id);

        // Serialize verifications
        const serializedVerifications = this.verifications.map((verification) => ({
            user: {
                email: verification.user.email,
                displayName: verification.user.displayName,
            },
            isVerified: verification.isVerified,
        }));

        await setDoc(docRef, {
            id: this.id,
            products: this.products,
            supplier: this.supplier,
            verifications: serializedVerifications,
            processedBy: this.processedBy,
            date: new Date()
        });
    }


    async delete(): Promise<void> {
        const docRef = doc(db, 'Stock Requests', this.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data.payment.status.includes(PaymentStatus.FullPayment)) {
                await deleteDoc(docRef);
            }
        }
    }

    async verify(user: BaseUser): Promise<void> {
        const docRef = doc(db, "Stock Requests", this.id);
        if (this.verifications.some((v) => v.user.email === user.email && v.isVerified)) {
            console.warn("User has already verified this stock.");
            return;
        }
        this.verifications.push({ user: user, isVerified: true });
        await updateDoc(docRef, { verifications: this.verifications });
    }
}

