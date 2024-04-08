import { Routes } from '@angular/router';
import {HomeComponent} from "./Paginas/home/home.component";
import {SobreNosotrosComponent} from "./Paginas/sobre-nosotros/sobre-nosotros.component";
import {PoliticaPrivacidadComponent} from "./Paginas/politica-privacidad/politica-privacidad.component";
import {DevolucionesComponent} from "./Paginas/devoluciones/devoluciones.component";
import {ContactoComponent} from "./Paginas/contacto/contacto.component";
import {FaqComponent} from "./Paginas/faq/faq.component";


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about-us', component: SobreNosotrosComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'devoluciones', component: DevolucionesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'privacidad', component: PoliticaPrivacidadComponent },
  { path: '**', component: HomeComponent },
];
