import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
  export class SearchServiceService {
    private searchSource = new BehaviorSubject('');
    currentSearch = this.searchSource.asObservable();

    constructor() { }

    changeSearch(search: string) {
      this.searchSource.next(search);
    }
  }
