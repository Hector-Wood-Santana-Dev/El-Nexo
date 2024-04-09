import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {HeaderComponent} from "./Componentes/header/header.component";
import {HomeComponent} from "./Paginas/home/home.component";
import {FooterComponent} from "./Componentes/footer/footer.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, FooterComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'El-Nexo';
  showHeader: boolean = true;
  showFooter: boolean = true;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Verificar si la ruta actual es '/devoluciones'
        if (this.router.url === '/login') {
          this.showHeader = false;
          this.showFooter = false;
        } else {
          this.showHeader = true;
          this.showFooter = true;
        }
      }
    });
  }

}

