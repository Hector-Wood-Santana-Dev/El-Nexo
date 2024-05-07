import { Injectable } from '@angular/core';
import {addDoc, collection, collectionData, deleteDoc, doc, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Product} from "../interface/product";


@Injectable({
  providedIn: 'root'
})
export class BODCatalogService {

  constructor( private firestore:Firestore) {}
  getCatalog():Observable<Product[]>{
    const ref= collection(this.firestore, 'catalogo');
    return collectionData(ref, {idField:'id'})as Observable<Product[]>
  }
  addProduct(product:Product){
    const ref=collection(this.firestore,'catalogo');
    return addDoc(ref,product);
  }
  deleteProduct(product:Product){
    const ref=doc(this.firestore,`catalogo/${product.id}`);
    return deleteDoc(ref);


  }
}
