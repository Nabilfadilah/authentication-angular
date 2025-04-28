// opsi 2
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // untuk melakukan HTTP request

@Injectable({ providedIn: 'root' })
// service ini dapat digunakan secara global tanpa perlu daftar di providers
export class AuthService {
  private baseUrl = 'http://localhost:3200/api'; // base URL dari API backend

  constructor(private http: HttpClient) {} // inject HttpClient untuk request ke backend

  login(email: string, password: string) {
    // mengirim POST request ke endpoint /login dengan body email & password
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string) {
    // mengirim POST request ke endpoint /register untuk registrasi
    return this.http.post(`${this.baseUrl}/register`, { name, email, password });
  }

  logout() {
    // menghapus data token dan user dari localStorage saat logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }

  saveUser(token: string, user: any) {
    // menyimpan token dan data user ke localStorage setelah login
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getToken() {
    // mengambil token dari localStorage
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  getUser() {
    // mengambil data user dari localStorage (dalam bentuk object)
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  }
}


// opsi ke 2
// @Injectable({ providedIn: 'root' })
// // service ini dapat digunakan secara global tanpa perlu daftar di providers
// export class AuthService {
//   private baseUrl = 'http://localhost:3200/api'; // base URL dari API backend

//   constructor(private http: HttpClient) {} // inject HttpClient untuk request ke backend

//   login(email: string, password: string) {
//     // mengirim POST request ke endpoint /login dengan body email & password
//     return this.http.post(`${this.baseUrl}/login`, { email, password });
//   }

//   register(name: string, email: string, password: string) {
//     // mengirim POST request ke endpoint /register untuk registrasi
//     return this.http.post(`${this.baseUrl}/register`, { name, email, password });
//   }

//   logout() {
//     // menghapus data token dan user dari localStorage saat logout
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   }

//   saveUser(token: string, user: any) {
//     // menyimpan token dan data user ke localStorage setelah login
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));
//   }

//   getToken() {
//     // mengambil token dari localStorage
//     return localStorage.getItem('token');
//   }

//   getUser() {
//     // mengambil data user dari localStorage (dalam bentuk object)
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   }
// }

// opsi 1
// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private BASE_URL = 'http://localhost:3200/api';
//   constructor(private http: HttpClient, private router: Router) {}

//   login(credentials: any) {
//     return this.http.post(`${this.BASE_URL}/login`, credentials, { withCredentials: true });
//   }

//   register(data: any) {
//     return this.http.post(`${this.BASE_URL}/register`, data);
//   }

//   logout() {
//     // Clear token or cookie if necessary
//     this.router.navigate(['/login']);
//   }

//   isAuthenticated(): boolean {
//     // Cek apakah token ada atau session masih aktif
//     return !!localStorage.getItem('token');
//   }
// }