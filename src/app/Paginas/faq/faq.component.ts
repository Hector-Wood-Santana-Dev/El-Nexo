import { Component } from '@angular/core';
import {FooterComponent} from "../../Componentes/footer/footer.component";
import {HeaderComponent} from "../../Componentes/header/header.component";

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
Alert(){
  const acc = document.getElementsByClassName("accordion") as HTMLCollectionOf<HTMLElement>;

  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      this.parentElement!.classList.toggle("active");

      const panel = this.nextElementSibling as HTMLElement;

      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

}
}
