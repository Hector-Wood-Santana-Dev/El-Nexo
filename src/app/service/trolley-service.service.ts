import { Injectable } from '@angular/core';
import {Product} from "../interface/product";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TrolleyServiceService {
trolley:Product[];
private products$ = new BehaviorSubject<Product[]>([]); // El BehaviorSubject
  total=0;
  private total$ = new BehaviorSubject<number>(0); // El BehaviorSubject

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
      this.calcularTotal(this.trolley);
      console.log(this.total)
      console.log(this.total$)


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
  deleteProductTrolley(product:Product){
    let misProductos = sessionStorage.getItem('misProductos');
    this.trolley = misProductos ? JSON.parse(misProductos) : [];
    const index = this.trolley.findIndex(productos => productos.nombre === product.nombre);
    if (index !== -1) {
      this.trolley.splice(index, 1);
    }
    sessionStorage.setItem('misProductos', JSON.stringify(this.trolley));
    this.products$.next(this.trolley);
    this.calcularTotal(this.trolley);
  }
  calcularTotal(product:Product[]){
    let result=0;
    for (let i=0; i < product.length;i++){
      result += product[i].precio;
    }

    this.total$.next(result);


  }
  getTotal():Observable<number>{
    return this.total$.asObservable();

  }

}
