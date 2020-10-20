import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { Property } from 'src/app/models/property';
import { globalUrl } from '../../../app.utils';
import { ImageService } from 'src/app/servicesForModels/image.service';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input('isEdition') isEdition: boolean;

  isSaleEnabled: boolean = false

  public fakeProperty: Property
  public newPropertyName: string
  public newPropertyValues: string[] = []
  public detail: string
  public images: string [] = []

  //Product
  public details: string[] = []
  public properties: Property[] = []

  public product: Product
  constructor(public productService: ProductService, public imageService : ImageService, private fb: FormBuilder) {
    this.product = new Product('', null, '', 0, 0, null, '', null, 0, '', '')
  }

  ngOnInit(): void {
  }

  imageUpload(data) {
    let image_data = data.body.image;
    //this.product.image = image_data
  }

  onProductSubmit() {
    this.product.properties = this.properties
    this.product.details = this.details
    var promises : any [] = []
    if(this.files && this.files.length > 0){

      this.files.forEach(file => {
        promises.push(this.imageService.upload(file))
  
      });
      forkJoin(promises).subscribe(
        response =>{
          console.log(response)
          response.forEach((element : any) => {
            console.log(element.id)
            this.images.push(element.id)
            this.product.images = this.images
            console.log(this.product)
          });
  
          this.productService.create(this.product).subscribe(
            response => {
              if(response){
                console.log(response)
                alert("Producto Creado correctamente")
                this.cleanNgModels()
              }
            },
            error => {
              console.log(error)
      
            }
          )
  
        },
        error =>{
          console.log(error)
        }
      )

    }
  }


  public cleanNgModels(){
  this.fakeProperty = null
   this.newPropertyName= ""
   this.newPropertyValues= []
   this.detail = ""
   this.images = []

  //Product
   this.details = []
   this.properties = []
   this.product = null
  }
  // Properties
  public addPropertyName() {
    if (this.newPropertyName) {
      this.fakeProperty = new Property(this.newPropertyName, []);
      this.properties.push(this.fakeProperty)
      console.log(this.properties)
    }
    this.newPropertyName = undefined
  }

  public removeFromProperties(property) {

    this.properties.forEach(element => {
      if (element.name == property.name) {
        const index = this.properties.indexOf(element, 0);
        if (index > -1) {
          this.properties.splice(index, 1);
        }
      }
    });
  }

  public addPropertyValue(property, i) {
    console.log(property, i)
    if (this.newPropertyValues[i] && !property.values.includes(this.newPropertyValues[i])) {
      property.values.push((this.newPropertyValues[i]))
    }
    this.newPropertyValues[i] = undefined
  }

  public remove(property, value) {
    var values = property.values
    values.forEach(element => {
      if (element == value) {
        const index = values.indexOf(element.value);
        if (index >= 0) {
          values.splice(index, 1);
        }
      }

    });

  }

  public addDetails() {
    if (this.detail) {
      this.details.push(this.detail)
    }
    console.log(this.details)
    this.detail = undefined
  }

  public removeFromDetails(detail) {

    this.details.forEach(element => {
      if (element == detail) {
        const index = this.details.indexOf(element, 0);
        if (index > -1) {
          this.details.splice(index, 1);
        }
      }
    });

  }
  //End of properties

  public productForm = this.fb.group({
    file: [null, Validators.required]
  });
  
  public files : any [] 

  public onFileChange(event) {
    this.files = []
    var filesAux: any []= []
    if (event.target.files && event.target.files.length) {

      Array.prototype.forEach.call(event.target.files, function(file) { 
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          filesAux.push(reader.result)
        };
       });
    }
    this.files = filesAux
    console.log(this.files)
  }
}
