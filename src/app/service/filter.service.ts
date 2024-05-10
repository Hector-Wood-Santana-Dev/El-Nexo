import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {BehaviorSubject, map, Observable} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filtersSource = new BehaviorSubject<any>({
    figura: false,
    peluche: false,
    videojuego: false,
    manga: false,
    comic: false
  });
  currentFilters: Observable<any> = this.filtersSource.asObservable(); // Especifica el tipo de Observable

  constructor() { }

  changeFilters(filters: any) {
    this.filtersSource.next(filters);
  }
}
