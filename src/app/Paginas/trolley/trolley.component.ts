import {Component, OnInit} from '@angular/core';
import {TrolleyServiceService} from "../../service/trolley-service.service";
import {Product} from "../../interface/product";
import {NgForOf, NgIf} from "@angular/common";
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2';
import {Router} from "@angular/router";
@Component({
  selector: 'app-trolley',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './trolley.component.html',
  styleUrl: './trolley.component.css'
})
export class TrolleyComponent implements OnInit{
  trolley:Product[]
  total:number;
  constructor(protected trolleyService:TrolleyServiceService, private router:Router) {
    this.trolley=[]
    this.total=0
  }
  ngOnInit() {
    this.trolleyService.getTrolley().subscribe(trolleys=>
      this.trolley=trolleys);
    this.trolleyService.getTotal().subscribe(total=> this.total=total);
  }

  clickDelete(product:Product){

    if(confirm("Seguro que quieres eliminar")) {
      this.trolleyService.deleteProductTrolley(product);

    }
  }
  clickPagar(){
    this.router.navigate(['payment']);

  }

}
