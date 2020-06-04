import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      // { path: '', redirectTo: 'dashboard' },
      // { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule',  canActivate: [ActivateDashboard] },
      // { path: 'calendar', loadChildren: './doorway/doorway.module#DoorwayModule' },
      // { path: 'people', loadChildren: './people/people.module#PeopleModule' },
      // { path: 'me', loadChildren: './me/me.module#MeModule', canActivate: [ActivateDashboard] },
      // { path: 'reports', loadChildren: './reports/reports.module#ReportsModule', canActivate: [ActivateReports] },
      //{ path: '**', redirectTo: 'dashboard' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
