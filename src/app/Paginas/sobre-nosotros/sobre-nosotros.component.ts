import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../Componentes/header/header.component";
import {FooterComponent} from "../../Componentes/footer/footer.component";

import {ReadTextService} from "../../service/read-text.service";
import {ChangeLanguageService} from "../../service/change-language.service";


@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css'
})
export class SobreNosotrosComponent implements OnInit{
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
