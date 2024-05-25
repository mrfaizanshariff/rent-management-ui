interface RentType {
    propertyId:string,
    tenantId:string,
    totalRent:number,
    paidRent:number
}

export interface Rent {
    January:RentType[],
    February:RentType[],
    March:RentType[],
    April:RentType[],
    May:RentType[],
    June:RentType[],
    July:RentType[],
    August:RentType[],
    September:RentType[],
    October:RentType[],
    November:RentType[],
    December:RentType[],
}