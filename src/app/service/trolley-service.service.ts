import { Injectable } from '@angular/core';
import {Product} from "../interface/product";

@Injectable({
  providedIn: 'root'
})
export class TrolleyServiceService {
trolley:Product[];
  constructor() {
    this.trolley=[];
  }
  addProductTrollet(product:Product){
    if(this.isAdd(product)==false){

      this.trolley.push(product);

    }

  }
  isAdd(product:Product){
    for (let i=0; i< this.trolley.length;i++){
      if(this.trolley[i].nombre==product.nombre){
        return true;
      }
    }
    return false
  }
  getTrolley(){
    return this.trolley;
  }
}
