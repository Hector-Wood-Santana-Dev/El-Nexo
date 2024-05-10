import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {AuthService} from "../../auth.service";
import {Firestore, setDoc, doc, getDoc} from "@angular/fire/firestore";


async function getData(user: AuthService,database:Firestore, formulario:FormGroup) {
  const uid = user.currentUserSig()?.uid;
  console.log(uid);
  if(typeof uid === "string"){
    const docRef = doc(database, "users", uid);
    const docSnap = await getDoc(docRef);



    if (docSnap.exists()) {
      const userData = docSnap.data();
      // const formulario = this.buyForm;
      // Carga de elementos de pago
      let name1:HTMLInputElement | null = document.getElementById('name1') as HTMLInputElement;
      if(name1){
        name1.value = userData['nombre_titular'];
        let form1 = formulario.get('name');
        if(form1){
          form1.setValue(userData['nombre_titular']);
        }

      }
      let tarjeta:HTMLInputElement | null = document.getElementById('tarjeta') as HTMLInputElement;
      if(tarjeta){
        tarjeta.value = userData['numero_tarjeta'];
        let form2 = formulario.get('tarjeta');
        if(form2){
          form2.setValue(userData['numero_tarjeta']);
        }
      }
      let csv:HTMLInputElement | null = document.getElementById('csv') as HTMLInputElement;
      if(csv) {
        csv.value = userData['csv'];
        let form3 = formulario.get('csv');
        if(form3){
          form3.setValue(userData['csv']);
        }
      }
      let month:HTMLInputElement | null = document.getElementById('month') as HTMLInputElement;
      if(month) {
        month.value = userData['mes_caducidad'];
        let form4 = formulario.get('mes');
        if(form4){
          form4.setValue(userData['mes_caducidad']);
        }
      }
      let year:HTMLInputElement | null = document.getElementById('year') as HTMLInputElement;
      if(year) {
        year.value = userData['year_caducidad'];
        let form5 = formulario.get('año');
        if(form5){
          form5.setValue(userData['year_caducidad']);
        }
      }
      let telefono:HTMLInputElement | null = document.getElementById('telefono') as HTMLInputElement;
      if(telefono) {
        telefono.value = userData['telefono'];
        let form6 = formulario.get('telefono');
        if(form6){
          form6.setValue(userData['telefono']);
        }
      }
      let postal:HTMLInputElement | null = document.getElementById('postal') as HTMLInputElement;
      if(postal) {
        postal.value = userData['postal'];
        let form7 = formulario.get('postal');
        if(form7){
          form7.setValue(userData['postal']);
        }
      }
      let direccion:HTMLInputElement | null = document.getElementById('direccion') as HTMLInputElement;
      if(direccion) {
        direccion.value = userData['direccion'];
      }
      let form8 = formulario.get('direccion');
      if(form8){
        form8.setValue(userData['direccion']);
      }

      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case

      console.log("No such document!");
    }
  }
}

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
export class PaymentComponent implements OnInit{
  authService = inject(AuthService);

  constructor(private firestore:Firestore, private router:Router) {
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
    guardar: new FormControl(false),

  });
  soloNumeros(e: KeyboardEvent) {
    const key = e.key;
    return !isNaN(Number(key));
  }
  confirmarPago(){
    let formulario = this.buyForm
    let firestore = this.firestore;
    let user = this.authService;
    const uid: string | undefined = user.currentUserSig()?.uid;

    async function guardarDatos() {
      if(typeof uid === "string" ){
        await setDoc(doc(firestore, "users", uid),
         {
          direccion: formulario.get('direccion')?.value,
          postal: formulario.get('postal')?.value,
          telefono: formulario.get('telefono')?.value,
          nombre_titular: formulario.get('name')?.value,
          numero_tarjeta: formulario.get('tarjeta')?.value,
          csv: formulario.get('csv')?.value,
          mes_caducidad: formulario.get('mes')?.value,
          year_caducidad: formulario.get('año')?.value
        });
      }
    }

    if (this.buyForm.valid) {
      guardarDatos();

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

   ngOnInit(): void {
       getData(this.authService,this.firestore,this.buyForm);
  }



}
