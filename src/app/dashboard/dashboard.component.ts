import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../auth/auth-service';
import { IProduct, Users } from '../data/product.model';
import { ProductApiService } from '../services/product.api.services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // products: IProduct[] = [];
  // ! Experimental 
  // products$!: Observable<Users[]>;
  user$!: Observable<any>;
  
  user!: any;
  users: Users[] = [];
  sub!: Subscription;
  errorMessage: string = '';
  selectedDevice!: any;
  currentrole: any = 'default';
  abc!: any;


  constructor(private apiService: ProductApiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.sub = this.apiService.getUsers().subscribe(
      {
        next: product => { this.users = product },
        error: err => this.errorMessage = err
      }
    );
    // this.products=this.productService.getProducts();
  }

  changeRole(changeRoleForm: NgForm) {
    console.log("Login successful" + JSON.stringify(changeRoleForm.value));

    if (changeRoleForm.invalid) {
      return;
    }
    // console.log(changeRoleForm.value.newrole, ' <== changeRoleForm.value.newrole');
    // console.log(changeRoleForm.value.username, ' <== changeRoleForm.value.username');

    // this.isLoading = true;
    let response = this.authService.changeRole(changeRoleForm.value.newrole, changeRoleForm.value.username);
    console.log(response.subscribe({ next: abc => { this.abc = abc } }) + 'response when sumbit !!');

  }

    async changeIdRoles(e: any) {
    let data = e.value;
    console.log(data + ' userId '); // this is user id.
    // now i have to get role
    this.sub = await this.apiService.getUser(data).subscribe(
      {
        next: singleUsersData => { this.user = singleUsersData },
        error: err => this.errorMessage = err
      }
    );
    this.currentrole = this.user.role;



    // {"_id":"6242d3a01138c2e655da880d","email":"hello@gmail.com","password":"$2b$10$Ai8qKKbaXy9kbxijbM8dteX0uU5GOTt7TPre9YLPz1Hv4Y2ELndNG","__v":0,"role":"user"}

      // ! Experimental sj
      // this.products$ = this.apiService.getProducts()
      this.user$ = this.apiService.getUser(data)
      .pipe(
        catchError(

          err => {
            this.errorMessage = err;
            return EMPTY;
            // return of([])
          }
        )
      )

  }

}
