import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';
import { FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatStep, MatStepper } from '@angular/material/stepper';
import { MatFormField, MatFormFieldControl, MatLabel } from '@angular/material/form-field';
import { SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


export interface PeriodicElement {
  productId: number;
  productName: string;
  sizeType: string;
  totalProductQuantity: number;
  productPrice: number;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',

})
export class AddProductComponent implements OnInit {
  displayedColumns: string[] = ['position', 'productName', 'sizeType', 'totalProductQuantity', 'productPrice'];
  dataSource: PeriodicElement[] = [];

  firstFormGroup: FormGroup = new FormGroup({
    productId: new FormControl(''),
    productName: new FormControl(''),
    productDescription: new FormControl(''),
    productImage: new FormControl(''),
    productDate: new FormControl(''),
    productCategory: new FormControl('')
  })

  secondFormGroup: FormGroup = new FormGroup({
    productId: new FormControl(''),
    productQuantity: new FormControl(''),
    productPrice: new FormControl(''),
    sizeType: new FormControl(''),
  })




  selectedFile!: File;

  constructor(
    private adminService: AdminService,
    private _formBuilder: FormBuilder,
    private _toaster: ToastrService,
    private _router: Router
  ) { }


  addProduct() {
    const newProduct: PeriodicElement = {
      productId: this.lastProduct.productId,
      productName: this.lastProduct.productName,
      sizeType: this.secondFormGroup.value.sizeType,
      totalProductQuantity: this.secondFormGroup.value.productQuantity,
      productPrice: this.secondFormGroup.value.productPrice
    };

    this.dataSource = [...this.dataSource, newProduct];
    this.resetForm();
  }

  lastProduct = {
    productId: 0,
    productName: '',
    productDescription: '',
    productCategory: '',
  }

  ngOnInit(): void {

    this.adminService.getLastProduct().subscribe(res => {
      if (res !== null) {
        this.lastProduct = res;
      }
    }, err => {
      console.log(err);

    })


    // this.firstFormGroup = this._formBuilder.group({
    //   // productId: ['1'],
    //   productName: ['', Validators.required],
    //   productDescription: ['', Validators.required],
    //   productImage: ['', Validators.required],
    //   productDate: ['', Validators.required],
    //   productCategory: ['', Validators.required]
    // });

    // this.secondFormGroup = this._formBuilder.group({
    //   productId: [this.lastProduct.productId, Validators.required],
    //   productPrice: ['', Validators.required],
    //   productQuantity: ['', Validators.required],
    //   sizeType: ['', Validators.required],
    // });

  }

  onFileSelected(event: any) {
    this.selectedFile = <File>event.target.files[0];
  }

  getTotalCost() {
    return this.dataSource.map(t => t.productPrice).reduce((acc, value) => acc + value, 0);
  }

  formSubmit() {
    let formData = new FormData();
    formData.append('productName', this.firstFormGroup.value.productName);
    formData.append('productDescription', this.firstFormGroup.get("productDescription")?.value);
    formData.append('productCategory', this.firstFormGroup.get("productCategory")?.value);
    formData.append('productPrice', this.firstFormGroup.get("productPrice")?.value);
    formData.append('sizeType', this.firstFormGroup.get("sizeType")?.value);

    formData.append('productImage', this.selectedFile);
    formData.append('productDate', this.firstFormGroup.get("productDate")?.value);

    console.log(formData);
    this.adminService.addProduct(formData).subscribe(res => {
      if (res !== null) {
        this.ngOnInit();
        this._toaster.success("Product has been successfully added.", "Product Add.")
        this._router.navigate(['/admin-dashboard/show-product'])
      }
    }, err => {
      this._toaster.info("Please try again!", "Server Busy")
    })
    // console.log(this.firstFormGroup.value);

  }
  sizes: any[] = [];

  sizeProduct = {
    "product": {
      "productId": this.lastProduct.productId
    },
    "sizes": this.sizes
  }
  formSubmit2() {
    this.sizeProduct.product.productId = this.lastProduct.productId;
    this.dataSource.map((d) => {
      this.sizeProduct.sizes.push(d);
    })


    this.adminService.addSize(this.sizeProduct).subscribe(res => {
      this._toaster.success("Product has been successfully added.", "Product Add.")
      // this.firstFormGroup.reset();
      this._router.navigate(['/admin-dashboard/add-product'])

    }, err => {
      this._toaster.info("Please try again!", "Server Busy")
    })
  }
  resetForm() {
    this.firstFormGroup.reset();
  }

  clearFormDataTable() {
    this.dataSource = [];
  }

  nextStep() {
    this.adminService.getLastProduct().subscribe(res => {
      if (res !== null) {
        this.lastProduct = res;
      }
    }, err => {
      console.log(err);

    })
  }

}
