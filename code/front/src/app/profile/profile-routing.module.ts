import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileOrdersComponent } from './profile-orders/profile-orders.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';


const routes: Routes = [
  {
    path: '', component: ProfileComponent,
    children: [
      { path: '', component: ProfileAccountComponent },
      { path: 'orders', component: ProfileOrdersComponent },
      { path: 'info', component: ProfileInfoComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
