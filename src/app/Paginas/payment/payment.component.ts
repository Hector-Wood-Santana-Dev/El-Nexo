import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TrolleyServiceService} from "../../service/trolley-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private router:Router) {
  }
  soloNumeros(e: KeyboardEvent) {
    const key = e.key;
    return !isNaN(Number(key));
  }
  confirmarPago(){

    sessionStorage.removeItem('misProductos');
    this.router.navigate(['catalog']);

  }


}
