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
  indiceActual = 0;
  indiceActualAnterior=0;

  authService = inject(AuthService)

  cargarPagina(url: string) {
    this.router.navigate([url]);
  }

  constructor(private router: Router,
              protected trolley:TrolleyServiceService,
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
      }, 3000);});
    this.searchService.currentSearch.subscribe(search => this.filterItems(search));
  }

  productos: Product[] = [];


  productoSeleccionado: Product|null=null;
  mostradors: HTMLElement|null=null;
  selecions:HTMLElement|null=null;

  originalItems = [...this.productos];
  filterItems(search: string) {
    if (search.trim()) {
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
    this.indiceActualAnterior= this.indiceActual
    this.indiceActual += direccion;
    console.log(this.productos.length)
    if(direccion==1) console.log(1)
    if (direccion==-1)console.log(-1)
    if (this.indiceActual < 0) this.indiceActual = 0;
    if (this.indiceActual >= this.productos.length) this.indiceActual= this.indiceActualAnterior;
    console.log(this.indiceActual)

  }
}

