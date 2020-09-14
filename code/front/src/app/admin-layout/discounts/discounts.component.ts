import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService, DiscountType, DiscountCode, DiscountApplication } from './../../shared/data.service';
import { ColorService } from 'src/app/shared/color.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CopyObject } from 'src/app/app.utils';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.scss'],
})
export class DiscountsComponent implements OnInit {
  displayedColumns: string[] = ['type', 'code', 'color', 'from', 'to', 'value', 'options'];
  dataSource: MatTableDataSource<DiscountCode>;
  discountType = DiscountType;
  discountApplication = DiscountApplication;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public discount: DiscountCode

  constructor(public dataService: DataService, public colorService: ColorService) {
    this.resetDiscount()
  }

  ngOnInit(): void {
    // Assign the data to the data source for the table to render
    this.UpdateDataSource()
  }

  private UpdateDataSource() {
    this.dataSource = new MatTableDataSource(this.dataService.discounts);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  saveDiscount() {
    this.discount.code = this.discount.code.toUpperCase()
    const index: number = this.dataService.discounts.indexOf(this.discount)
    if (index == -1) {
      this.dataService.discounts.push(this.discount)
      this.dataSource = new MatTableDataSource(this.dataService.discounts);
    }
  }

  duplicateDiscount(discount: DiscountCode) {
    this.dataService.discounts.push(CopyObject(discount))
    this.UpdateDataSource()
  }

  removeDiscount(discount: DiscountCode) {
    const index = this.dataService.discounts.indexOf(discount)
    if (index > -1) {
      this.dataService.discounts.splice(index, 1)
      this.UpdateDataSource()
    }
  }

  setDiscount(discount) {
    this.discount = discount
  }

  resetDiscount() {
    this.discount = {
      application: DiscountApplication.All,
      code: undefined,
      customers: undefined,
      repetitions: undefined,
      type: undefined,
      value: undefined,
      products: undefined,
      section: undefined,
      subsection: undefined,
      minPurchase: 0,
      color: '#333333',
      dateFrom: new Date(),
      dateTo: new Date()
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

