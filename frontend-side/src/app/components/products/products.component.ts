import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../home/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct: Omit<Product, '_id'> = {
    name: '',
    description: '',
    price: 0,
    image: '',
  };
  editingProduct: Product | null = null;
  isAddingProduct = false;
  selectedFile: File | null = null;
  isLoading = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.products = products;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this.isLoading = false;
        alert('Failed to load products. Please try again.');
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.image = e.target.result;
        if (this.editingProduct) {
          this.editingProduct.image = e.target.result;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  addProduct(): void {
    if (!this.newProduct.name || !this.newProduct.description || this.newProduct.price <= 0) {
      alert('Please fill in all required fields with valid values');
      return;
    }

    this.productService.addProduct(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.resetForm();
        this.isAddingProduct = false;
        alert('Product added successfully!');
      },
      error: (error: { error: { error: any; }; }) => {
        console.error('Error adding product:', error);
        if (error.error?.error) {
          alert(error.error.error);
        } else {
          alert('Failed to add product. Please try again.');
        }
      }
    });
  }

  editProduct(product: Product): void {
    this.editingProduct = { ...product };
    this.isAddingProduct = false;
  }

  updateProduct(): void {
    if (!this.editingProduct || !this.editingProduct._id) {
      alert('No product selected for editing');
      return;
    }

    this.productService.updateProduct(this.editingProduct._id, this.editingProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.editingProduct = null;
        alert('Product updated successfully!');
      },
      error: (error: { error: { error: any; }; }) => {
        console.error('Error updating product:', error);
        if (error.error?.error) {
          alert(error.error.error);
        } else {
          alert('Failed to update product. Please try again.');
        }
      }
    });
  }

  deleteProduct(productId: string): void {
    const product = this.products.find(p => p._id === productId);
    const productName = product ? product.name : 'this product';
    
    const confirmDelete = confirm(`Are you sure you want to delete "${productName}"?\n\nThis action cannot be undone.`);
    
    if (confirmDelete) {
      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.loadProducts();
          alert('Product deleted successfully!');
        },
        error: (error: { error: { error: any; }; }) => {
          console.error('Error deleting product:', error);
          if (error.error?.error) {
            alert(error.error.error);
          } else {
            alert('Failed to delete product.');
          }
        }
      });
    }
  }

  cancelEdit(): void {
    this.editingProduct = null;
    this.resetForm();
  }

  resetForm(): void {
    this.newProduct = {
      name: '',
      description: '',
      price: 0,
      image: '',
    };
    this.selectedFile = null;
  }
}
