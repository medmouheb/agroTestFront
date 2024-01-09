import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/components/service/login.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {


  password;
  username;
  company;
  email;
  constructor(private loginService : LoginService) { }

  ngOnInit(): void {
  }

  saveUser(){

    let user = {
      username : this.username , 
      password : this.password ,
      company :  this.company,
      email : this.email,
      roles : ["ADMIN_ENTREPRISE"]

    }
    this.loginService.signUp(user).subscribe(res => {
      
    })

  }
}
