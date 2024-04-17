import { Component } from '@angular/core';

import datos_es from "../../../assets/json/textos-paginas.json"
import datosJson from "../../../assets/json/textos-paginas.json";

@Component({
  selector: 'app-devoluciones',
  standalone: true,
  imports: [],
  templateUrl: './devoluciones.component.html',
  styleUrl: './devoluciones.component.css'
})
export class DevolucionesComponent {
  datosJson = datos_es;
}
