import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // Login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        console.log('heeyy successful');
        if (res.user?.emailVerified == true) {
          this.router.navigate(['/choose-type']);
        }
        else {
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        console.log('nooo', err.message);
        this.router.navigate(['/sign-up']);
      }
    );
  }

  // Register method

  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['/verify-email']);
        this.sendEmailVerification(res.user);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/sign-up']);
      }
    );
  }
  isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('token')!);
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  // Sign out
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');

        this.router.navigate(['/sign-up']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/home']);
      }
    );
  }

  //Forgot password
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
      },
      (err) => {
        alert(err.message);
      }
    );
  }

  // Email verification 
  sendEmailVerification(user: any) {
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/verify-email']);
    }, (err: any) => {
      alert(err.message);
    })
  }

}
