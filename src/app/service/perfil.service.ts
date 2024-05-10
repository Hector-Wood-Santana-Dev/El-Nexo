import { Injectable } from '@angular/core';
import {collection, collectionData, Firestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {Perfil} from "../interface/profile";

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  constructor( private firestore:Firestore) {}
  getImages():Observable<Perfil[]>{
    const ref= collection(this.firestore, 'perfil');
    return collectionData(ref, {idField:'id'})as Observable<Perfil[]>
  }
}
