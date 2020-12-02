import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { ShoppingCartService } from 'src/app/shared/shopping-cart.service';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { CopyObject } from 'src/app/app.utils';
import { Product } from 'black-market-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  @Input('product') product: Product
  @Input('isSimpleView') isSimpleView: boolean = false
  @Output() addedInCart = new EventEmitter<string>()


  public value: number = 1

  constructor(public dataService: DataService, public activatedRoute: ActivatedRoute, public cartService: ShoppingCartService, public router: Router, public productService: ProductService, private _snackBar: MatSnackBar) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.product = undefined
        this.product = this.dataService.products.filter((p: Product) => { return this.activatedRoute.snapshot.params.id == p.reference })[0]
      }
    })
  }

  ngOnInit(): void {
    if (!this.product) {
      this.product = this.dataService.products.filter((p: Product) => { return this.activatedRoute.snapshot.params.id == p.reference })[0]
      if (!this.product) {
        this.productService.getProduct(this.activatedRoute.snapshot.params.id).subscribe((product: Product[]) => {
          this.product = product[0]
        })
      }
    }
  }

  public valueChanged(event: number) {
    this.value = event
  }

  public addProductToCart(product: Product, value: number) {
    let userProduct: Product = CopyObject(product)

    // Limpiar propertyValues de properties 

    userProduct.properties.forEach((property: any , index : number) => {
      property.values=this.selectedOptions[index]
    });
    
    // Limpiamos el stock 
    let localname = this.selectedOptions.join('-')
    userProduct.stock.filter(stock=> stock.name == localname)[0].value-=value
    
    console.log(userProduct)

    this.cartService.AddProduct(product, userProduct, value);
    this.getCrossStock(this.selectedOptions)
  }


  public selectedOptions: string[] = []
  public realStock: number

  onChange(event, index) {
    console.log(event)
    this.selectedOptions[index] = event.value
    this.getCrossStock(this.selectedOptions)
  }


  getCrossStock(array) {
    var name = array.join('-')
    console.log(name)
    this.product.stock.forEach(s => {
      if (name == s.name) {
        this.realStock = s.value
      }
    });
  }

  public deleteProduct(ref) {
    if (confirm("¿Seguro que quieres borrar el producto " + this.product.name + "? ")) {
      this.productService.delete(ref).subscribe(
        response => {
          if (response) {
            this.productService.getProducts().subscribe(
              response => {
                if (response) {
                  this.dataService.products = response
                  console.log(this.dataService.products)
                  this.router.navigate(['/'])
                }
              },
              error => {
                console.log(error)
              }
            )
            this.openSnackBar("Producto borrado correctamente","Aceptar")

          }
        },
        error => {
          console.log(error)
        }
      )
    }
  }

  public editProduct(ref) {
    this.router.navigate(['/admin/products'])
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
