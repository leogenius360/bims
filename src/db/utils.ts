import { db } from "@/config/firebase-config";
import { doc, getDoc, getDocs, collection, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

export class ProductCategory {
    id: string
    label: string
    addedBy: string

    constructor({ label, addedBy }: { label: string, addedBy: string }) {
        this.id = `product::category:${label.toLowerCase()}`
        this.label = label
        this.addedBy = addedBy
    }


    static async get(id: string): Promise<ProductCategory | null> {
        const docRef = doc(db, 'Product Categories', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            const data = docSnap.data();
            const category = new ProductCategory(data as ProductCategory);
            category.id = data.id;
            return category;
        } else {
            return null;
        }
    }

    static async getAll(): Promise<ProductCategory[]> {
        const querySnapshot = await getDocs(collection(db, 'Product Categories'));
        const categories: ProductCategory[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            const category = new ProductCategory(data as ProductCategory);
            category.id = data.id;
            categories.push(category);
        });
        return categories;
    }

    async save(): Promise<void> {
        const docRef = doc(db, 'Product Categories', this.id);
        await setDoc(docRef, {
            label: this.label,
            addedBy: this.addedBy,
        });
    }

    async update(data: Partial<ProductCategory>): Promise<void> {
        const docRef = doc(db, 'Product Categories', this.id);
        await updateDoc(docRef, { ...data });
    }

    static async delete(id: string): Promise<void> {
        const docRef = doc(db, 'Product Categories', id);
        await deleteDoc(docRef);
    }
}