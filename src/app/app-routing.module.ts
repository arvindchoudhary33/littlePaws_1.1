import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInGuardService } from './auth-guard/sign-in-guard.service';
import { UserAuthGuardService } from './auth-guard/user-auth-guard.service';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AllPetsComponent } from './components/all-pets/all-pets.component';
import { ChooseTypeComponent } from './components/choose-type/choose-type.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FaqComponent } from './components/faq/faq.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyPasswordComponent } from './components/verify-password/verify-password.component';

const routes: Routes = [
  { path: '', redirectTo: 'HomeComponent', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
  { path: 'faq', component: FaqComponent },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [SignInGuardService],
  },
  {
    path: 'choose-type',
    component: ChooseTypeComponent,
    canActivate: [UserAuthGuardService],
  },
  {
    path: 'all-pets',
    component: AllPetsComponent,
    canActivate: [UserAuthGuardService],
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email', component: VerifyPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
