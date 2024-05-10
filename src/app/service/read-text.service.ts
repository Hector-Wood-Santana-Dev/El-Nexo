import { Injectable } from '@angular/core';
import { Storage } from "@angular/fire/storage";
import { HttpClient } from '@angular/common/http';
import {map, Observable, of} from 'rxjs';

import {ChangeLanguageService} from "./change-language.service";

import datos_es from "../../assets/json/textos_paginas_es.json";
import datos_en from "../../assets/json/textos_paginas_en.json";



@Injectable({
  providedIn: 'root'
})
export class ReadTextService {

  constructor(private storage: Storage, private http: HttpClient, private change_language: ChangeLanguageService) { }

  getJson(): Observable<any> {

    const idioma = this.change_language.getLanguage();
    let datos;

    if (idioma == 'ES') {
      datos = datos_es;
    } else if (idioma == 'EN') {
      datos = datos_en;
    }

    return of(datos);
  }
}
