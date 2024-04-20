import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule, FormsModule} from '@angular/forms';
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth.service";


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
  fb = inject(FormBuilder);
  http = inject(HttpClient);
  authService = inject(AuthService)
  router = inject(Router);
  loginform = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  registerform = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;
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

  autenticar_usuario(): void {
    const rawForm = this.loginform.getRawValue()
    if (!rawForm.email || !rawForm.email) {
      Swal.fire({
        icon: 'error',
        text: 'Por favor, ingrese su correo electrónico y contraseña.',
      });
      return;
    }
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next:()=>{
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        this.errorMessage = err.code;
        Swal.fire({
          icon: 'error',
          text: 'Inicio de Sesión Incorrecto.',
        });
      }
    })
  }

  registrar_usuario():void {
    const rawForm = this.registerform.getRawValue()
    if (!rawForm.email || !rawForm.email) {
      Swal.fire({
        icon: 'error',
        text: 'Por favor, ingrese su correo electrónico y contraseña.',
      });
      return;
    }

    this.authService.register(rawForm.email, rawForm.username, rawForm.password).subscribe({
      next:()=>{
        this.router.navigateByUrl('/')
      },
      error: (err) => {
        this.errorMessage = err.code;

        Swal.fire({
          icon: 'error',
          text: 'El correo electrónico o la contraseña son incorrectos',
        });
      }
    })

  }

}
