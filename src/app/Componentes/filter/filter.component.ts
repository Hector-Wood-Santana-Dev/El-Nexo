import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {FilterService} from "../../service/filter.service";

import {ReadTextService} from "../../service/read-text.service";
import {ChangeLanguageService} from "../../service/change-language.service";

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent implements OnInit {
  datosJson: any;
  dropdownOpen: boolean = false;
  filters: any = {
    figura: false,
    peluche: false,
    videojuego: false,
    manga: false,
    comic: false
  };

  constructor(private filterService: FilterService,private ReadText: ReadTextService, private ChangeLanguageService: ChangeLanguageService) { }

  ngOnInit(): void {
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleFilter(category: string) {
    this.filters[category] = !this.filters[category];
    console.log( this.filters[category]);
    this.filterService.changeFilters(this.filters);
  }
}
