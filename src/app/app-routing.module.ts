import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardOverviewComponent } from './components/dashboard/dashboard-overview/dashboard-overview.component';
import { InvoiceOverviewComponent } from './components/dashboard/invoice-overview/invoice-overview.component';
import { DataEntryComponent } from './components/dashboard/data-entry/data-entry.component';

const routes: Routes = [
  
  { path: '', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardComponent,children: [
    { path: 'overview', component: DashboardOverviewComponent },
    { path: 'invoice', component: InvoiceOverviewComponent },
    { path: 'dataentry', component: DataEntryComponent },

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
