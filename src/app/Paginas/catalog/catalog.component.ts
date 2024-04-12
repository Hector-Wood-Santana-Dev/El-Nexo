import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../Componentes/footer/footer.component";
import {HeaderComponent} from "../../Componentes/header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {Product} from "../../interface/product";
import {SearchComponent} from "../../Componentes/search/search.component"
import {TrolleyServiceService} from "../../service/trolley-service.service";
import {BODCatalogService} from "../../service/bodcatalog.service";
import {SearchServiceService} from "../../service/search-service.service";
import {LoaderComponent} from "../../Componentes/loader/loader.component";
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NgForOf,
    NgIf,
    SearchComponent,
    LoaderComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit{
  loading = false;

  constructor(public trolley:TrolleyServiceService,
              private bodCataloc:BODCatalogService,
              private searchService: SearchServiceService) {

    this.mostradors= document.getElementById("mostrador");
    this.selecions=document.getElementById("selecion");
  }
  ngOnInit() {
    this.loading=true;
    this.bodCataloc.getCatalog().subscribe(products=>{
      this.productos=products ;
      this.originalItems = [...this.productos];
      setTimeout(() => {
        this.loading = false;
      }, 4000);});
    this.searchService.currentSearch.subscribe(search => this.filterItems(search));
  }

  filas =[1,2,];
  productos: Product[] = [];


  productoSeleccionado: Product|null=null;
  mostradors: HTMLElement|null=null;
  selecions:HTMLElement|null=null;

  originalItems = [...this.productos];
  filterItems(search: string) {
    if (search) {
      this.productos = this.originalItems.filter(item => item.nombre.toLowerCase().includes(search.toLowerCase()));
    } else {
      this.productos = [...this.originalItems];
    }
  }

  seleccionarProducto(producto: Product) {
    this.productoSeleccionado = producto;


    if (window.innerWidth<=950){
      // @ts-ignore
      this.mostradors.style.width = "0%";
      // @ts-ignore
      this.selecions.style.width = "100%";
      // @ts-ignore
      this.selecions.style.height="80%";


    }else {
      // @ts-ignore
      this.mostradors.style.width = "20%";
      // @ts-ignore
      this.selecions.style.width = "80%";
      // @ts-ignore
      this.selecions.style.height = "80%";

    }


  }

  cerrarr() {
    this.productoSeleccionado = null;
    //@ts-ignore
    this.mostradors.style.width = "100%";
    //@ts-ignore
    this.selecion.style.width = "0%";
    //@ts-ignore
    this.selecion.style.opacity = "0";
  }

}

