import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, HttpClientModule, CommonModule, RouterModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class Auth {
  email = '';
  password = '';
  confirmPassword = '';
  isSignUp = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private http: HttpClient, private router: Router) { }

  toggleAuthMode(): void {
    this.isSignUp = !this.isSignUp;
    this.clearMessages();
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  onSubmit(): void {
    this.clearMessages();

    if (!this.email || !this.password || (this.isSignUp && this.confirmPassword !== this.password)) {
      this.errorMessage = this.isSignUp
        ? 'All fields are required and passwords must match.'
        : 'Email and password are required.';
      return;
    }

    this.isLoading = true;

    const data = { email: this.email, password: this.password };

    if (this.isSignUp) {
      this.signUp(data);
    } else {
      this.signIn(data);
    }
  }

  private apiUrl = 'http://localhost:3000';

  signIn(data: { email: string; password: string }): void {
    this.http.post<{ token: string; user: any }>(`${this.apiUrl}/users/signin`, data)
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.router.navigate(['/home']);
          this.successMessage = 'Login successful!';
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Login failed.';
        }
      });
  }

  signUp(data: { email: string; password: string }): void {
    this.http.post<{ message: string }>(`${this.apiUrl}/users/signup`, { ...data })
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.successMessage = res.message || 'Signup successful!';
          this.toggleAuthMode();
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          this.errorMessage = err.error?.message || 'Signup failed.';
        }
      });
  }
}
