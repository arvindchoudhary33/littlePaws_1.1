import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  minPassLength = 8;
  isSpinnerLoading: boolean = false;
  constructor(private auth: AuthService) { }

  emailFormControl = new FormControl('xyz@gmail.com', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('xyzxyzxyz', [
    Validators.required,
    Validators.minLength(this.minPassLength),
  ]);

  loginFormGroup = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });
  ngOnInit(): void { }

  login(loginFormGroup: any) {
    console.log('login', loginFormGroup.email);
    if (this.emailFormControl && this.passwordFormControl) {
      this.isSpinnerLoading = true;
      this.auth.login(
        loginFormGroup.email,
        loginFormGroup.password
      );
    }
  }
}
