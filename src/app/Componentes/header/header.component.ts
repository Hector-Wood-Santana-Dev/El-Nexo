import { Component, inject, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TrolleyServiceService} from "../../service/trolley-service.service";
import {Product} from "../../interface/product";
import {AuthService} from "../../auth.service";
import {NgIf} from "@angular/common";

import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

import {ChangeLanguageService} from "../../service/change-language.service";
import {ReadTextService} from "../../service/read-text.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    MatButtonToggle,
    MatButtonToggleGroup,

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit{
  isSidebarVisible: boolean = false;
  datosJson: any;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  authService = inject(AuthService)

  logout(): void {
    this.authService.logout();
  }

  result:Product[];
  constructor(private router: Router, private trolley:TrolleyServiceService, private ChangeLanguageService:ChangeLanguageService, private ReadText: ReadTextService) {
    this.result=[];

  }
  ngOnInit() {
    this.trolley.getTrolley().subscribe(trolleys=>
      this.result=trolleys);

    this.updateJson();
    this.ChangeLanguageService.getLanguageChangeObservable().subscribe(newLanguage=>{
      this.updateJson();
    })
  }


  cargarPagina(url: string) {
    this.router.navigate([url]);
  }

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

  changeLanguage(language:string){
    this.ChangeLanguageService.setLanguage(language);
  }

  updateJson(){
    this.ReadText.getJson().subscribe(json => {
      this.datosJson = json;
    })
  }

}
