import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

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
