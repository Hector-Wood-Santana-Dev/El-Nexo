import {inject, Injectable, signal} from "@angular/core";
import {
  applyActionCode,
  Auth,
  createUserWithEmailAndPassword, sendEmailVerification,
  signInWithEmailAndPassword, signOut, updateEmail, updatePassword,
  updateProfile,
  user, verifyBeforeUpdateEmail
} from "@angular/fire/auth";
import {from, Observable} from "rxjs";
import {UserInterface} from "./user.interface";

import {User} from "@firebase/auth";
import firebase from "firebase/compat";
import ActionCodeSettings = firebase.auth.ActionCodeSettings;
import auth = firebase.auth;
import Swal from "sweetalert2";

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
  sendEmailVerification(): Observable<void> {
    const user = this.firebaseAuth.currentUser;
    if (user) {
      const promise = sendEmailVerification(user);
      return from(promise);
    } else {
      return new Observable(observer => {
        observer.error('Usuario no verificado');
      })
    }
  }

  changeInfoUser(username: string, email: string, password: string): Observable<void> {
    const user = this.firebaseAuth.currentUser;
    const emailRegex = /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/;

    if (user) {
      if (email && !emailRegex.test(email)) { // Verificar el formato del email
        Swal.fire({
          icon: 'error',
          text: 'El formato del correo electrónico no es válido.',
        });
      }

      const promises = [];
      if (username) {
        promises.push(updateProfile(user, {displayName: username}));
      }
      if (email && email !== user.email && emailRegex.test(email)) { // Verificar si el email pasado es diferente al email actual
        promises.push(verifyBeforeUpdateEmail(user, email));
        Swal.fire({
          icon: 'success',
          text: 'Se ha enviado un correo electrónico de verificación a su nueva cuenta. Por favor, revise su bandeja de entrada.',
        });
      }
      if (password) {
        promises.push(updatePassword(user, password));
      }
      return from(Promise.all(promises).then(() => {
      }));
    } else {
      return new Observable(observer => {
        observer.error('Usuario no logeado');
      });
    }
  }
}
