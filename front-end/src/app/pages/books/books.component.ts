
import { Component, OnInit,  inject } from '@angular/core';
import { BooksServicesService } from '../../services/books-services.service';
import { Ibook } from '../../models/book';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit{

  private _BooksService = inject(BooksServicesService)

  bookList : Ibook[] = []
 

  ngOnInit(): void {
    this.getBook()
  }

  getBook() {
    this._BooksService.getAllBooks().subscribe({
      next:(data:Ibook[])=>{
        this.bookList=data
       
        //console.log(data)
      },error : e => {
        
        console.log(e)
      }
    })
  }

  deleteBook(id : any) {
    this._BooksService.deleteBook(id).subscribe((data:Ibook)=>{
      console.log(data)
      this.getBook()
    })
  }

}
