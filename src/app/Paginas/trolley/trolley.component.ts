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
  constructor(private trolleyService:TrolleyServiceService) {
    this.trolley=[]
    this.trolleyService.getTrolley().subscribe(trolleys=>
      this.trolley=trolleys);

  }
}
