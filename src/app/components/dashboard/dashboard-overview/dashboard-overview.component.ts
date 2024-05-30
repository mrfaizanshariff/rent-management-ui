import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { FirmData } from 'src/app/models/FirmData';
import { Property } from 'src/app/models/Property';
import { MessageBusService } from 'src/app/shared/services/message-bus.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent implements OnInit{
  testRentDB = {
    'January':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      },
    ],
    'February':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      }
    ],
    'March':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      }
    ],
    'April':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      
    ],
    'May':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      
    ],
    'June':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P2",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      }
    ],
    'July':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P2",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      },
      
    ],
    'August':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      },
     
    ],
    'September':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      },
     
    ],
    'October':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      },
   
    ],
    'November':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      },
   
    ],
    'December':[
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T1",
        "totalRent": 35000
      },
      {
        "propertyId": "P1",
        "paidRent": 15000,
        "pendingRent": 20000,
        "tenantId": "T2",
        "totalRent": 35000
      },

    ],
  }
  testTenantDb = [
    {
        "tenantId": "T1",
        "rentStartDate": {
            "seconds": 1714501800,
            "nanoseconds": 765000000
        },
        "tenantName": "Mama Noora",
        "propertyId": "P1",
        "phone": "7338006388",
        "rentDueDate": "5",
        "rentAmount": 35000
    },
    {
        "tenantId": "T2",
        "rentStartDate": {
            "seconds": 1714501800,
            "nanoseconds": 765000000
        },
        "tenantName": "juice",
        "propertyId": "P1",
        "phone": "7338006388",
        "rentDueDate": "5",
        "rentAmount": 35000
    },
    {
        "tenantId": "T3",
        "rentStartDate": {
            "seconds": 1714501800,
            "nanoseconds": 765000000
        },
        "tenantName": "Mysore Kaapi",
        "propertyId": "P1",
        "phone": "7338006388",
        "rentDueDate": "5",
        "rentAmount": 35000
    }
]
  testFirmRentDb = {
    January: {totalRent:50000,paidRent:40000},
    February: {totalRent:50000,paidRent:9000},
    March: {totalRent:50000,paidRent:4000},
    April: {totalRent:887000,paidRent:7800},
    May: {totalRent:87412,paidRent:5545},
    June: {totalRent:50000,paidRent:4000},
    July: {totalRent:50000,paidRent:4000},
    August: {totalRent:50000,paidRent:411},
    September: {totalRent:50000,paidRent:4454},
    October: {totalRent:50000,paidRent:7787},
    November: {totalRent:50000,paidRent:7444},
    December: {totalRent:50000,paidRent:50000}
  }
  firmData!:FirmData
  totalRent:number = 0;
  paidRent:number = 0;
  properties:Property[] = [];
  monthList:string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];
  monthListFormcontrol = new FormControl(this.monthList[new Date().getMonth()]);
  propertyListFormcontrol = new FormControl()
  dataSource= new MatTableDataSource();
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  displayedColumns:string[] =["TenantName","TenantNumber","RentAmount","PaidAmount","PendingAmount","DueDate","RentStartDate"]
  constructor(private messageBusService:MessageBusService) { 
    this.messageBusService.getFirmDatabase().subscribe(data =>{
      this.firmData = data
      console.log(data)
      this.getProperties()
    });
   }

  ngOnInit(): void {
  }
  getTableData(month:string){
  const selectedProp= this.propertyListFormcontrol.value
  const selectedMonth = month
  const tenantData = this.firmData.tenantDatabase.filter(e=>e.propertyId == selectedProp.propertyId);
  const rentData = this.filterObjectByKey(this.testRentDB,selectedMonth).filter((e:any)=>e.propertyId == selectedProp.propertyId);
  if(tenantData.length > 0 && rentData.length > 0){
    const tempData = new Map()
    tenantData.forEach(tenant=> tempData.set(tenant.tenantId, tenant))
    rentData.forEach((rent:any) => tempData.set(rent.tenantId,{...tempData.get(rent.tenantId),...rent}))
    let tableData = Array.from(tempData.values())
    console.log(tableData)
    this.dataSource = new MatTableDataSource(tableData)
  }else{
    this.dataSource = new MatTableDataSource()
  }
  }
  filterObjectByKey(obj:any,key:string){
    return obj[key]
  }
  getProperties(){
    this.properties = [...this.firmData?.propertyDatabase]
    console.log(this.properties)
  }
  onPropSelect(){
    this.getTableData(String(this.monthListFormcontrol.value))
  }
  getFirmRentdata(month:string){
     this.totalRent =  this.filterObjectByKey(this.testFirmRentDb, month).totalRent
     this.paidRent = this.filterObjectByKey(this.testFirmRentDb,month).paidRent
     
    }
  formatTimeStampToDate(timeStamp:any){
    
  const milliseconds = timeStamp?.seconds * 1000 + Math.floor(timeStamp?.nanoseconds / 1e6);
  const date = new Date(milliseconds);
  
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = date.getUTCFullYear();
  
  return `${day}/${month}/${year}`;

  }
  monthSelectionChange(event:any){
    this.getFirmRentdata(event?.value)
    if(this.propertyListFormcontrol.value){
      this.getTableData(event?.value)
    }
  }
}
