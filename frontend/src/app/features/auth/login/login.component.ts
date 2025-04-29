import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; // sesuaikan path
import { ReactiveFormsModule } from '@angular/forms'; // ⬅️ Tambahkan ini
import { CommonModule } from '@angular/common'; // ⬅️ Tambahkan ini kalau pakai *ngIf, *ngFor, dll

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // membuat form login dengan FormGroup
  loginForm: FormGroup;

  // menyimpan pesan error saat login gagal
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,           // untuk membangun form secara reaktif
    private authService: AuthService,  // service untuk auth (login, simpan user)
    private router: Router             // untuk navigasi antar halaman
  ) {
    // inisialisasi form dengan 2 field: email dan password
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // email harus diisi dan valid
      password: ['', Validators.required]                   // password wajib diisi
    });
  }

  // fungsi yang dipanggil saat form login di-submit
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // menampilkan semua pesan error validasi
      return;
    }
    
    // mengambil nilai email dan password dari form
    const { email, password } = this.loginForm.value;
  
    // memanggil fungsi login dari AuthService
    this.authService.login(email, password).subscribe({
      next: (res: any) => {
        console.log('Login Success:', res);             // menampilkan response sukses ke console
        this.authService.saveUser(res.token, res.user); // menyimpan token dan user ke storage
        this.router.navigate(['/dashboard']);           // arahkan ke halaman dashboard
      },
      error: (err) => {
        // menangkap dan menampilkan pesan error jika login gagal
        this.errorMessage = err.error?.message || 'User tidak ditemukan!';
        console.error('Login Error:', err);
      }
    });
  }
}
