import { Component } from '@angular/core';
import {FooterComponent} from "../../Componentes/footer/footer.component";
import {HeaderComponent} from "../../Componentes/header/header.component";
import {NgForOf, NgIf} from "@angular/common";
import {Product} from "../../interface/product";
import {SearchComponent} from "../../Componentes/search/search.component"
import {TrolleyServiceService} from "../../service/trolley-service.service";
@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent,
    NgForOf,
    NgIf,
    SearchComponent
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent {
  constructor(public trolley:TrolleyServiceService) {
  }
  filas =[1,2,3];
  productos: Product[] = [
    { nombre: 'Producto 1', precio: 100, imagen: './assets/image/solo-le.png', id:'5', categoria:'èè', descripcion:'hola' },
    { nombre: 'Producto 2', precio: 200, imagen: './assets/image/solo-leveling.png',id:'5', categoria:'èè', descripcion:'hola'},
    { nombre: 'Producto 3', precio: 300, imagen: './assets/image/solo-leveling.png',id:'5', categoria:'èè', descripcion:'hola'},
    { nombre: 'Producto 4', precio: 400, imagen: './assets/image/solo-leveling.png',id:'5', categoria:'èè', descripcion:'hola'}
  ];
  productoSeleccionado: Product|null=null;
  mostradors: HTMLElement|null=null;
  selecions:HTMLElement|null=null;


  seleccionarProducto(producto: Product) {
    this.productoSeleccionado = producto;


    if (window.innerWidth<=950){
      // @ts-ignore
      this.mostradors.style.width = "0%";
      // @ts-ignore
      this.selecions.style.width = "100%";

    }else {
      // @ts-ignore
      this.mostradors.style.width = "60%";
      // @ts-ignore
      this.selecions.style.width = "40%";
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

