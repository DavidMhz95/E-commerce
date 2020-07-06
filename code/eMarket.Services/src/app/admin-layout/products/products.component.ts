import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';
import { Product } from 'src/app/components/product/product.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {


  isSaleEnabled: boolean = false
  isTypeProduct: boolean = false
  isProduct: boolean = false
  @Input('product') product: Product
  @Input('productsData') productsData:any 
  constructor(public dataService:DataService, public activatedRoute:ActivatedRoute) { }

  
  

  public productView: boolean = true
  public tableView: boolean = false
  public properties: Dictionary  = new Dictionary();


  public newProperty: string
  public newPropertyValue: string [] = []
  public newTypeOfProductName: string


  ngOnInit(): void {
     this.product = this.dataService.products.filter((p: Product)=>{ return this.activatedRoute.snapshot.params.id == p.id})[0]   
  }

  public addProduct(){
    console.log('Añadiendo producto')
  }

  public showProductView(){
    this.productView= true
    this.tableView = false
  }
  
  public showTableView(){
    this.productView= false
    this.tableView = true
  }

  public tipoProductoToggle(){
    this.isTypeProduct = true
    this.isProduct = false
  }

  public productoToggle(){
    this.isTypeProduct = false
    this.isProduct = true
  }

  public addPropertie(){
    this.properties.set(this.newProperty,[])
    this.newProperty = undefined
    this.newPropertyValue.push(undefined)
  }

 public removeFromProperties(property){
    this.properties.delete(property.key)
  }

  public addPropertyValue(property){
    var keyPairValue = this.properties.get(property.key)
    if(!keyPairValue){
      keyPairValue = []
    }
    keyPairValue.push(this.newPropertyValue)
    this.newPropertyValue = undefined
  }

  public remove(key: string, propertyValue: string) {
    var values =this.properties.get(key)
    const index = values.indexOf(propertyValue);
    if (index >= 0) {
      values.splice(index, 1);
    }
  }

  public addProductType(){

    var newTypeOfProduct: typeOfProduct =  {name: this.newTypeOfProductName, properties: this.properties }
    //Añadimos los tipos de producto
    this.dataService.typeOfProduct.push(newTypeOfProduct)

    //Limpiamos el diccionario
    this.properties = undefined
    this.newTypeOfProductName = undefined
  }

  public setProductType(value){
    console.log(value)
  }

}

export interface typeOfProduct{
  name: string,
  properties : Dictionary
}


export class Dictionary {
  items = {};
  constructor() {
    this.items = {};
  }
  public has(key) {
    return key in this.items;
  }
  public set(key,value) {
    this.items[key] = value;
  }
  public get(key) {
    return this.items[key];
  }
  public delete(key) {
    if( this.has(key) ){
      delete this.items[key]
      return true;
    }
    return false;
  }
}

