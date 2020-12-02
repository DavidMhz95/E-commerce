import { Component, OnInit } from '@angular/core';
import { MarketTabsInformation, StoreConfiguration } from 'black-market-model';
import { DataService } from 'src/app/shared/data.service';

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


  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    if (!this.marketInfoObject) {
      this.marketInfoObject = new MarketTabsInformation('', '')
    }
  }

  onSubmitMarketInfo() {
    // Permitimos máximo 3 tabs 
    let mi : MarketTabsInformation = new MarketTabsInformation(this.marketInfoObject.nameInformation, this.marketInfoObject.descriptionInformation)
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

    saveConfig(){
      
    }



}
