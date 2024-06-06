import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BooksServicesService } from '../../services/books-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-book',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './new-book.component.html',
  styleUrl: './new-book.component.css'
})
export class NewBookComponent implements OnInit{

  bookForm : FormGroup
  private bookService = inject(BooksServicesService)
  private router = inject(Router)

  constructor (private FormBuilder : FormBuilder) {
    this.bookForm = this.FormBuilder.group({
      title:['',[Validators.required]],
      description:['',[Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  hasErrors(controlName:string, error:string){
    return this.bookForm.get(controlName)?.hasError(error) && this.bookForm.get(controlName)?.touched
  }

  newBook() {

    this.bookService.newBook(this.bookForm.value).subscribe(data =>{
      console.log(data)
      this.navegate()
    })

  }

  navegate(){
    this.router.navigate(['/books'])
  }





  enviar(event:Event) {
    event.preventDefault()
    console.log(this.bookForm)
  }



}
