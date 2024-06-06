import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {


  loginForm : FormGroup

  formBuilder = inject(FormBuilder)
  _userService = inject(UsersService)
  _router = inject(Router)

  constructor () {
    this.loginForm = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  signIn(){
    if(!this.testForm()) return

    this._userService.signIn(this.loginForm.value).subscribe({
      next: token => {
        //console.log(`Inicio Sesion Correctamente`,token)
        this._router.navigate(['/books'])
        
        localStorage.setItem('token',token)
      },error: e => {
        console.log(`Error Al Inicio sesion`,e)
        
      }
    })
  }

  
  testForm() : boolean {
    if(this.loginForm.status == "VALID"){
      return true
    }
    return false
  }

  hasError(formControlName:string,typeError:string){
    return this.loginForm.get(formControlName)?.hasError(typeError) && this.loginForm.get(formControlName)?.touched
  }

  

  
}
