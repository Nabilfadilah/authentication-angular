import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service'; // sesuaikan path!
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  // menyimpan input dari user
  name = '';
  email = '';
  password = '';

  // menyimpan pesan sukses atau error
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  // fungsi yang dipanggil saat form register di-submit
  handleRegister(form: any) {
    if (form.invalid) {
      form.control.markAllAsTouched(); // tampilkan semua error jika form tidak valid
      return;
    }

    const { name, email, password } = this;

    // memanggil API register lewat AuthService
    this.authService.register(name, email, password).subscribe({
      next: (res: any) => {
        console.log('Register Success:', res); // menampilkan response register berhasil
        // jika mau langsung login, bisa simpan user di sini (sementara dikomen)
        // this.authService.saveUser(res.token, res.user);

        this.successMessage = 'Register berhasil!'; // set pesan sukses

        setTimeout(() => {
          this.router.navigate(['/login']); // redirect ke halaman login setelah 1,5 detik
        }, 1500);
      },
      error: (error) => {
        // menangkap dan menampilkan error jika gagal register
        this.errorMessage = error.error?.message || 'Gagal register!';
        console.error('Register Error:', error);
      }
    });
  }
}
