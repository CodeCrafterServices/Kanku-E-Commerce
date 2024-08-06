import { Component } from '@angular/core';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent {
  editIcon = faEdit;
  trashIcon = faTrash;
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: any = ''; // Initialize with empty string or null
  itemsPerPageOptions: any[] = ["Select items per page", 5, 10, 15, 20];


  products = [
    { no: 1, name: 'Tom', price: 'Kolkatta', dropPrice: '26 Sept,2020', supplier: 'xxxxxx5288', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 2, name: 'Virat Bisht', price: 'Kolkatta', dropPrice: '27 Sept,2020', supplier: 'xxxxxx9688', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 3, name: 'Jack', price: 'Kolkatta', dropPrice: '28 Sept,2020', supplier: 'xxxxxx9197', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 4, name: 'Garry', price: 'Ranchi', dropPrice: '29 Sept,2020', supplier: 'xxxxxx0987', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 5, name: 'Uttam Tripura', price: 'South Tripura', dropPrice: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 6, name: 'Uttam Tripura', price: 'South Tripura', dropPrice: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 7, name: 'Uttam Tripura', price: 'South Tripura', dropPrice: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 8, name: 'Uttam Tripura', price: 'South Tripura', dropPrice: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 9, name: 'Alex Hawking', price: 'South Tripura', dropPrice: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 10, name: 'Uttam Tripura', price: 'South Tripura', dropPrice: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 10, name: 'Uttam Tripura', price: 'South Tripura', dropPrice: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    // Add more items as needed for testing pagination
  ];

  filteredProducts = [...this.products];

  filterTable(): void {
    const searchTerm = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.no.toString().includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm) ||
      product.price.toLowerCase().includes(searchTerm) ||
      product.dropPrice.toLowerCase().includes(searchTerm) ||
      product.supplier.toLowerCase().includes(searchTerm)
    );
  }

  downloadPDF(): void {
    const doc = new jsPDF();
    (doc as any).autoTable({ html: '#productTable' });
    doc.save('table.pdf');
  }

  downloadCSV(): void {
    const rows = document.querySelectorAll("table tr");
    let csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(row => {
      const rowData = Array.from(row.children)
        .map(td => td.textContent)
        .join(",");
      csvContent += rowData + "\r\n";
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  printPage(): void {
    window.print();
  }
}
