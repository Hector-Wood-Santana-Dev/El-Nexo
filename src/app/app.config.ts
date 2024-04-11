import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

//TODO: Recordar añadir clave en local. NO subir clave al repositorio.
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"el-nexo-ps","appId":"1:201490379053:web:84abadd25ae8e7d7f9e3a4","storageBucket":"el-nexo-ps.appspot.com","apiKey":"AIzaSyAAtjlz_iEiNM8-1VV7tWb8wS1uxy2Ms_c","authDomain":"el-nexo-ps.firebaseapp.com","messagingSenderId":"201490379053"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
