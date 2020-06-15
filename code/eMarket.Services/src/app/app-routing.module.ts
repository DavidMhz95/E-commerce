import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'landing', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)  },
  { path: 'admin', loadChildren: () => import('./admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)},
  { path: '**', redirectTo:'landing'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
