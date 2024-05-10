import {inject, Injectable, signal} from "@angular/core";
import {
  applyActionCode,
  Auth,
  createUserWithEmailAndPassword, sendEmailVerification,
  signInWithEmailAndPassword, signOut, updateEmail,
  updateProfile,
  user, verifyBeforeUpdateEmail
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {UserInterface} from "./user.interface";

import {User} from "@firebase/auth";
import firebase from "firebase/compat";
import ActionCodeSettings = firebase.auth.ActionCodeSettings;
import auth = firebase.auth;

@Injectable({
  providedIn:'root'
})
export class AuthService {
  firebaseAuth = inject(Auth)
  user$ = user(this.firebaseAuth)
  currentUserSig = signal<UserInterface | null | undefined>(undefined)


  register(email: string, username: string, password: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,).then(response =>
      updateProfile(response.user, {displayName: username}),
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password,
    ).then(() => {
    });
    return from(promise)
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  async actualizarUsername(username: string) {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      try {
        await updateProfile(user, {
          displayName: username
        });


      } catch (error) {
        // Manejar cualquier error que ocurra durante la actualización del correo electrónico
        console.error("Error al actualizar el nombre de usuario:", error);
        throw error; // Puedes decidir lanzar el error o manejarlo de otra manera según tus necesidades
      }
    }
  }
  async actualizarFoto(foto: string | undefined) {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      try {
        await updateProfile(user, {
          photoURL: foto
        });


      } catch (error) {
        // Manejar cualquier error que ocurra durante la actualización del correo electrónico
        console.error("Error al actualizar el nombre de usuario:", error);
        throw error; // Puedes decidir lanzar el error o manejarlo de otra manera según tus necesidades
      }
    }
  }

  async actualizarEmail(email: string) {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      try {
        // Actualizar el correo electrónico
        await updateEmail(user, email);
      } catch (error) {
        console.error("Error al actualizar el correo electrónico:", error);
        throw error;
      }
    }
  }

}
