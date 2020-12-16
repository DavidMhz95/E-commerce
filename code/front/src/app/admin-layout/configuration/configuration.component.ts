import { Component, OnInit } from '@angular/core';
import { MarketTabsInformation, StoreConfiguration } from 'black-market-model';
import { ConfigurationService } from 'src/app/servicesForModels/configuration.service';
import { DataService } from 'src/app/shared/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {

  public nombreTienda: string = ""
  public nameInformation: string
  public descriptionInformation: string
  public marketInfoObject: MarketTabsInformation
  public marketInfo: MarketTabsInformation[] = []
  public storeConfiguration : StoreConfiguration 


  constructor(public dataService: DataService, public configurationService: ConfigurationService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (!this.marketInfoObject) {
      this.marketInfoObject = new MarketTabsInformation('', '')
    }
  }

  onSubmitMarketInfo() {
    // Permitimos máximo 3 tabs 
    let mi: MarketTabsInformation = new MarketTabsInformation(this.marketInfoObject.nameInformation, this.marketInfoObject.descriptionInformation)
    if (this.marketInfoObject && this.marketInfo.length <= 2) {
      this.marketInfo.push(mi)
    }
    this.marketInfoObject.nameInformation = undefined
    this.marketInfoObject.descriptionInformation = undefined
    console.log(this.marketInfo)
  }

  removeTab(tab) {
    let index = this.marketInfo.indexOf(tab)
    if (index >= 0) {
      this.marketInfo.splice(index, 1);
    }
  }

  saveConfig() {
    this.storeConfiguration = new StoreConfiguration(4,this.nombreTienda,this.marketInfo,null)
    console.log(this.storeConfiguration)
    this.configurationService.update(this.storeConfiguration).subscribe(response => {
      if (response) {
        this.dataService.configuration = response
        this.openSnackBar("Configuración cambiada correctamente.","Aceptar")
        this.nombreTienda = undefined
        this.marketInfo = []
      } else {
        this.dataService.configuration = undefined
      }
    }, error => {
      console.log(error)
    })

  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
