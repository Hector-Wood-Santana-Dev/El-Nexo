import {Component, inject} from '@angular/core';
import {AuthService} from "../../auth.service";
import { Router } from '@angular/router';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {Auth} from "@angular/fire/auth";
import {routes} from "../../app.routes";
@Component({
  selector: 'app-login-google',
  standalone: true,
  imports: [],
  templateUrl: './login-google.component.html',
  styleUrl: './login-google.component.css'
})
export class LoginGoogleComponent {

  auth = getAuth();
  provider = new GoogleAuthProvider();
  router = inject(Router);

  constructor(router:Router) {
  }

  googleLogin(){
    signInWithPopup(this.auth, this.provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const  credential = GoogleAuthProvider.credentialFromResult(result);
      if(credential){
        const token = credential.accessToken;
      }
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      let returnUrl = localStorage.getItem('returnUrl');
      this.router.navigateByUrl(returnUrl ? returnUrl : '/');
      localStorage.removeItem('returnUrl');
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }




}
