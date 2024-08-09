import { db } from "@/config/firebase-config";
import { doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Product } from "./product";

interface SalesProductProps {
    productId: string;
    productName: string;
    productPrice: number;
    productQuantity: number;
}

export enum PaymentStatus {
    FullPayment = "full payment",
    PartPayment = "part payment",
}

interface SalesPaymentProps {
    amountPaid: number;
    balance: number;
    status: PaymentStatus;
}

export class Sales {
    id: string;
    products: SalesProductProps[];
    description: string;
    payment: SalesPaymentProps;

    constructor({ description, products, payment }: { description: string, products: SalesProductProps[], payment: SalesPaymentProps }) {
        this.id = "";
        this.description = description;
        this.products = products;
        this.payment = payment;
    }

    async getTotalPrice(): Promise<number> {
        return this.products.reduce((total, product) => total + product.productPrice * product.productQuantity, 0);
    }

    static async get(id: string): Promise<Sales | null> {
        const docRef = doc(db, 'Sales', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const sales = new Sales({
                description: data.description,
                products: data.products,
                payment: data.payment
            });
            sales.id = data.id;
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
                payment: data.payment
            });
            sales.id = data.id;
            allSales.push(sales);
        });
        return allSales;
    }

    async save(): Promise<void> {
        this.id = `sales::${new Date().toISOString()}`;
        for (const product of this.products) {
            const p = await Product.get(product.productId);
            if (p) {
                await p.updateStock(product.productQuantity);
            }
        }
        const docRef = doc(db, 'Sales', this.id);
        await setDoc(docRef, {
            id: this.id,
            description: this.description,
            products: this.products,
            payment: this.payment
        });
    }

    async updatePayment({ amountPaid }: { amountPaid: number }): Promise<void> {
        const docRef = doc(db, 'Sales', this.id);
        const currentAmount = this.payment.amountPaid + amountPaid;
        const totalPrice = await this.getTotalPrice();
        await updateDoc(docRef, {
            'payment.amountPaid': currentAmount,
            'payment.balance': totalPrice - currentAmount,
            'payment.status': currentAmount >= totalPrice ? PaymentStatus.FullPayment : PaymentStatus.PartPayment,
        });
    }

    async delete(): Promise<void> {
        const docRef = doc(db, 'Sales', this.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            if (!data.payment.status.includes(PaymentStatus.FullPayment)) {
                await deleteDoc(docRef);
            }
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
