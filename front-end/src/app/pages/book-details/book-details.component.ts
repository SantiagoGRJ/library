import { Component, inject, OnInit } from '@angular/core';

import { BooksServicesService } from '../../services/books-services.service';
import { Ibook } from '../../models/book';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css'
})
export class BookDetailsComponent implements OnInit {

  updateForm : FormGroup

  private _activedRouter = inject(ActivatedRoute)
  private _router = inject(Router)
  private _BookService = inject(BooksServicesService)

  book ?: Ibook


  constructor(private formBuild: FormBuilder) {
    this.updateForm = this.formBuild.group({
      title:['',[Validators.required,]],
      description:['',[Validators.required]]
    })
  }

  ngOnInit(): void {
    this.suscribeRouterParams()
  }

  suscribeRouterParams(){
    this._activedRouter.params.subscribe({
      next: params => {
        this.getBookDetails(params['id'])
      }, error: (e) => {
        console.log(e)
      }
    })
  }
  getBookDetails(id:string){
    this._BookService.getBook(id).subscribe({
      next: (data: Ibook) => {
        this.book=data
        console.log(data)
      }, error: e => {
        console.log(e)
      }
    })
  }


  updateBook() {
    this._BookService.updateBook(this.book?.id,this.updateForm.value).subscribe({
      next: data => {
        this.navigate()
        console.log(data)
      },error : e => {
        console.log(e)
      }
    })
    console.log(this.updateForm.value)
  }

  navigate() {
    this._router.navigate(['/books'])
  }

}
