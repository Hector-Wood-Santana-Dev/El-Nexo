import { Component } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {BODCatalogService} from "../../service/bodcatalog.service";
import {getDownloadURL, ref, Storage, uploadBytes} from "@angular/fire/storage";
import {error} from "@angular/compiler-cli/src/transformers/util";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

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
  foto:String;
  constructor(private catalogService:BODCatalogService,
              private storage:Storage,
              private router:Router) {
    file:File;
    this.productForm = new FormGroup({
      nombre:new FormControl('',Validators.required),
      precio: new FormControl(0, Validators.required),
      imagen: new FormControl('',Validators.required),
      descripcion: new FormControl(''),
      categoria: new FormControl(this.categories[0])
    });
    this.foto="";
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
   async uploadImage($event: any){
     if($event.target.files && $event.target.files[0]){
       this.file= $event.target.files[0];
       const reader= new FileReader();
       reader.onload=((event: ProgressEvent<FileReader>)=>{
         if(event.target){
           this.foto=event.target.result as String;
         }
       });
       reader.readAsDataURL($event.target.files[0]);


     }


  }
  async onSubmit() {
    this.addIMG();
    this.getIMG();
    console.log(this.productForm);
    await this.delay(3000);
    if(this.productForm.valid){

      await this.catalogService.addProduct(this.productForm.value);
      Swal.fire({
        icon: 'success',
        text: 'Producto añadido con éxito.',
        willClose: () => {

          this.router.navigate(['admin']);
        }
      });

    }else if (this.productForm.get('nombre')?.errors){
      Swal.fire({
        icon: "error",
        text: "Campo de nombre sin introducir",
      });

    }else if (this.productForm.get('precio')?.errors){
      Swal.fire({
        icon: "error",
        text: "Campo de precio sin introducir",
      });

    }else{
      Swal.fire({
        icon: "error",
        text: "Campo de imagen sin introducir",
      });

    }



  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  cancelClick(){
    this.router.navigate(['admin']);

  }

}

