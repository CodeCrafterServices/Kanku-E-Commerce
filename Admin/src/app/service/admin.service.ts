import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import BASE_URL from '../auth/services/base_url';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }


  // All Product services

  public addProduct(product: any): Observable<any> {
    return this.http.post(BASE_URL + "/product/addProduct", product);
  }

  public getLastProduct(): Observable<any> {
    return this.http.get(BASE_URL + "/product/getLastProduct");
  }

  public addSize(size: any): Observable<any> {
    return this.http.post(BASE_URL + "/size/addSize", size);
  }

  public getProducts(): Observable<any> {
    return this.http.get(BASE_URL + "/product/getAllProducts");
  }

  public updateProduct(product: any): Observable<any> {
    return this.http.put(BASE_URL + "/product/updateProduct", product);
  }

  public deleteProduct(productId: any): Observable<any> {
    return this.http.delete(BASE_URL + `/product/deleteProduct/${productId}`);
  }

  public specialProduct(product: any): Observable<any> {
    return this.http.post(BASE_URL + "/product/specialProduct", product);
  }

  public addSales(product: any): Observable<any> {
    return this.http.post(BASE_URL + "/product/addSales", product);
  }

  public addStock(product: any): Observable<any> {
    return this.http.post(BASE_URL + "/product/addStock", product);
  }

  public returnStock(product: any): Observable<any> {
    return this.http.get(BASE_URL + "/product/returnStock", product);
  }

  public showstock(product: any): Observable<any> {
    return this.http.get(BASE_URL + "/product/showstock", product);

  }













}
