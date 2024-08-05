import { db } from '@/config/firebase-config';
import { doc, setDoc, getDoc, updateDoc, getDocs, collection, deleteDoc } from 'firebase/firestore';


export enum TransactionVerificationPermission {
    AdminOnly = 'AdminOnly',
    StoreKeeperOnly = 'StoreKeeperOnly',
}


// PRODUCT TABLE

export class Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    description: string;
    latestUpdateBy: string;
    latestUpdateDate?: Date;

    constructor(id: string, name: string, price: number, quantity: number, imageUrl:string, description: string, latestUpdateBy: string, latestUpdateDate?: Date) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.imageUrl = imageUrl;
        this.description = description;
        this.latestUpdateBy = latestUpdateBy;
        this.latestUpdateDate = latestUpdateDate;
    }

    static async get(id: string): Promise<Product | null> {
        const docRef = doc(db, 'Products', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return new Product(data.id, data.name, data.price, data.quantity, data.imageUrl, data.description, data.latestUpdateBy, data.latestUpdateDate.toDate());
        } else {
            return null;
        }
    }

    static async getAll(): Promise<Product[]> {
        const products: Product[] = [];
        const querySnapshot = await getDocs(collection(db, 'Products'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push(new Product(
                data.id,
                data.name,
                data.price,
                data.quantity,
                data.imageUrl,
                data.description,
                data.latestUpdateBy,
                data.latestUpdateDate.toDate()
            ));
        });
        return products;
    }

    async save(): Promise<void> {
        const docRef = doc(db, 'Products', this.id);
        await setDoc(docRef, {
            id: this.id,
            name: this.name,
            price: this.price,
            quantity: this.quantity,
            imageUrl: this.imageUrl,
            description: this.description,
            latestUpdateBy: this.latestUpdateBy,
            latestUpdateDate: this.latestUpdateDate
        });
    }

    async update(updatedBy: string, name?: string, price?: number, quantity?: number, imageUrl?: string, description?: string): Promise<void> {
        const docRef = doc(db, 'Products', this.id);
        await updateDoc(docRef, {
            name: name ? name : this.name,
            price: price ? price : this.price,
            quantity: quantity ? quantity : this.quantity,
            imageUrl: imageUrl ? imageUrl : this.imageUrl,
            description: description ? description : this.description,
            latestUpdateBy: updatedBy,
            latestUpdateDate: new Date()
        });
    }
}


// STOCK TABLE

interface StocksProps {
    id: string;
    stockType: StockType;
    productId: string;
    description: string;
    price: number;
    quantity: number;
    createdBy: string;
    createdDate?: Date | undefined;
    verificationPermission: TransactionVerificationPermission;
    isVerified?: boolean | undefined;
    verifiedBy?: string | undefined;
}

export enum StockType {
    InStock = 'inStock',
    OutStock = 'outStock',
}


export class StockSchema {
    id: string;
    stockType: StockType;
    productId: string;
    description: string;
    price: number;
    quantity: number;
    createdBy: string;
    createdDate: Date;
    verificationPermission: TransactionVerificationPermission;
    isVerified: boolean;
    verifiedBy: string | undefined;

    constructor({ id,
        stockType,
        productId,
        description,
        price,
        quantity,
        createdBy,
        createdDate,
        verificationPermission,
        isVerified = false,
        verifiedBy = undefined
    }: StocksProps) {
        this.id = id;
        this.stockType = stockType;
        this.productId = productId;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.createdBy = createdBy;
        this.createdDate = createdDate ? createdDate : new Date();
        this.verificationPermission = verificationPermission;
        this.isVerified = isVerified;
        this.verifiedBy = verifiedBy;
    }

    static async get(id: string): Promise<StockSchema | null> {
        const docRef = doc(db, 'Stocks', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return new StockSchema({
                id: data.id,
                stockType: data.stockType,
                productId: data.productId,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                createdBy: data.createdBy,
                createdDate: data.createdDate.toDate(),
                verificationPermission: data.verificationPermission,
                isVerified: data.isVerified,
                verifiedBy: data.verifiedBy
            });
        } else {
            return null;
        }
    }

    static async getAll(): Promise<StockSchema[]> {
        const products: StockSchema[] = [];
        const querySnapshot = await getDocs(collection(db, 'Stocks'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push(new StockSchema({
                id: data.id,
                stockType: data.stockType,
                productId: data.productId,
                description: data.description,
                price: data.price,
                quantity: data.quantity,
                createdBy: data.createdBy,
                createdDate: data.createdDate.toDate(),
                verificationPermission: data.verificationPermission,
                isVerified: data.isVerified,
                verifiedBy: data.verifiedBy
            }));
        });
        return products;
    }

    async save(): Promise<void> {
        const docRef = doc(db, 'Products', this.id);
        await setDoc(docRef, {
            id: this.id,
            stockType: this.stockType,
            productId: this.productId,
            description: this.description,
            price: this.price,
            quantity: this.quantity,
            createdBy: this.createdBy,
            createdDate: this.createdDate,
            verificationPermission: this.verificationPermission,
            isVerified: this.isVerified,
            verifiedBy: this.verifiedBy
        });
    }

    async verify(verifiedBy: string): Promise<void> {
        const docRef = doc(db, 'Stocks', this.id);
        await updateDoc(docRef, {
            isVerified: true,
            verifiedBy: verifiedBy
        });
    }

    async delete(): Promise<void> {
        const docRef = doc(db, 'Stocks', this.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            data.isVerified ? null : await deleteDoc(docRef);
        }
    }
}


// SALES TABLE

interface SalesProductProps {
    productId: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
}

export enum PaymentStatus {
    FullPayment = "part payment",
    PartPayment = "full payment"
}

interface SalesPaymentProps {
    amountPaid: number;
    balance: number;
    status: PaymentStatus
}

export class SalesSchema {
    id: string;
    products: SalesProductProps[];
    description: string;
    payment: SalesPaymentProps;

    constructor({ id, description, products, payment }: { id: string, description: string, products: SalesProductProps[], payment: SalesPaymentProps }) {
        this.id = id;
        this.description = description;
        this.products = products;
        this.payment = payment
    }

    async getTotalPrice(): Promise<number> {
        let totalPrice = 0
        this.products.forEach((product) => {
            totalPrice += product.productPrice
        })
        return totalPrice
    }

    static async get(id: string): Promise<SalesSchema | null> {
        const docRef = doc(db, 'Sales', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return new SalesSchema({
                id: data.id,
                description: data.description,
                products: data.product,
                payment: data.payment
            });
        } else {
            return null;
        }
    }

    static async getAll(): Promise<SalesSchema[]> {
        const products: SalesSchema[] = [];
        const querySnapshot = await getDocs(collection(db, 'Sales'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push(new SalesSchema({
                id: data.id,
                description: data.description,
                products: data.product,
                payment: data.payment
            }));
        });
        return products;
    }

    async save(): Promise<void> {
        const docRef = doc(db, 'Products', this.id);
        await setDoc(docRef, {
            id: this.id,
            description: this.description,
            products: this.products,
            payment: this.payment
        });
    }

    async updatePayment({ amountPaid }: SalesPaymentProps): Promise<void> {
        const docRef = doc(db, 'Sales/payment', this.id);
        const currentAmount = this.payment.amountPaid + amountPaid
        await updateDoc(docRef, {
            amountPaid: currentAmount,
            status: currentAmount >= await this.getTotalPrice() ? PaymentStatus.FullPayment : PaymentStatus.PartPayment
        });
    }

    async delete(): Promise<void> {
        const docRef = doc(db, 'Sales', this.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            data.isVerified ? null : await deleteDoc(docRef);
        }
    }

    async verify(verifiedBy: string): Promise<void> {
        const docRef = doc(db, 'Sales', this.id);
        await updateDoc(docRef, {
            isVerified: true,
            verifiedBy: verifiedBy
        });
    }
}


// Transaction TABLE

interface TransactionProps {
    hash: string;
    previousHash: string;
    data: object
    nextHash?: string | undefined;
}

export class Transaction {
    hash: string;
    previousHash: string;
    data: object
    nextHash?: string | undefined;

    constructor({ hash, previousHash, data, nextHash = undefined }: TransactionProps) {
        this.hash = hash;
        this.previousHash = previousHash;
        this.nextHash = nextHash;
        this.data = data
    }

    static async get(hash: string): Promise<Transaction | null> {
        const docRef = doc(db, 'Transaction', hash);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            return new Transaction({
                hash: data.hash,
                previousHash: data.previousHash,
                nextHash: data.nextHash,
                data: data.data
            });
        } else {
            return null;
        }
    }

    static async getAll(): Promise<Transaction[]> {
        const products: Transaction[] = [];
        const querySnapshot = await getDocs(collection(db, 'Transaction'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            products.push(new Transaction({
                hash: data.hash,
                previousHash: data.previousHash,
                nextHash: data.nextHash,
                data: data.data
            }));
        });
        return products;
    }

    async save(): Promise<void> {
        const docRef = doc(db, 'Transaction', this.hash);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {

            const previousBlockDocRef = doc(db, 'Transaction', this.previousHash);
            const previousBlockDocSnap = await getDoc(previousBlockDocRef);
            if (!previousBlockDocSnap.exists()) { throw Error() }
            if (previousBlockDocSnap.data().nextHash) { throw Error() }

            await updateDoc(previousBlockDocRef, { nextHash: this.hash });

            await setDoc(docRef, {
                hash: this.hash,
                previousHash: this.previousHash,
                nextHash: this.nextHash,
                data: this.data
            });

        } else throw Error(`Block aready exist with the hash "${this.hash}"`)
    }
}