import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './shared/services/auth-service.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
 
  constructor(private authService:AuthServiceService){
  }
  ngOnInit(): void {
  
    
  }
  title = 'rent-management-ui';
  //to convert time

}
