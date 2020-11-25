import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { CdkCell } from '@angular/cdk/table';
import { CopyObject } from 'src/app/app.utils';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Section } from 'src/app/models/section';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public product: Product
  public isEditionMode: boolean

  constructor(public dataService: DataService, public activatedRoute: ActivatedRoute, public productService: ProductService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(response => {
      if (response) {
        this.dataService.products = response
      } else {
        this.dataService.products = []
      }
    }, error => {
      console.log(error)
    })
  }


  remove(reference: string) {
    if (reference && confirm("¿Seguro que quieres borrar el producto con referencia: " + reference + "? ")) {
      this.productService.delete(reference).subscribe(response => {
        if (response) {
          this.dataService.products = this.dataService.products.filter((p: Product) => p.reference != reference)
          this.openSnackBar("Producto borrado correctamente", "Aceptar")
        }
      }, error => {
        console.log(error)
      })
    }
  }

  add(product: Product) {
    console.log(product)
    this.productService.create(product).subscribe(response => {
      if (response) {
        let listOfProducts = CopyObject(this.dataService.products)
        listOfProducts.push(product)
        this.dataService.products = listOfProducts
        this.openSnackBar("Producto Creado correctamente", "Aceptar")
      }
    }, error => {
      console.log(error)
    })
  }

  editProduct(product: Product) {
    this.productService.update(product).subscribe(response => {
      if (response) {
        this.openSnackBar("Producto editado correctamente", "Aceptar")
      }
    }, error => {
      console.log(error)
    })
  }

  edit(product: Product) {
    console.log(product)
    this.isEditionMode = true
    this.product = product
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}


