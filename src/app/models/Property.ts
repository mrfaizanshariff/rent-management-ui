import { Tenant } from "./Tenant"

export interface Property{

    firmId:string
    propertyId:string,
    propertyName:string,
    details:object,
    tenantDatabase:Tenant[]
}