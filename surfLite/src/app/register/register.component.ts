import { Component , OnInit} from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formdata ={
    name:'',
    email:'',
    pass:'',
  }
  errorMessage=''
  submit = false;
  loading= false;
  ngOnInit(): void {
    
  }
  constructor(private auth: AuthService){}
  
  onSubmit(){
    console.log(this.formdata);
    this.loading=true;
    this.auth.register(this.formdata.name,this.formdata.email,this.formdata.pass)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken);
        console.log(data.idToken);
        
      },
      error:data=>{
        if(data.error.error.message=="INVALID_EMAIL"){
          this.errorMessage="Invalid Email";
        } else if(data.error.error.message=="EMAIL_EXISTS"){
          this.errorMessage="Email Already exists"
        } else{
          this.errorMessage="Unknown error occured"
        }
      }
    })
  }
}
