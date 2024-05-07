import { Component } from '@angular/core';
import {SearchServiceService} from "../../service/search-service.service";
import {FormsModule} from "@angular/forms";

import {ReadTextService} from "../../service/read-text.service";
import {ChangeLanguageService} from "../../service/change-language.service";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchText = '';
  datosJson: any;

  constructor(private searchService: SearchServiceService, private ReadText: ReadTextService, private ChangeLanguageService: ChangeLanguageService) { }

  search() {
    this.searchService.changeSearch(this.searchText);
  }

  ngOnInit(): void{
    this.updateJson();

    this.ChangeLanguageService.getLanguageChangeObservable().subscribe(newLanguage=>{
      this.updateJson();
    })
  }

  updateJson(){
    this.ReadText.getJson().subscribe(json => {
      this.datosJson = json;
    })
  }
}
