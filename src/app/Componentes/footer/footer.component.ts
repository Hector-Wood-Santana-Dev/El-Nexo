import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {ReadTextService} from "../../service/read-text.service";
import {ChangeLanguageService} from "../../service/change-language.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit{
  datosJson: any;

  constructor(private router: Router, private ReadText: ReadTextService, private ChangeLanguageService: ChangeLanguageService){}
    cargarPagina(url: string) {
      this.router.navigate([url]);
    }

  ngOnInit(): void{
    this.updateJson();

    this.ChangeLanguageService.getLanguageChangeObservable().subscribe(newLanguage=>{
      this.updateJson();
    })
  }

  updateJson(){
    this.ReadText.getJson().subscribe(json => {
      this.datosJson = json;
    })
  }

}


