import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
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

  constructor(public dataService: DataService, public discountCodeService: DiscountCodeService, public colorService: ColorService, private router: Router, private _snackBar: MatSnackBar, private changeDetectorRefs: ChangeDetectorRef) {
    this.resetDiscount()
  }

  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.updateDataSource()
  }

  private updateDataSource() {
    this.discountCodeService.getAll().subscribe((response: DiscountCode[]) => {
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
        this.openSnackBar("Descuento creado correctamente.", "Aceptar")
        this.updateDataSource()
      } else {
        this.errorMessage = "Descuento erróneo."
      }
    }, error => {
      this.openSnackBar(error, "Aceptar")
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
          this.openSnackBar("Descuento borrado correctamente.", "Aceptar")
          this.updateDataSource()
        }
      }, error => {
        console.log(error)
      })
    }
  }

  setDiscount(discount) {
    this.discount = discount
    this.updateDataSource()
  }

  resetDiscount() {
    this.discount = {
      discountApplication: DiscountApplication.Envio,
      code: undefined,
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
      type: ObjectType.DiscountCode
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

