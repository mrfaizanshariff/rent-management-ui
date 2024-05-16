import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/shared/services/auth-service.service';

@Component({
  selector: 'app-register-component',
  templateUrl: './register-component.component.html',
  styleUrls: ['./register-component.component.scss']
})
export class RegisterComponentComponent implements OnInit {
  hidePasswword: boolean = true;
  hideConfirmPassword: boolean = true;
  registrationForm!: FormGroup<any>;
  constructor(private formBuilder: FormBuilder,
     private authService:AuthServiceService,
     private router:Router,
     private dialogRef:MatDialogRef<RegisterComponentComponent>,
     @Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firmName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
  });
    console.log(this.data)

  }
}
