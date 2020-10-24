import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { globalUrl } from '../app.utils';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProductModalComponent } from '../components/product-modal/product-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public productos: Product[]

  constructor(private _http: HttpClient, public productDialog: MatDialog) {
  }

  pruebas() {
    return 'Soy el servicio de Productos'
  }

  getProducts(): Observable<any> {
    const products = 'products'
    return this._http.get(globalUrl + products);
  }

  getProduct(productId): Observable<any> {
    return this._http.get(globalUrl + 'product/' + productId)
  }

  search(searchString): Observable<any> {
    return this._http.get(globalUrl + 'search/' + searchString)
  }

  create(product: Product): Observable<any> {
    return this._http.post(globalUrl + 'product', product)
  }

  update(productId, product): Observable<any> {
    let params = JSON.stringify(product);
    return this._http.post(globalUrl + 'product/' + productId, params)
  }

  getProductImages(image): string {
    return globalUrl + "images/" + image
  }

  delete(ref): Observable<any> {
    return this._http.delete(globalUrl + 'product/' + ref)
  }


  private dialogRef: MatDialogRef<ProductModalComponent, any>
  openDialog(product: Product) {
    if (this.dialogRef && this.productDialog && this.productDialog.openDialogs && this.productDialog.openDialogs.length > 0) {
      //Only changes data
      this.dialogRef.componentInstance.product = product
    } else {
      //Open dialog
      this.dialogRef = this.productDialog.open(ProductModalComponent, {
        data: product,
      })
    }
    document.getElementById("dialog").scrollTop = 0
  }

}