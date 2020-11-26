import { Component, OnInit } from '@angular/core';
import { MarketTabsInformation } from 'src/app/models/marketInformation';
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

  onSubmitNombreTienda() {
    console.log(this.nombreTienda)
  }

  onSubmitMarketInfo() {
    let m : MarketTabsInformation = new MarketTabsInformation(this.marketInfoObject.nameInformation,this.marketInfoObject.descriptionInformation)
    if (this.marketInfoObject) {
      this.marketInfo.push(m)
    }

    console.log(this.marketInfo)
  }



}
