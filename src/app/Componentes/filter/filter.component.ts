import {Component, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {FilterService} from "../../service/filter.service";

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
  dropdownOpen: boolean = false;
  filters: any = {
    figura: false,
    peluche: false,
    videojuego: false,
    manga: false,
    comic: false
  };

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
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
