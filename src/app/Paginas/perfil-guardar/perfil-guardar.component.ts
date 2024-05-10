import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {AuthService} from "../../auth.service";
import {doc, Firestore, setDoc} from "@angular/fire/firestore";
import {Router} from "@angular/router";
import 'sweetalert2/src/sweetalert2.scss'
import Swal from 'sweetalert2';
import {BODCatalogService} from "../../service/bodcatalog.service";
import {PerfilService} from "../../service/perfil.service";
import {Product} from "../../interface/product";
import {Perfil} from "../../interface/profile";

import {ReadTextService} from "../../service/read-text.service";
import {ChangeLanguageService} from "../../service/change-language.service";

@Component({
  selector: 'app-perfil-guardar',
  standalone: true,
  imports: [
    NgStyle,
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './perfil-guardar.component.html',
  styleUrl: './perfil-guardar.component.css'
})
export class PerfilGuardarComponent implements OnInit{
  datosJson: any;
  authService = inject(AuthService)
  @ViewChild('emailInput', { static: true }) emailInput!: ElementRef;
  @ViewChild('usernameInput', { static: true }) usernameInput!: ElementRef;
  @ViewChild('direccionInput', { static: true }) direccionInput!: ElementRef;
  @ViewChild('postalInput', { static: true }) postalInput!: ElementRef;
  @ViewChild('telefonoInput', { static: true }) telefonoInput!: ElementRef;
  @ViewChild('nombreInput', { static: true }) nombreInput!: ElementRef;
  @ViewChild('numerotarjetaInput', { static: true }) numerotarjetaInput!: ElementRef;
  @ViewChild('csvInput', { static: true }) csvInput!: ElementRef;
  @ViewChild('mescaducidadInput', { static: true }) mescaducidadInput!: ElementRef;
  @ViewChild('yearcaducidadInput', { static: true }) yearcaducidadInput!: ElementRef;
  constructor(private firestore: Firestore, private router: Router, private perfilimage:PerfilService,private ReadText: ReadTextService, private ChangeLanguageService: ChangeLanguageService) {
  }
  selectedImageUrl = this.authService.currentUserSig()?.photoURL;
  verimagenes:boolean = false;
  imagenes : Perfil[] = [];
  indiceActual = 0;
  foto_elegida = this.authService.currentUserSig()?.photoURL;
  seleccionarImagen( imageUrl: Perfil) {
    console.log(this.foto_elegida);
    this.selectedImageUrl = imageUrl.image;
    this.foto_elegida = imageUrl.image;
    console.log(imageUrl.image);
    this.verimagenes = !this.verimagenes;

  }
  verImagenes(){
    this.verimagenes = !this.verimagenes;
    console.log('cambio');
  }
  loading = false;
  ngOnInit(){
    this.updateJson();

    this.ChangeLanguageService.getLanguageChangeObservable().subscribe(newLanguage=>{
      this.updateJson();
    })
    if (this.foto_elegida == undefined){
      this.foto_elegida = 'https://firebasestorage.googleapis.com/v0/b/el-nexo-ps.appspot.com/o/paginas_estaticas%2Fsolo-leveling.png?alt=media&token=1c074bdb-054f-4576-b617-738fa729d934'
    }
    this.loading=true;
    this.perfilimage.getImages().subscribe(images=>{
      this.imagenes=images ;
      this.originalItems = [...this.imagenes];
      setTimeout(() => {
        this.loading = false;
      }, 3000);});
  }
  originalItems = [...this.imagenes];
  soloNumeros(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.keyCode);

    // Permitir teclas de borrar (keyCode 8) y suprimir (keyCode 46)
    if (!pattern.test(inputChar) && event.keyCode != 8 && event.keyCode != 46) {
      // Carácter no válido, se previene la entrada
      event.preventDefault();
    }
  }

  updateJson(){
    this.ReadText.getJson().subscribe(json => {
      this.datosJson = json;
    })
  }

  soloLetras(event: any) {
    const pattern = /[a-zA-ZñÑ\s]/;
    let inputChar = String.fromCharCode(event.keyCode);

    if (!pattern.test(inputChar) && event.keyCode != 8 && event.keyCode != 46) {
      // Carácter no válido, se previene la entrada
      event.preventDefault();
    }
  }



  cargarPagina(url: string) {
    this.router.navigate([url]);
    localStorage.setItem('returnUrl', this.router.url);
  }

  async guardarUser() {
    let year = new Date().getFullYear();
    const valorEmail = this.emailInput.nativeElement.value;
    const valorUsername = this.usernameInput.nativeElement.value;
    const valorDireccion = this.direccionInput.nativeElement.value;
    const valorPostal = this.postalInput.nativeElement.value;
    const valorTelefono = this.telefonoInput.nativeElement.value;
    const valorNombre = this.nombreInput.nativeElement.value;
    const valorNumeroTarjeta = this.numerotarjetaInput.nativeElement.value;
    const valorCsv = this.csvInput.nativeElement.value;
    const valorMesCaducidad = this.mescaducidadInput.nativeElement.value;
    const valorYearCaducidad = this.yearcaducidadInput.nativeElement.value;
    const uid: string | undefined = this.authService.currentUserSig()?.uid;
    if (
      !valorEmail ||
      !valorUsername ||
      !valorDireccion ||
      !valorPostal ||
      !valorTelefono ||
      !valorNombre ||
      !valorNumeroTarjeta ||
      !valorCsv ||
      !valorMesCaducidad ||
      !valorYearCaducidad
    ) {
      Swal.fire({
        icon: 'error',
        text: 'Hay campos vacíos.',
      });
      return;
    }      else if (    valorPostal.length != 5 ||
      valorTelefono.length != 9 ||
      valorNumeroTarjeta.length != 16 ||
      valorCsv.length != 3 ||
      valorMesCaducidad.length > 2 ||
      valorYearCaducidad.length != 4
    ){      Swal.fire({
      icon: 'error',
      text: 'Hay campos con un número de dígitos incorrecto.',
    }); }
    else if (valorYearCaducidad < year || valorMesCaducidad > 12 ) {
      Swal.fire({
        icon: 'error',
        text: 'Fecha de caducidad inválida.',
      }); }
    else {
      if (typeof uid === "string") {
        if (this.selectedImageUrl != this.authService.currentUserSig()?.photoURL){
          await this.authService.actualizarFoto(this.selectedImageUrl);
          console.log('foto distinta')
        }
        if (valorUsername != this.authService.currentUserSig()?.username){
          await this.authService.actualizarUsername(valorUsername);
          console.log('username distinto')
        }
        if (valorEmail != this.authService.currentUserSig()?.email){
          await this.authService.actualizarEmail(valorEmail);
        }
        await this.authService.actualizarUsername(valorUsername);
        await setDoc(doc(this.firestore, "users", uid), {
          email: valorEmail,
          username: valorUsername,
          direccion: valorDireccion,
          postal: valorPostal,
          telefono: valorTelefono,
          nombre_titular: valorNombre,
          numero_tarjeta: valorNumeroTarjeta,
          csv: valorCsv,
          mes_caducidad: valorMesCaducidad,
          year_caducidad: valorYearCaducidad
        });
      }

      this.cargarPagina('/profile');

    }

  }

}



