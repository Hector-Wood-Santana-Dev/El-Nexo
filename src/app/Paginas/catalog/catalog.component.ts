import { Component, inject, OnInit } from '@angular/core';
import {FooterComponent} from "../../Componentes/footer/footer.component";
import {HeaderComponent} from "../../Componentes/header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {Product} from "../../interface/product";
import {SearchComponent} from "../../Componentes/search/search.component"
import {TrolleyServiceService} from "../../service/trolley-service.service";
import {BODCatalogService} from "../../service/bodcatalog.service";
import {AuthService} from "../../auth.service";
import {Router} from "@angular/router";
import {SearchServiceService} from "../../service/search-service.service";
import {LoaderComponent} from "../../Componentes/loader/loader.component";
import {FilterComponent} from "../../Componentes/filter/filter.component";
import {FilterService} from "../../service/filter.service";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NgForOf,
    NgIf,
    SearchComponent,
    LoaderComponent,
    FilterComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit{
  loading = false;
  indiceActual = 0;
  indiceActualAnterior=0;



  constructor(private router: Router,
              protected trolley:TrolleyServiceService,
              private bodCataloc:BODCatalogService,
              private searchService: SearchServiceService,
              private filterService: FilterService) {
    this.mostradors= document.getElementById("mostrador");
    this.selecions=document.getElementById("selecion");
  }
  ngOnInit() {
    this.loading = true;
    this.bodCataloc.getCatalog().subscribe(products => {
      this.productos = products;
      this.originalItems = [...this.productos];
      this.loading = false;
    });

    combineLatest([
      this.searchService.currentSearch,
      this.filterService.currentFilters
    ]).subscribe(([search, filters]) => {
      this.filterItems(search, filters);
    });
  }

  productos: Product[] = [];


  productoSeleccionado: Product|null=null;
  mostradors: HTMLElement|null=null;
  selecions:HTMLElement|null=null;

  originalItems = [...this.productos];

  filterItems(search: string, filters: any) {
    let filteredItems = [...this.originalItems];

    // Filtrar por búsqueda si hay algún término de búsqueda
    if (search && search.trim() !== '') {
      filteredItems = filteredItems.filter(item => item.nombre.toLowerCase().includes(search.toLowerCase()));
      this.indiceActual = 0;
    }

    // Filtrar por categoría según los filtros activos
    const activeFilters = Object.entries(filters).filter(([key, value]) => value);

    if (activeFilters.length > 0) {
      filteredItems = filteredItems.filter(item => activeFilters.some(([key, value]) => item.categoria === key));
      this.indiceActual = 0;
    }

    this.productos = filteredItems;
  }




  seleccionarProducto(producto: Product) {
    this.productoSeleccionado = producto;


    if (window.innerWidth<=950){
      // @ts-ignore
      this.mostradors.style.width = "0%";
      // @ts-ignore
      this.selecions.style.width = "100%";


    }else {
      // @ts-ignore
      this.mostradors.style.width = "20%";
      // @ts-ignore
      this.selecions.style.width = "80%";

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


  protected readonly Math = Math;


  mover(direccion: number) {
    this.indiceActualAnterior = this.indiceActual;
    this.indiceActual += direccion;

    if (this.indiceActual < 0) {
      this.indiceActual = 0;
    }

    if (this.indiceActual >= this.productos.length) {
      this.indiceActual = this.indiceActualAnterior;
    }
  }
}


