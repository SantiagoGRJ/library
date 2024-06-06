import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { BooksComponent } from './pages/books/books.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './utils/auth.guard';

export const routes: Routes = [
  /**
   * Routes Books
   */
  /* {path:'',component:HomeComponent}, */
  {path:'books',component:BooksComponent,canActivate:[authGuard]},
  {path:'books/:id',component:BookDetailsComponent,canActivate:[authGuard]},
  {path:'books-add',component:NewBookComponent,canActivate: [authGuard]},

  /**
   * Routes Auth
   */
  {path:'',component:SignInComponent},
  {path:'register',component:RegisterComponent},


  {path:'**',redirectTo:'',pathMatch:'full'},
];
