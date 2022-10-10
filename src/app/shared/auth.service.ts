import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  // Login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        console.log('heeyy successful');
        this.router.navigate(['home']);
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
      () => {
        alert('registered successfuly');
        this.router.navigate(['/home']);
      },
      (err) => {
        alert(err.message);
        this.router.navigate(['/sign-up']);
      }
    );
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
}
