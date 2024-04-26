import { Component } from '@angular/core';
import {FooterComponent} from "../../Componentes/footer/footer.component";
import {HeaderComponent} from "../../Componentes/header/header.component";

import datos_es from "../../../assets/json/textos-paginas.json"


@Component({
selector: 'app-faq',
standalone: true,
imports: [
FooterComponent,
HeaderComponent
],
templateUrl: './faq.component.html',
styleUrl: './faq.component.css'
})
export class FaqComponent {
constructor() {
this.q1 = "q1";
this.q2 = "q2";
this.q3 = "q3";
this.q4 = "q4";
this.q5 = "q5";
this.q6 = "q6";
}

q1: string;
q2: string;
q3: string;
q4: string;
q5: string;
q6: string;

Alert(id: number) {
const panel = document.getElementsByClassName("accordion").item(id) as HTMLElement;
const panel2 = panel.nextElementSibling as HTMLElement;

if (panel2.style.display === "block") {
panel2.style.display = "none";
} else {
panel2.style.display = "block";
}
}
datosJson = datos_es;
}
