import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';
import { RegisterComponentComponent } from './components/auth/register-component/register-component.component';
import { LoginComponentComponent } from './components/auth/login-component/login-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getAuth,provideAuth } from '@angular/fire/auth';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardOverviewComponent } from './components/dashboard/dashboard-overview/dashboard-overview.component';
import { DataEntryComponent } from './components/dashboard/data-entry/data-entry.component';
import { InvoiceOverviewComponent } from './components/dashboard/invoice-overview/invoice-overview.component';
import { AddPropertyDialogComponent } from './components/add-property-dialog/add-property-dialog.component';
import { AddTenantDialogComponent } from './components/add-tenant-dialog/add-tenant-dialog.component';
import { TenantManagementComponent } from './components/dashboard/tenant-management/tenant-management.component';
import { PropertyManagementComponent } from './components/dashboard/property-management/property-management.component';
// import { getAuth } from 'firebase/auth';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponentComponent,
    LoginComponentComponent,
    DashboardComponent,
    HeaderComponent,
    LandingPageComponent,
    DashboardOverviewComponent,
    DataEntryComponent,
    InvoiceOverviewComponent,
    AddPropertyDialogComponent,
    AddTenantDialogComponent,
    TenantManagementComponent,
    PropertyManagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    provideAuth(()=>getAuth()),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
