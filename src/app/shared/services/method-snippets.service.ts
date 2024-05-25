import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
  export class MethodSnippetService {
    filterObjectByKey(obj:any,key:string){
        return obj[key]
    }
  }