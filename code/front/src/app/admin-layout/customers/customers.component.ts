import { Component, OnInit, Inject } from '@angular/core';
import { ChartEvent, ChartType } from 'ng-chartist';
import { IChartistAnimationOptions, IChartistData } from 'chartist';
import { Customer, DataService } from 'src/app/shared/data.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/servicesForModels/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  lastestCustomers: Customer[]
  bestCustomers: Customer[]

  allCustomers: User[]

  constructor(private dataService: DataService, public dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.lastestCustomers = this.generateRandomCustomer(2)
    this.bestCustomers = this.generateRandomCustomer(4)
    this.userService.getUsers().subscribe((users: User[]) => {
      this.allCustomers = users
    })
  }

  showHistory(customer: Customer) {
    // var orders: Order[] = this.dataService.generateRandomOrders(6)
    // orders.forEach((o) => {
    //   o.customer = customer
    // })
    // const dialogRef = this.dialog.open(CustomerHistoryDialog, {
    //   data: { orders, customer },
    //   maxHeight: '80vh',
    //   width: '60vw'
    // });
  }

  generateRandomCustomer(number: number): Customer[] {
    var result: Customer[] = []
    for (var i = 0; i < number; i++) {
      var randomCustomer = Math.floor((Math.random() * this.dataService.customers.length))
      result.push(this.dataService.customers[randomCustomer])
    }
    return result
  }

  type: ChartType = 'Line';
  data: IChartistData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 10],
    series: [
      [5, 9, 7, 8, 5, 3, 5, 4]
    ]
  };

  data2: IChartistData = {
    labels: [1, 2, 3, 4, 5, 6, 7, 10],
    series: [
      [0, 6, 20, 12, 4, 0, 0, 3]
    ]
  };

  options: any = {
    low: 0,
    showArea: true,
    height: 52,
    showPoint: false,
    fullWidth: true,
    horizontalBars: true,
    chartPadding: 2,
    axisY: {
      showLabel: false,
      showGrid: false,
      offset: 0
    },
    axisX: {
      showLabel: false,
      showGrid: false,
      offset: 0,
    }
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'bar') {
        data.element.animate({
          y2: <IChartistAnimationOptions>{
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          }
        });
      }
    }
  };


  deleteUser(user: User) {
    if (confirm("Está seguro de que desea eliminar al usuario: " + user.email)) {
      this.userService.deleteUser(user).subscribe((response) => {
        this.allCustomers = this.allCustomers.filter((u: User) => u.email != user.email)
      }, (err: any) => {
        console.log(err)
      })
    }
  }

}

@Component({
  selector: 'customer-history-dialog',
  templateUrl: 'customers-dialog.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomerHistoryDialog {

  constructor(public dialogRef: MatDialogRef<CustomerHistoryDialog>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}