import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {getAuth, provideAuth} from "@angular/fire/auth";
import {provideHttpClient} from "@angular/common/http";

//TODO: Recordar añadir clave en local. NO subir clave al repositorio.
export const appConfig: ApplicationConfig = {
  providers:
}
