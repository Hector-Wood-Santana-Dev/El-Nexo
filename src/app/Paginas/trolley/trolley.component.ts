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
  impuestos:number;
  gastosEn:number;
  pagar:number;

  constructor(protected trolleyService:TrolleyServiceService, private router:Router) {
    this.trolley=[]
    this.total=0
    this.impuestos=0;
    this.gastosEn=0;
    this.pagar=0;
  }
  ngOnInit() {
    this.trolleyService.getTrolley().subscribe(trolleys=>
      this.trolley=trolleys);
    this.trolleyService.getTotal().subscribe(total=> this.total=total);
    if (this.total >100){
      this.gastosEn=0;
    }else {
      this.gastosEn=10;
    }
    this.impuestos= parseFloat((this.total*0.07).toFixed(2));
    this.pagar=this.impuestos+this.impuestos+this.total;

  }

  clickDelete(product:Product){

    if(confirm("Seguro que quieres eliminar")) {
      this.trolleyService.deleteProductTrolley(product);

    }
  }
  clickPagar(){
    this.router.navigate(['payment']);

  }
  esMayor(){
    if(this.total>0){
      return true
    }
    return false
  }

}
