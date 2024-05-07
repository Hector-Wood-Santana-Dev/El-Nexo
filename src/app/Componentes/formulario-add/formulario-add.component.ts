import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {BODCatalogService} from "../../service/bodcatalog.service";
import {getDownloadURL, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-formulario-add',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './formulario-add.component.html',
  styleUrl: './formulario-add.component.css'
})
export class FormularioAddComponent {

  categories = ['Manga', 'Comic', 'Anime', 'Figura'];
  productForm:FormGroup;
  constructor(private catalogService:BODCatalogService,
              private storage:Storage) {
    file:File;
    this.productForm = new FormGroup({
      nombre:new FormControl(''),
      precio: new FormControl(0),
      imagen: new FormControl(''),
      descripcion: new FormControl(''),
      categoria: new FormControl(this.categories[0])
    });
  }
  async addIMG(){
    const imgRef=ref(this.storage,`${this.file?.name}`);
    if (this.file !== null) {
      await uploadBytes(imgRef, this.file);
    } else {}
  }
  async getIMG(){
    const imgRef=ref(this.storage,`${this.file?.name}`);
    const url = await getDownloadURL(imgRef);
    this.productForm.controls['imagen'].setValue(url);

  }
  file:File|null =null;
  uploadImage($event: any){
     this.file= $event.target.files[0];


  }
  async onSubmit() {
    this.addIMG();
    this.getIMG();
    console.log(this.productForm);
    await this.delay(5000);
    await this.catalogService.addProduct(this.productForm.value);


  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

