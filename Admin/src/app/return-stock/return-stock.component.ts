import { Component, AfterViewInit, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { Papa } from 'ngx-papaparse';

interface StockItem {
  name: string;
  price: string;
  date: string;
  supplier: string;
  image: string;
  category: string;
}

@Component({
  selector: 'app-return-stock',
  templateUrl: './return-stock.component.html',
  styleUrls: ['./return-stock.component.css']
})
export class ReturnStockComponent implements AfterViewInit, OnInit {
  items: StockItem[] = [
    { name: 'Tom', price: 'Kolkatta', date: '26 Sept,2020', supplier: 'xxxxxx5288', image: 'Gold Coin', category: 'Bottle' },
    { name: 'Virat Bisht', price: 'Kolkatta', date: '27 Sept,2020', supplier: 'xxxxxx9688', image: 'Gold Coin', category: 'Bottle' },
    { name: 'Jack', price: 'Kolkatta', date: '28 Sept,2020', supplier: 'xxxxxx9197', image: 'Gold Coin', category: 'Bottle' },
    { name: 'Garry', price: 'Ranchi', date: '29 Sept,2020', supplier: 'xxxxxx0987', image: 'Gold Coin', category: 'Tiffin' },
    { name: 'Uttam Tripura', price: 'South Tripura', date: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'Gold Coin', category: 'School Bag' },
    { name: 'Uttam Tripura', price: 'South Tripura', date: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'Gold Coin', category: 'School Bag' },
    { name: 'Uttam Tripura', price: 'South Tripura', date: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'Gold Coin', category: 'School Bag' },
    { name: 'Uttam Tripura', price: 'South Tripura', date: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'Gold Coin', category: 'bottle' }
    // Add more items as needed
  ];

  filteredItems: StockItem[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  itemsPerPageOptions = [5, 10, 15, 20];

  constructor(private papa: Papa) { }

  ngOnInit() {
    this.filteredItems = this.items;
  }

  ngAfterViewInit(): void {
    document.getElementById('downloadPdf')?.addEventListener('click', this.downloadPDF.bind(this));
    document.getElementById('downloadCsv')?.addEventListener('click', this.downloadCSV.bind(this));
    document.getElementById('print')?.addEventListener('click', this.printTable.bind(this));
    const categoryDropdown = document.getElementById('ProductCategory') as HTMLSelectElement;
    categoryDropdown.addEventListener('change', this.filterTable.bind(this));
  }

  downloadPDF() {
    const doc = new jsPDF();
    doc.text('Return Stock', 10, 10);
    const table = document.querySelector('table') as HTMLTableElement;
    (doc as any).autoTable({
      head: [['No.', 'Product Name', 'Price', 'Date', 'Supplier', 'Image', 'Category']],
      body: this.filteredItems.map((item, index) => [
        index + 1,
        item.name,
        item.price,
        item.date,
        item.supplier,
        item.image,
        item.category

      ])
    });
    doc.save('return-stock.pdf');
  }

  downloadCSV() {
    const csvData = this.filteredItems.map((item, index) => ({
      'No.': index + 1,
      'Product Name': item.name,
      'Price': item.price,
      'Date': item.date,
      'Supplier': item.supplier,
      'Image': item.image,
      'Category': item.category
    }));

    const csv = this.papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'return-stock.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  printTable() {
    const printContent = document.getElementsByTagName('table')[0].outerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  }

  filterTable(event: Event) {
    const category = (event.target as HTMLSelectElement).value.toLowerCase();
    this.filteredItems = this.items.filter(item => !category || item.category.toLowerCase() === category);
    this.currentPage = 1;
  }
}
