import {Component, OnInit} from '@angular/core';

import {ReadTextService} from "../../service/read-text.service";
import {ChangeLanguageService} from "../../service/change-language.service";

@Component({
  selector: 'app-devoluciones',
  standalone: true,
  imports: [],
  templateUrl: './devoluciones.component.html',
  styleUrl: './devoluciones.component.css'
})
export class DevolucionesComponent implements OnInit {
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
