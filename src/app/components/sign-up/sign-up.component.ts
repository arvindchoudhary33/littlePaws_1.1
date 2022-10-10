import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // email: string = '';
  // password: string = '';
  isDisabled: boolean = true;
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
  signUpFormGroup = new FormGroup({
    email: this.emailFormControl,
    password: this.passwordFormControl,
  });

  ngOnInit(): void { }
  register(signUpForm: any) {
    // console.log(signUpForm);
    console.log('heyyy', signUpForm.email);

    if (this.emailFormControl && this.passwordFormControl) {
      this.auth.register(signUpForm.email, signUpForm.password);
    }
  }
}
