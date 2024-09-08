import { db } from "@/config/firebase-config"
import { BaseUser } from "@/types/db"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"

export class Transaction {
    hash!: string
    prevHash!: string
    timestamp!: Date
    signer: BaseUser
    data?: object
    action: "create" | "update" | "delete"

    constructor({ signer, data, action }: {
        signer: BaseUser,
        data?: object,
        action: "create" | "update" | "delete"
    }) {
        this.signer = signer
        this.data = data
        this.action = action
    }

    static async get(id: string): Promise<Transaction | null> {
        const docRef = doc(db, 'Transactions', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const transaction = new Transaction({
                signer: data.signer,
                data: data.data,
                action: data.action,
            });
            transaction.hash = data.hash;
            transaction.prevHash = data.prevHash;
            transaction.timestamp = data.date.toDate();
            return transaction;
        } else {
            return null;
        }
    }

    static async getAll(): Promise<Transaction[]> {
        const transactions: Transaction[] = [];
        const querySnapshot = await getDocs(collection(db, 'Transactions'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const transaction = new Transaction({
                signer: data.signer,
                data: data.data,
                action: data.action,
            });
            transaction.hash = data.hash;
            transaction.prevHash = data.prevHash;
            transaction.timestamp = data.date.toDate();
            transactions.push(transaction);
        });
        return transactions;
    }

    async save(): Promise<void> {
        const docRef = doc(db, 'Transactions', this.hash);
        await setDoc(docRef, {
            hash: this.hash,
            prevHash: this.prevHash,
            signer: this.signer,
            timestamp: new Date(),
            data: this.data || {},
            action: this.action,
        });
    }
}