import { FirmRentData } from "./FirmRentdata";
import { Invoice } from "./Invoice";
import { Property } from "./Property";
import { Rent } from "./RentData";
import { Tenant } from "./Tenant";
import { User } from "./User";

export interface FirmData 
{
    firmName:string,
    firmId:string,
    email:string,
    firmRentdata:FirmRentData
    adminList:string[],
    userList:string[],
    userDatabase:User[],
    propertyDatabase:Property[],
    tenantDatabase:Tenant[]
    rentDatabase:Rent[],
    invoiceDatabase:Invoice[],
}