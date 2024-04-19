import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  registerForm: FormGroup;
  aceptaTerminos: boolean = true;


  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      regEmail: [
        '',
        [
          Validators.required,
          this.emailFormat.bind(this)
        ]
      ],
      regPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],
    });
  }

  emailFormat(control: FormControl) {
    const emailPattern = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    if (!control.value) {
      return { invalidEmail: true, required: true };
    } else if (!emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  };

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  login() {
    const loginElement = document.getElementById('login');
    const registerElement = document.getElementById('register');
    const elegirElement = document.getElementById('elegir');

    if (loginElement && registerElement && elegirElement) {
      loginElement.style.left = '50px';
      registerElement.style.left = '450px';
      elegirElement.style.left = '0px';
    }
  }

  registrar() {
    const loginElement = document.getElementById('login');
    const registerElement = document.getElementById('register');
    const elegirElement = document.getElementById('elegir');

    if (loginElement && registerElement && elegirElement) {
      loginElement.style.left = '-400px';
      registerElement.style.left = '50px';
      elegirElement.style.left = '120px';
    }
  }

  autenticar_usuario() {
    const username = this.loginForm.get('username')?.value;

    if (username && username.trim() !== '') {
      alert("Bienvenido, " + username);
    }
  }
  terminos (){
    this.aceptaTerminos = !this.aceptaTerminos;
  }
  registrar_usuario() {
    const regEmailControl = this.registerForm.get('regEmail');

    // Verificar si el campo de correo está vacío
    if (!regEmailControl?.value) {
      return; // Salir de la función sin hacer nada si está vacío
    }
    if (this.registerForm.get('regEmail')?.errors?.['invalidEmail']) {
      Swal.fire({
        icon: "error",
        text: "El formato del correo electrónico es inválido",
      });
    } else if (this.registerForm.get('regPassword')?.errors?.['required']) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña es requerida',
      });
    } else if (this.registerForm.get('regPassword')?.errors?.['minlength']) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 6 caracteres',
      });
    } else if (!this.aceptaTerminos) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debes aceptar los términos y condiciones para registrar',
      });
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: '¡Tu registro se ha realizado correctamente!',
      });
    }

  }

}
