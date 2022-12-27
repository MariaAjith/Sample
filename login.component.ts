import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {}
  loginForm=new FormGroup({
    userName:new FormControl("",[Validators.required,
    Validators.nullValidator]),
    passWord:new FormControl("",[Validators.required,
    Validators.minLength(6),Validators.maxLength(16), //Validators
    ]),
  });
  isUserValid:boolean=false;
  ValidateLogin(){
    this.auth.userLogin([this.loginForm.value.userName, this.loginForm.value.passWord])
    .subscribe(res=> {
        if(res == 'Failure'){
          this.isUserValid =false;
          alert('Invalid User!');
          this.router.navigateByUrl('register');
        }
        else{
          this.isUserValid = true;
          alert('Login Successful');
          this.router.navigateByUrl('dashboard');
        }
    });
   
  }
  get UserName(): FormControl{
    return this.loginForm.get('userName') as FormControl;
  }
  get Password(): FormControl{
    return this.loginForm.get('passWord') as FormControl;
  } 

}

// Adding Audio and Video
