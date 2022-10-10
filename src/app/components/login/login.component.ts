import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // email: string = '';
  // password: string = '';
  minPassLength = 8;
  constructor(private auth: AuthService) { }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.minPassLength),
  ]);

  loginFormGroup = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl
  })
  ngOnInit(): void { }

  login(loginFormGroup: any) {
    console.log('login', loginFormGroup.email);

    if (this.emailFormControl && this.passwordFormControl) {
      this.auth.login(loginFormGroup.email, loginFormGroup.password);
    }
  }
}
