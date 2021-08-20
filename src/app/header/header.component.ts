import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { LoginService } from '../auth/login.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name = "";
  email = "";
  constructor(private router: Router,
    public authService: AuthService,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('user-data') || "{}";
    this.name = JSON.parse(this.name).first_name + " " + JSON.parse(this.name).last_name;
    
    this.email = localStorage.getItem('user-data') || "{}";
    this.email = JSON.parse(this.email).email;
    
  }

  logout(){
  this.loginService.logout()
  .subscribe(
    response => {
      this.authService.logout();
      this.router.navigate(['login']);

  },
  error => {

  }
  
  );


  }



}
