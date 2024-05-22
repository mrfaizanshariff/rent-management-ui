import { Invoice } from "./Invoice";

export interface Tenant{
    propertyId:string,
                tenantName:string,
                tenantId:string,
                phone: string,
                rentAmount: number,
                rentAmountPaid: number,
                rentAmountDue: number,
                rentDueDate: Date,
                invoiceDatabase:Invoice[]
}