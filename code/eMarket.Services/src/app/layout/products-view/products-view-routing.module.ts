import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsViewComponent } from './products-view.component';


const routes: Routes = [{
  path: '',  component: ProductsViewComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsViewRoutingModule { }
