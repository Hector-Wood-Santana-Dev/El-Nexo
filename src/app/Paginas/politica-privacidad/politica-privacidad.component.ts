import { Component } from '@angular/core'

import datos_es from "../../../assets/json/textos-paginas.json"

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css'
})
export class PoliticaPrivacidadComponent {
  datosJson = datos_es;
}
