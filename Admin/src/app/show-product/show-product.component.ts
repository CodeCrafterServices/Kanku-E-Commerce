import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../service/admin.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { Product } from '../_models/product.model';
import { ImageConverterService } from '../service/image-converter.service';

// interface ProductElement {
//   productId: number;
//   productName: string;
//   productPrice: string;
//   productDropPrice: string;
//   productCategory: string;
//   // productSize: string;
//   productDate: string;
//   productImage: SafeUrl;
// }

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  displayedColumns: string[] = ['productId', 'productName', 'productPrice', 'productDropPrice', 'productCategory', 'productDate', 'productImage'];
  dataSource = new MatTableDataSource<Product>();
  searchTerm: string = '';


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private adminService: AdminService,
    private sanitizer: DomSanitizer,
    private imageProcessingService: ImageConverterService
  ) { }

  ngOnInit() {
    this.adminService.getProducts()
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImage(product)))
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.dataSource.data = res; // Set received data to MatTableDataSource
          this.dataSource.paginator = this.paginator; // Set paginator after data is set
          this.dataSource.sort = this.sort; // Set sort after data is set

        },
        error => {
          console.error('Error fetching products', error);
          // Handle error as needed
        }
      );
  }

  applyFilter() {
    const filterValue = this.searchTerm.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  downloadPDF() {
    const doc = new jsPDF();
    const tableData = this.dataSource.filteredData.map((product, index) => ([
      index + 1,
      product.productName,
      product.productPrice,
      product.dropPrice,
      // product.productSize,
      product.productDate,
      product.productCategory,
    ]));
    (doc as any).autoTable({
      head: [['No.', 'Product Name', 'Price', 'Drop Price', 'Product Category', 'Date', 'Product Image']],
      body: tableData,
    });
    doc.save('product-list.pdf');
  }

  downloadCSV() {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.filteredData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'product-list.xlsx');
  }

  print() {
    const printContent = document.getElementById('printSection')!;
    const WindowPrt = window.open('', '', 'width=900,height=650');
    WindowPrt?.document.write(printContent.innerHTML);
    WindowPrt?.document.close();
    WindowPrt?.focus();
    WindowPrt?.print();
    WindowPrt?.close();
  }
}
