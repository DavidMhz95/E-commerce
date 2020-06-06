import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'products' },
      { path: 'products', loadChildren: () => import('./products-view/products-view.module').then(m => m.ProductsViewModule), pathMatch:'full' },
      { path: 'products/:id', loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsModule) },
      { path: 'collections/:section', loadChildren: () => import('./products-view/products-view.module').then(m => m.ProductsViewModule) },
      { path: 'collections/:section/:subsection', loadChildren: () => import('./products-view/products-view.module').then(m => m.ProductsViewModule) },
      { path: '**', redirectTo: 'products' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
