import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  constructor(private router:Router) {
  }
  buyForm = new FormGroup({
    name: new FormControl('', Validators.required),
    tarjeta: new FormControl('',[Validators.required, Validators.maxLength(16), Validators.minLength(16)]),
    csv: new FormControl('', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]),
    mes: new FormControl('', [Validators.required, Validators.maxLength(2), Validators.minLength(2)]),
    año: new FormControl('', [Validators.required, Validators.maxLength(4), Validators.minLength(4)]),
    telefono: new FormControl('', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]),
    postal: new FormControl('', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]),
    direccion: new FormControl('', Validators.required),


  });
  soloNumeros(e: KeyboardEvent) {
    const key = e.key;
    return !isNaN(Number(key));
  }
  confirmarPago(){

    if (this.buyForm.valid) {
      console.log('Formulario enviado!');
      sessionStorage.removeItem('misProductos');
      this.router.navigate(['catalog']);
    } else {
      /*campos sin rellenar*/
      if(this.buyForm.get('name')?.errors){
        Swal.fire({
          icon: "error",
          text: "Campo de nombre sin introducir",
        });


      }else if(this.buyForm.get('tarjeta')?.invalid){
        if( this.buyForm.get('tarjeta')?.errors?['minlength']||this.buyForm.get('tarjeta')?.errors?['maxlength']: false:false){
          Swal.fire({
            icon: "error",
            text: "El número de tarjeta no es válido",
          });

        }else {
          Swal.fire({
            icon: "error",
            text: "Campo de tarjeta sin introducir",
          });
        }

      }else if(this.buyForm.get('csv')?.invalid){
        if( this.buyForm.get('csv')?.errors?['minlength']||this.buyForm.get('csv')?.errors?['maxlength']: false:false){
          Swal.fire({
            icon: "error",
            text: "El CSV no es válido",
          });

        }else {
          Swal.fire({
            icon: "error",
            text: "Campo de csv sin introducir",
          });
        }

      }else if(this.buyForm.get('mes')?.invalid){
        if( this.buyForm.get('mes')?.errors?['minlength']||this.buyForm.get('mes')?.errors?['maxlength']: false:false){
          Swal.fire({
            icon: "error",
            text: "El mes no es válido",
          });

        }else {
          Swal.fire({
            icon: "error",
            text: "Campo de mes sin introducir",
          });
        }

      }else if(this.buyForm.get('año')?.invalid){
        if( this.buyForm.get('año')?.errors?['minlength']||this.buyForm.get('año')?.errors?['maxlength']: false:false){
          Swal.fire({
            icon: "error",
            text: "El año no es válido",
          });

        }else {
          Swal.fire({
            icon: "error",
            text: "Campo de tarjeta sin introducir",
          });
        }

      }else if(this.buyForm.get('telefono')?.invalid){
        if( this.buyForm.get('telefono')?.errors?['minlength']||this.buyForm.get('telefono')?.errors?['maxlength']: false:false){
          Swal.fire({
            icon: "error",
            text: "El número de telefono no es válido",
          });

        }else {
          Swal.fire({
            icon: "error",
            text: "Campo de telefono sin introducir",
          });
        }

      }else if(this.buyForm.get('postal')?.invalid){
        if( this.buyForm.get('postal')?.errors?['minlength']||this.buyForm.get('postal')?.errors?['maxlength']: false:false){
          Swal.fire({
            icon: "error",
            text: "El codigo postal no es válido",
          });

        }else {
          Swal.fire({
            icon: "error",
            text: "El codigo posta esta  sin introducir",
          });
        }

      }else{
        /*direccion*/
        Swal.fire({
          icon: "error",
          text: "Campo de direcion de facturacion sin introducir",
        });
      }

    }

  }


}
