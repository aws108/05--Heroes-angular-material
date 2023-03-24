import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthInterface } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  username: any;

  constructor(private router: Router,
              private authService: AuthService){}
  
  ngOnInit(): void {
    this.getUser();
  }

  logout(){
    this.router.navigate(['./auth'])
  }

  getUser(){
    this.username = this.authService.getUsername();
  }

}
