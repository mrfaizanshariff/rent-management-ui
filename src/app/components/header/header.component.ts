import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private afAuth:AuthServiceService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  registerLoginButton(){
      this.afAuth.loginWithGoogle().then(
        res=>{
          console.log(res)
          this.router.navigate(['/dashboard'])
        }
      )
  }

}
