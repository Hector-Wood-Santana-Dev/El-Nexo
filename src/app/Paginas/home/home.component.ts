import { Component } from '@angular/core';
import {HeaderComponent} from "../../Componentes/header/header.component";
import {FooterComponent} from "../../Componentes/footer/footer.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
cargarPagina(  url:string){
  window.location.href = url;
}

texto = 'Colaboradores';

  cambiarTexto() {
    this.texto = '¿Dónde encontrarlos?';
  }

  textoOriginal() {
    this.texto = 'Colaboradores';
  }
}
