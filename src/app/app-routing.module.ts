import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { DashboardOverviewComponent } from './components/dashboard/dashboard-overview/dashboard-overview.component';
import { InvoiceOverviewComponent } from './components/dashboard/invoice-overview/invoice-overview.component';
import { DataEntryComponent } from './components/dashboard/data-entry/data-entry.component';
import { PropertyManagementComponent } from './components/dashboard/property-management/property-management.component';
import { TenantManagementComponent } from './components/dashboard/tenant-management/tenant-management.component';

const routes: Routes = [
  
  { path: '', component: LandingPageComponent },
  { path: 'dashboard', component: DashboardComponent,children: [
    { path: 'overview', component: DashboardOverviewComponent },
    { path: 'invoice', component: InvoiceOverviewComponent },
    { path: 'dataentry', component: DataEntryComponent },
    { path: 'tenantoverview', component: TenantManagementComponent },
    { path: 'propertyoverview', component: PropertyManagementComponent },

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
