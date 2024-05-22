import { Property } from "./Property";
import { User } from "./User";

export interface FirmData 
{
    firmName:string,
    firmId:string,
    email:string,
    totalRent:string,
    pendingRent:string,
    adminList:string[],
    userList:string[],
    userDatabase:User[],
    propertyDatabase:Property[],

}