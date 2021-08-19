import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ValidateInputService } from '../validate-input.service';
import { LoginService } from '../login.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('userNotFound')
  userNotFound!: ElementRef<HTMLInputElement>;

  constructor(private validateInputService: ValidateInputService, 
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  validate(email: string, password: string): void{
    email = email.trim();
    if(this.validateInputService.validateEmail(email)){
      console.log('good');
      this.logIn(email, password);
    }
    else{
      this.userNotFound.nativeElement.textContent = "Your email is not valid"
    }
  }

  logIn(email: string, password: string): void {

    this.loginService.login(email, password)
      .subscribe(
        response => {
          this.authService.login();
        console.log(response);
        localStorage.setItem('user-data', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.authentication.access_token);
        this.router.navigate(['events']);
      },
      error => {
        console.log(error.error.message);
        this.userNotFound.nativeElement.textContent = error.error.message;
      }
      
      );
      
  }

}


