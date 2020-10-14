import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/models/property';
import { globalUrl } from '../../../app.utils';

@Component({
  selector: 'app-product-form-edit',
  templateUrl: '../product-form/product-form.component.html',
  styleUrls: ['./product-form-edit.component.scss']
})
export class ProductFormEditComponent implements OnInit {
  isSaleEnabled: boolean = false
  public fakeProperty: Property
  public newPropertyName: string
  public newPropertyValues: string[] = []
  public detail: string
  public isEdit: boolean

  //Product
  public details: string[] = []
  public properties: Property[] = []

  public product: Product
  constructor(public productService: ProductService, private _route: ActivatedRoute, private _router: Router) {
    this.product = new Product('', null, '', 0, 0, null, '', null, 0, '', '')
    this.isEdit = true
  }


  ngOnInit(): void {
    this.getProduct()
  }

  
  imageUpload(data) {
    let image_data = data.body.image;
    //this.product.image = image_data
  }

  afuConfig = {
    multiple: true,
    formatsAllowed: ".jpg,.png,.jpeg",
    maxSize: "50",
    uploadAPI: {
      url: globalUrl //+  Metodo para subir imagen
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: false,
    fileNameIndex: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

  onProductSubmit() {
    this.product.properties = this.properties
    this.product.details = this.details
    this.productService.update( this.product.reference, this.product).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)

      }
    )
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

  getProduct() {
    this._route.params.subscribe(params => {
      let reference = params['reference'];

      this.productService.getProduct(reference).subscribe(
        response => {
          if (response) {
            this.product = response
          } else {
            this._router.navigate(['landing']);
          }
        },
        error => {
          this._router.navigate(['landing']);
        }
      )
    })
  }

}