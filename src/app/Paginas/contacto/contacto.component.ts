import { Component } from '@angular/core';

import datos_es from "../../../assets/json/textos-paginas.json"



@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [],
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  datosJson = datos_es;
}
