import { db } from "@/config/firebase-config";
import { doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Product } from "./product";
import { User } from "firebase/auth";
import { BaseUser } from "@/types/db";
import { Transaction } from "./transaction";


export interface TransactionVerification {
    user: BaseUser | User;
    isVerified: boolean;
}


export interface SalesProductProps {
    id: string;
    name: string;
    price: number;
    qty: number;
}


export enum PaymentStatus {
    FullPayment = "full payment",
    PartPayment = "part payment",
}


export interface PaymentProps {
    amountPaid?: number;
    balance?: number;
    status?: PaymentStatus;
}


export interface DeliveryProps {
    user?: BaseUser;
    status?: string | "instant take off" | "delivered" | "delivering" | "pending";
    date?: Date
}


export interface CustomerProps {
    name: string;
    email?: string;
    contact?: string;
    address?: string
}


export interface SalesProps {
    products: SalesProductProps[];
    payment?: PaymentProps
    expenses?: number;
    customer: CustomerProps;
    delivery?: DeliveryProps;
    description: string;
}


export class Sales {
    id: string;
    products: SalesProductProps[];
    payment?: PaymentProps;
    expenses?: number
    customer: CustomerProps;
    delivery?: DeliveryProps;
    description: string;

    verifications: TransactionVerification[]
    processedBy: string
    date: Date

    constructor({ description, products, payment, expenses, customer, delivery }: SalesProps, authUser?: BaseUser) {
        this.id = ""
        this.products = products
        this.payment = payment;
        this.expenses = expenses
        this.customer = customer
        this.delivery = delivery
        this.description = description
        this.verifications = []
        this.processedBy = authUser?.displayName ? authUser.displayName : authUser?.email ? authUser.email : "undefined";
        this.date = new Date()
    }

    getTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.price * product.qty, 0);
    }

    isVerified = () => {
        return this.verifications.every((verification) => verification.isVerified);
    };

    isPending = () => {
        return this.delivery?.status === "pending" || !this.isVerified
    }


    static async get(id: string): Promise<Sales | null> {
        const docRef = doc(db, 'Sales', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const sales = new Sales({
                description: data.description,
                products: data.products,
                payment: data.payment,
                expenses: data.expenses,
                customer: data.customer,
                delivery: data.delivery,
                verifications: data.verifications,
                processedBy: data.processedBy
            } as SalesProps);
            sales.id = data.id;
            sales.date = data.date.toDate();
            return sales;
        } else {
            return null;
        }
    }

    static async getAll(): Promise<Sales[]> {
        const allSales: Sales[] = [];
        const querySnapshot = await getDocs(collection(db, 'Sales'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const sales = new Sales({
                description: data.description,
                products: data.products,
                payment: data.payment,
                expenses: data.expenses,
                customer: data.customer,
                delivery: data.delivery,
                verifications: data.verifications,
                processedBy: data.processedBy
            } as SalesProps);
            sales.id = data.id;
            sales.date = data.date.toDate();
            allSales.push(sales);
        });
        return allSales;
    }

    async save(): Promise<void> {
        this.id = `${this.processedBy}::${new Date().toISOString()}`;
        for (const product of this.products) {
            const p = await Product.get(product.id);
            if (p) {
                await p.updateStock({ qty: product.qty, isSales: true });
            } else throw Error(`Product ${product.name} does not exist in products`) // else remove the product `p` from the sales products
        }
        const docRef = doc(db, 'Sales', this.id);
        const data = {
            id: this.id,
            description: this.description,
            products: this.products,
            payment: this.payment || {},
            expenses: this.expenses || 0,
            customer: this.customer,
            delivery: this.delivery || {},
            verifications: this.verifications,
            processedBy: this.processedBy,
            date: new Date()
        }
        await setDoc(docRef, data);
        const trans = new Transaction({ signer: { email: data.processedBy }, data, action: "create" })
        await trans.save()
    }

    async updatePayment({ amountPaid }: { amountPaid: number }): Promise<void> {
        const docRef = doc(db, 'Sales', this.id);
        if (!this.payment) this.payment = { amountPaid: 0 }
        const currentAmount = this.payment.amountPaid! + amountPaid;
        const totalPrice = await this.getTotalPrice();
        const data = {
            'payment.amountPaid': currentAmount,
            'payment.balance': totalPrice - currentAmount,
            'payment.status': currentAmount >= totalPrice ? PaymentStatus.FullPayment : PaymentStatus.PartPayment,
        }
        await updateDoc(docRef, data);
        const trans = new Transaction({ signer: { email: this.processedBy }, data, action: "update" })
        await trans.save()
    }

    async updateDelivery(delivery: DeliveryProps): Promise<void> {
        const docRef = doc(db, 'Sales', this.id);
        await updateDoc(docRef, {
            delivery: delivery
        });
        const trans = new Transaction({ signer: { email: this.processedBy }, data: { delivery: delivery }, action: "update" })
        await trans.save()
    }

    async delete(): Promise<void> {
        const docRef = doc(db, 'Sales', this.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data.payment.status.includes(PaymentStatus.FullPayment)) {
                await deleteDoc(docRef);
            }
            const trans = new Transaction({ signer: { email: this.processedBy }, data, action: "delete" })
            await trans.save()
        }
    }

    async verify(user: User): Promise<void> {
        const docRef = doc(db, "Sales", this.id);
        if (this.verifications.some((v) => v.user.email === user.email && v.isVerified)) {
            console.warn("User has already verified this stock.");
            return;
        }
        this.verifications.push({ user: user, isVerified: true });
        await updateDoc(docRef, { verifications: this.verifications });
        const trans = new Transaction({ signer: { email: this.processedBy }, data: { verifications: this.verifications }, action: "delete" })
        await trans.save()
    }
}
