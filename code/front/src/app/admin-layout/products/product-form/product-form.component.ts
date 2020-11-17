import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/servicesForModels/product.service';
import { Property } from 'src/app/models/property';
import { cartesian, globalUrl } from '../../../app.utils';
import { ImageService } from 'src/app/servicesForModels/image.service';
import { FormBuilder, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CrossStock } from 'src/app/models/crossStock';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  @Input('product') product: Product
  @Input('isEditionMode') isEditionMode: boolean
  @Output() add: EventEmitter<Product> = new EventEmitter()
  @Output() editProduct: EventEmitter<Product> = new EventEmitter()

  isSaleEnabled: boolean = false

  public fakeProperty: Property
  public newPropertyName: string
  public fakeStockNumber: number[] = []
  public newPropertyValues: string[] = []
  public crossStockObject: CrossStock
  public detail: string
  public images: string[] = []
  //Product
  public details: string[] = []
  public properties: Property[] = []

  constructor(public productService: ProductService, public imageService: ImageService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (!this.product) {
      this.product = new Product('', null, '', 0, 0, null, '', null, [], '', '')
    }
  }

  imageUpload(data) {
    let image_data = data.body.image;
    //this.product.image = image_data
  }

  addProduct(isEditionMode) {
    if (!isEditionMode) {
      this.product.properties = this.properties
      this.product.details = this.details

      //Stock Cruzado
      for(let i = 0; i<this.crossStock.length; i++){
        this.crossStockObject = new CrossStock(this.crossStock[i].join('-'), this.fakeStockNumber[i]);
        this.product.stock.push(this.crossStockObject)
      }

      var promises: any[] = []
      if (this.files && this.files.length > 0) {
        this.files.forEach(file => {
          promises.push(this.imageService.upload(file))
        })
        forkJoin(promises).subscribe(
          (response: string[]) => {
            this.product.images = response.map((image: any) => image.id)
            this.add.emit(this.product)
            this.resetProduct();
          }, error => {
            console.log(error)
          })
      }
    } else {
      var promises: any[] = []
      if (this.files && this.files.length > 0) {
        this.files.forEach(file => {
          promises.push(this.imageService.upload(file))
        })
        forkJoin(promises).subscribe(
          (response: string[]) => {
            this.product.images = response.map((image: any) => image.id)
            this.editProduct.emit(this.product)
            this.resetProduct();
          }, error => {
            console.log(error)
          })
      } else {
        this.editProduct.emit(this.product)
        this.resetProduct();
      }
    }
  }

  resetProduct() {
    this.fakeProperty = null
    this.newPropertyName = undefined
    this.newPropertyValues = []
    this.detail = undefined
    this.fakeStockNumber = []

    //Product
    this.details = []
    this.properties = []
    this.product = {
      reference: undefined,
      properties: [],
      name: undefined,
      offerPrice: undefined,
      price: undefined,
      images: [],
      description: undefined,
      details: [],
      stock: undefined,
      section: undefined,
      subsection: undefined
    }
  }


  // Properties
  public addPropertyName(isEditionMode: boolean) {

    if (isEditionMode) {
      if (this.newPropertyName) {
        this.fakeProperty = new Property(this.newPropertyName, []);
        this.product?.properties.push(this.fakeProperty)
      }
    } else {
      if (this.newPropertyName) {
        this.fakeProperty = new Property(this.newPropertyName, []);
        this.properties.push(this.fakeProperty)
      }
      this.newPropertyName = undefined
    }

  }

  public removeFromProperties(property, isEditionMode) {
    if (isEditionMode) {
      this.product.properties.forEach(element => {
        if (element.name == property.name) {
          const index = this.product.properties.indexOf(element, 0);
          if (index > -1) {
            this.product.properties.splice(index, 1);
          }
        }
      });
      this.getCrossStock(this.product.properties)
    } else {
      this.properties.forEach(element => {
        if (element.name == property.name) {
          const index = this.properties.indexOf(element, 0);
          if (index > -1) {
            this.properties.splice(index, 1);
          }
        }
      });
      this.getCrossStock(this.properties)
    }
  }

  public crossStock
  public getCrossStock(properties: Property[]) {
    var arrays: any = []
    properties.forEach(element => {
      if (element.values.length > 0) {
        arrays.push(element.values)
      }

    });
    this.crossStock = cartesian.apply(this, arrays)
  }


  public addPropertyValue(property, i, isEditionMode: boolean) {
    if (isEditionMode) {
      this.product.properties.forEach(element => {
        if (element == property && !element.values.includes(this.newPropertyValues[i])) {
          if (this.newPropertyValues[i] && !property.values.includes(this.newPropertyValues[i])) {
            element.values.push((this.newPropertyValues[i]))
          }
        }
      });
      this.newPropertyValues[i] = undefined
      this.getCrossStock(this.product.properties)
    } else {
      if (this.newPropertyValues[i] && !property.values.includes(this.newPropertyValues[i])) {
        property.values.push((this.newPropertyValues[i]))
      }
      this.newPropertyValues[i] = undefined
      this.getCrossStock(this.properties)
    }
  }

  public remove(property, value) {
    property.values.forEach(element => {
      if (element == value) {
        const index = property.values.indexOf(element);
        if (index > -1) {
          property.values.splice(index, 1);
        }
      }

    });
    this.getCrossStock(this.properties)
  }

  public removeEditing(property, value) {
    this.product.properties.forEach(element => {
      if (element == property) {
        element.values.forEach(valor => {
          if (valor == value) {
            const index = element.values.indexOf(value);
            if (index > -1) {
              element.values.splice(index, 1);
            }
          }
        });
      }
    });
    this.getCrossStock(this.product.properties)
  }

  public removeDetails(isEditionMode: boolean, detail: string) {
    if (isEditionMode) {
      let index = this.product.details.indexOf(detail)
      if (index >= 0) {
        this.product.details.splice(index, 1);
      }
    } else {
      let index = this.details.indexOf(detail)
      if (index >= 0) {
        this.details.splice(index, 1);
      }
    }
  }
  //End of properties

  public productForm = this.fb.group({
    file: [null, Validators.required]
  });

  public files: any[]
  public fileSelected: boolean = false

  public onFileChange(event) {
    this.files = []
    var filesAux: any[] = []
    if (event.target.files && event.target.files.length) {

      Array.prototype.forEach.call(event.target.files, function (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          filesAux.push(reader.result)
        };
      });
    }
    this.fileSelected = true
    this.files = filesAux
  }
}
