import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {TrolleyServiceService} from "../../service/trolley-service.service";
import {Product} from "../../interface/product";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  result:Product[];
  constructor(private router: Router, private trolley:TrolleyServiceService){
    this.result= this.trolley.getTrolley();
  }
  cargarPagina(url: string) {
    this.router.navigate([url]);
  }
  cargarPaginaV(url:string) {
    if (localStorage.getItem("miClave") !== null) {
      this.router.navigate([url]);

    } else {
      // la clave "nombre" no existe en localStorage
      // hacer algo, como redirigir a una página de registro
      this.router.navigate(['login']);


    }
  }
  abrir(){
    const nav =document.querySelector("#nav")!;
    const elementAbrir = document.querySelector("#abrir")!;
    elementAbrir.addEventListener('click', () => {
      nav.classList.add("visible");
    })
  }
  cerrar(){
    const nav =document.querySelector("#nav")!;
    const elementCerrar = document.querySelector("#cerrar")!;
    elementCerrar.addEventListener('click', () => {
      nav.classList.remove("visible");
    })
  }

}
