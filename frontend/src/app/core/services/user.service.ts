import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service'; // pastikan path AuthService betul

// menandakan bahwa service ini bisa di-inject ke mana saja (global scope)
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // url dasar dari endpoint user
  private apiUrl = 'http://localhost:3200/api/users';

  constructor(
    private http: HttpClient,          // untuk melakukan HTTP request 
    private authService: AuthService   // untuk mengambil token autentikasi
  ) {}

  // fungsi internal untuk menyusun headers dengan token autentikasi
  private getAuthHeaders() {
    const token = this.authService.getToken(); // ambil token dari AuthService
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}` // sisipkan token dalam header Authorization
      })
    };
  }

  // mengambil semua data user dari backend
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, this.getAuthHeaders());
  }

  // mengambil data user berdasarkan ID tertentu
  getUserById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  // mengupdate data user dengan payload tertentu
  updateUser(id: string, payload: any) {
    // endpoint khusus untuk edit
    return this.http.put(`http://localhost:3200/api/user/${id}/edit`, payload, this.getAuthHeaders());
  }
  
  // menghapus user berdasarkan ID
  deleteUser(id: string): Observable<any> {
    // endpoint khusus untuk delete
    return this.http.delete(`http://localhost:3200/api/user/${id}`, this.getAuthHeaders());
  }  

  // mereset password user oleh admin
  resetPassword(id: string, payload: { newPassword: string }): Observable<any> {
    // endpoint khusus reset password oleh admin
    return this.http.put(`http://localhost:3200/api/admin/reset-password/${id}`, payload, this.getAuthHeaders());
  }
}
