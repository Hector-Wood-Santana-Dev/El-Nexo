import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeLanguageService {

  constructor() { }

  private language = "ES";
  private languageChange: Subject<string> = new Subject<string>();

  setLanguage(language: string) {
    this.language = language;
    this.languageChange.next(this.language);
  }

  getLanguage(){
    return this.language;
  }

  getLanguageChangeObservable(){
    return this.languageChange.asObservable();
  }

}
