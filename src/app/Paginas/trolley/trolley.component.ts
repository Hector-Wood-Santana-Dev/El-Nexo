import { Component } from '@angular/core';
import {TrolleyServiceService} from "../../service/trolley-service.service";
import {Product} from "../../interface/product";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-trolley',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './trolley.component.html',
  styleUrl: './trolley.component.css'
})
export class TrolleyComponent {
  trolley:Product[]
  total:number;
  constructor(protected trolleyService:TrolleyServiceService) {
    this.trolley=[]
    this.total=0
    this.trolleyService.getTrolley().subscribe(trolleys=>
      this.trolley=trolleys);
    this.trolleyService.getTotal().subscribe(total=> this.total=total);



  }

}
