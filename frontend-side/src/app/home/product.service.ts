import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  deleteProduct(productId: string) {
    throw new Error('Method not implemented.');
  }
  updateProduct(_id: string, editingProduct: Product) {
    throw new Error('Method not implemented.');
  }
  addProduct(newProduct: Omit<Product, "_id">) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
