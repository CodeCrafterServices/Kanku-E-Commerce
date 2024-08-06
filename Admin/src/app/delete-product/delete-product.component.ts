import { Component } from '@angular/core';
import { faPencilSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent {
  editIcon = faTrash;
  searchTerm: string = '';
  filteredProducts: any[] = [];

  products = [
    { no: 1, name: 'Tom', price: 'Kolkatta', dropPrice: '26 Sept,2020', supplier: 'xxxxxx5288', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 2, name: 'Virat Bisht', price: 'Kolkatta', dropPrice: '27 Sept,2020', supplier: 'xxxxxx9688', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 3, name: 'Jack', price: 'Kolkatta', dropPrice: '28 Sept,2020', supplier: 'xxxxxx9197', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 4, name: 'Garry', price: 'Ranchi', dropPrice: '29 Sept,2020', supplier: 'xxxxxx0987', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' },
    { no: 5, name: 'Uttam Tripura', price: 'South Tripura', dropPrice: '1 Oct,2020', supplier: 'xxxxxx0976', image: 'https://batafestivepromo.bigcityexperience.com/assets/frontend/img/g_coin.png' }
  ];

  constructor() {
    this.filteredProducts = [...this.products];
  }

  checkProduct() {
    if (this.searchTerm.trim() === '') {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        this.matchesSearchTerm(product, this.searchTerm.trim())
      );
    }
  }

  matchesSearchTerm(product: any, searchTerm: string): boolean {
    // Convert number to string for comparison
    const productNo = product.no.toString();

    // Check if any field contains the search term
    return (
      productNo.includes(searchTerm) ||
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.dropPrice.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  downloadPDF() {
    const doc = new jsPDF();
    const data = this.filteredProducts.map(product => [product.no, product.name, product.price, product.dropPrice, product.supplier]);
    (doc as any).autoTable({
      head: [['No.', 'Product Name', 'Price', 'Drop Price', 'Supplier']],
      body: data
    });
    doc.save('products.pdf');
  }

  downloadCSV() {
    let csvContent = 'No.,Product Name,Price,Drop Price,Supplier\n';
    this.filteredProducts.forEach(product => {
      csvContent += `${product.no},${product.name},${product.price},${product.dropPrice},${product.supplier}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  print() {
    window.print();
  }
}
