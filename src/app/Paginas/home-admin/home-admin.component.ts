import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {BODCatalogService} from "../../service/bodcatalog.service";
import {Product} from "../../interface/product";
import {SearchComponent} from "../../Componentes/search/search.component";
import {TrolleyServiceService} from "../../service/trolley-service.service";
import {SearchServiceService} from "../../service/search-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    SearchComponent
  ],
  templateUrl: './home-admin.component.html',
  styleUrl: './home-admin.component.css'
})
export class HomeAdminComponent implements OnInit{
  productos: Product[] = [];
  originalItems = [...this.productos];


  constructor(private bodCataloc:BODCatalogService,
              private searchService: SearchServiceService,
              private router:Router) {
  }
  ngOnInit() {
    this.bodCataloc.getCatalog().subscribe(products=>{
      this.productos=products;
      this.originalItems = [...this.productos];
      this.searchService.currentSearch.subscribe(search => this.filterItems(search));

    });

  }
  /*buscador*/
  filterItems(search: string) {
    if (search.trim()) {
      this.productos = this.originalItems.filter(item => item.nombre.toLowerCase().includes(search.toLowerCase()));
    } else {
      this.productos = [...this.originalItems];
    }
  }
   async clickDelete(product:Product){

    if(confirm("Seguro que quieres eliminar")) {
      await this.bodCataloc.deleteProduct(product);

    }
  }
  cargarPagina(url: string) {
    this.router.navigate([url]);
  }

}
