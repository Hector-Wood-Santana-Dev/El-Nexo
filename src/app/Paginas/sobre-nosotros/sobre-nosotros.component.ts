import { Component } from '@angular/core';
import {HeaderComponent} from "../../Componentes/header/header.component";
import {FooterComponent} from "../../Componentes/footer/footer.component";

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css'
})
export class SobreNosotrosComponent {

}
