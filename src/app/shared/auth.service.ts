import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserFullyAuthenticated: boolean = false;
  detectUserAuthentication: Subject<boolean> = new Subject<boolean>();
  isLogged: Subject<Boolean> = new BehaviorSubject<Boolean>(
    Boolean(localStorage.getItem('token'))
  );
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  // Login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'true');
        localStorage.setItem(
          'isEmailVerified',
          String(res.user?.emailVerified)
        );
        if (res.user?.emailVerified) {
          localStorage.setItem('isUserLoggedIn', 'true');
          this.detectUserAuthentication.next(true);
          this.router.navigate(['/contact-us']);
          this.isLogged.next(true);
        } else {
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
        localStorage.setItem('isUserLoggedIn', 'false');
        // localStorage.setItem('isEmailVerified', String(res.user?.emailVerified))
        this.router.navigate(['/sign-up']);
        this.sendEmailVerification(res.user);
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
        this.isLogged.next(false);
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
    user.sendEmailVerification().then(
      (res: any) => {
        this.router.navigate(['/verify-email']);
      },
      (err: any) => {
        alert(err.message);
      }
    );
  }
}
