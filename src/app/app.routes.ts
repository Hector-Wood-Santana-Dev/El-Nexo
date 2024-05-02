import { Routes } from '@angular/router';
import {HomeComponent} from "./Paginas/home/home.component";
import {SobreNosotrosComponent} from "./Paginas/sobre-nosotros/sobre-nosotros.component";
import {PoliticaPrivacidadComponent} from "./Paginas/politica-privacidad/politica-privacidad.component";
import {DevolucionesComponent} from "./Paginas/devoluciones/devoluciones.component";
import {ContactoComponent} from "./Paginas/contacto/contacto.component";
import {FaqComponent} from "./Paginas/faq/faq.component";
import {CatalogComponent} from "./Paginas/catalog/catalog.component";
import {TrolleyComponent} from "./Paginas/trolley/trolley.component";
import {PaymentComponent} from "./Paginas/payment/payment.component";
import {LoginComponent} from "./login/login.component";
import {PerfilComponent} from "./Paginas/perfil/perfil.component";
import {PerfilGuardarComponent} from "./Paginas/perfil-guardar/perfil-guardar.component";



export const routes: Routes = [
  {path: '', redirectTo:'Home', pathMatch:'full'},
  { path: 'Home', component: HomeComponent },
  {path:'catalog', component:CatalogComponent},
  { path: 'about-us', component: SobreNosotrosComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'devoluciones', component: DevolucionesComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'privacidad', component: PoliticaPrivacidadComponent },
  { path: 'trolley', component: TrolleyComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: PerfilComponent },
  { path: 'editar', component: PerfilGuardarComponent },
  { path: '**', component: HomeComponent },
];

