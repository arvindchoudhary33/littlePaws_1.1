import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  isLoading: Subject<Boolean> = new BehaviorSubject<Boolean>(false);
  isLogged: Subject<Boolean> = new BehaviorSubject<Boolean>(false
  );
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isLogged.next(Boolean(
      localStorage.getItem('token') && localStorage.getItem('isEmailVerified')))
  }

  openSnackBar(message: any) {
    this._snackBar.open(message, 'Cancel', {
      duration: 3000,
    });
  }

  // Login method
  login(email: string, password: string) {
    this.isLoading.next(true);
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user?.emailVerified) {
          localStorage.setItem('isUserLoggedIn', 'true');
          localStorage.setItem('token', 'true');
          localStorage.setItem(
            'isEmailVerified',
            String(res.user?.emailVerified)
          );
          this.router.navigate(['/all-pets']);
          this.isLoading.next(false);
          this.isLogged.next(true);
        } else {
          this.router.navigate(['/verify-email']);
        }
      },
      (err) => {
        this.openSnackBar(err.code);
        this.isLoading.next(false);
        this.router.navigate(['/sign-up']);
      }
    );
  }

  // Register method

  register(email: string, password: string) {
    this.isLoading.next(true);
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        localStorage.setItem('token', 'false');
        localStorage.setItem('isUserLoggedIn', 'false');
        this.router.navigate(['/sign-up']);
        this.sendEmailVerification(res.user);
        console.log(res.user)
        this.isLoading.next(false);
      },
      (err) => {
        this.openSnackBar(err.code)
        this.router.navigate(['/sign-up']);
        this.isLoading.next(false);
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
    this.isLoading.next(true)
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.router.navigate(['/verify-email']);
        this.isLoading.next(false)
      },
      (err) => {
        this.isLoading.next(false)
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
