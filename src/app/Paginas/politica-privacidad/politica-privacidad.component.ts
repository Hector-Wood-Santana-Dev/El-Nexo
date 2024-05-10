import {Component, OnInit} from '@angular/core'

import {ReadTextService} from "../../service/read-text.service";
import {ChangeLanguageService} from "../../service/change-language.service";

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.css'
})
export class PoliticaPrivacidadComponent implements OnInit{
  datosJson: any;

  constructor(private ReadText: ReadTextService, private ChangeLanguageService: ChangeLanguageService) {  }

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
