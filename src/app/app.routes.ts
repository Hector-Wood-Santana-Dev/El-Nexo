import { Routes } from '@angular/router';
import {CatalogComponent} from "./Paginas/catalog/catalog.component";
import {LoginComponent} from "./Paginas/login/login.component";
import {HomeComponent} from "./Paginas/home/home.component";

export const routes: Routes = [{path:'',redirectTo: 'Home', pathMatch:'full'},
  {path:'Home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'catalog', component:CatalogComponent}];
