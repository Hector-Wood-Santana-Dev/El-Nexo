import { Component } from '@angular/core';
import {SearchServiceService} from "../../service/search-service.service";
import {FormsModule} from "@angular/forms";

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

  constructor(private searchService: SearchServiceService) { }

  search() {
    this.searchService.changeSearch(this.searchText);
  }
}
