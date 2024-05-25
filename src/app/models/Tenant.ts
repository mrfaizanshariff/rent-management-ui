import { Invoice } from "./Invoice";

export interface Tenant{
    propertyId:string,
    tenantName:string,
    tenantId:string,
    phone: string,
    rentAmount: number,
    rentDueDate: string,
    rentStartDate:Date
    // invoiceDatabase:Invoice[]
}