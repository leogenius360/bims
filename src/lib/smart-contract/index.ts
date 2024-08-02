
export class Transaction {


}


interface BlockProps {
    hash: string;
    transactionId: string;
    isVerified: boolean;
    date: Date;
}


export class Block {

    create(transaction: Transaction) {

    }
}