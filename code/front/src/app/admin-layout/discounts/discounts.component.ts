import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './../../shared/data.service';
import { ColorService } from 'src/app/shared/color.service';
import { DiscountCodeService } from 'src/app/servicesForModels/discountCode.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DiscountCode, DiscountType, DiscountApplication, ObjectType } from 'black-market-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {

  public displayedColumns: string[] = ['type', 'code', 'color', 'from', 'to', 'value', 'options']
  public dataSource: MatTableDataSource<DiscountCode>
  public discountType: typeof DiscountType = DiscountType
  public discountApplication: typeof DiscountApplication = DiscountApplication
  public errorMessage: string

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator
  @ViewChild(MatSort, { static: true }) sort: MatSort
  public discount: DiscountCode

  constructor(public dataService: DataService, public discountCodeService: DiscountCodeService, public colorService: ColorService, private router: Router, private _snackBar: MatSnackBar) {
    this.resetDiscount()
  }

  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.UpdateDataSource()
  }

  private UpdateDataSource() {
    this.discountCodeService.getAll().subscribe((response: DiscountCode[]) => {
      console.log(response)
      console.log(DiscountType.Percentage)
      console.log(this.discountType['Percentage'])
      this.dataSource = new MatTableDataSource(response)
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }

  saveDiscount() {
    this.errorMessage = undefined
    // Pasamos id de código descuento SIEMPRE a MAYUS
    this.discount.code = this.discount.code.toUpperCase()
    this.discountCodeService.upsert(this.discount).subscribe((discount: any) => {
      if (discount) {
        this.openSnackBar("Descuento creado correctamente.","Aceptar")
        this.UpdateDataSource()
      } else {
        this.errorMessage = "Descuento erróneo."
      }
    }, error => {
      this.openSnackBar(error,"Aceptar")
      console.log(error)
    })
  }

  duplicateDiscount(discount: DiscountCode) {
    //   this.dataService.discounts.push(CopyObject(discount))
    //   this.UpdateDataSource()
  }

  removeDiscount(discount: DiscountCode) {
    if (discount && confirm("¿Seguro que quieres el descuento con código: " + discount.code + "? ")) {
      this.discountCodeService.delete(discount).subscribe(response => {
        if (response) {
          //this.dataService.products = this.dataService.products.filter((p: Product) => p.reference != discount)
          this.openSnackBar("Descuento borrado correctamente.","Aceptar")
          this.UpdateDataSource()
        }
      }, error => {
        console.log(error)
      })
    }
  }

  //Marcar como activo para ponerlo en la pagina frontal
  selectActiveDiscount(discount: DiscountCode){
    console.log(discount)
    this.dataService.headerCode = discount.code
    this.dataService.headerDescription = discount.description

  }

  setDiscount(discount) {
    this.discount = discount
    this.UpdateDataSource()
  }

  resetDiscount() {
    this.discount = {
      discountApplication: DiscountApplication.Envio,
      code: undefined,
      description: undefined,
      users: undefined,
      repetitions: undefined,
      discountType: undefined,
      value: undefined,
      products: undefined,
      section: undefined,
      subsection: undefined,
      minPurchase: 0,
      color: '#333333',
      dateFrom: new Date(),
      dateTo: new Date(),
      type:ObjectType.DiscountCode
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage()
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}

