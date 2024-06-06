import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {


  registerForm : FormGroup

  formBuilder = inject(FormBuilder)
  _userService = inject(UsersService)
  _router = inject(Router)

  constructor(){
    
    this.registerForm = this.formBuilder.group({
    name:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }
  
  
    ngOnInit(): void {
    }
  
  

  registerAction() {
    if(!this.testForm()) return
    this._userService.register(this.registerForm.value).subscribe({
      next: token => {
        //console.log(`New User`, token)
        localStorage.setItem('token',token)
        this._router.navigate(['/books'])
      },error : e => {
        console.log(e.error.message)
      }
    })
  }

  testForm() : boolean{
   if(this.registerForm.status == "VALID"){
    return true
   }
   return false
  }

  hasError(formControlName:string,errorType:string){
    return this.registerForm.get(formControlName)?.hasError(errorType) && this.registerForm.get(formControlName)?.touched
  }


}
