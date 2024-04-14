import { Injectable } from '@angular/core';
import {Product} from "../interface/product";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrolleyServiceService {
trolley:Product[];
private products$ = new BehaviorSubject<Product[]>([]); // El BehaviorSubject

  constructor() {
    let misProductos = sessionStorage.getItem('misProductos');
    this.trolley = misProductos ? JSON.parse(misProductos) : [];
    this.products$.next(this.trolley);

  }

  addProductTrollet(product:Product){
    if(this.isAdd(product)==false){
      this.trolley.push(product);
      sessionStorage.setItem('misProductos', JSON.stringify(this.trolley));
      this.products$.next(this.trolley);


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
  getTrolley():Observable <Product[]>{
    return this.products$.asObservable();
  }

}
