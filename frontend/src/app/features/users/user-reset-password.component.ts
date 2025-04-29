import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-reset-password',
  standalone: true,          // menandakan ini adalah komponen standalone (bisa tanpa module.ts terpisah)
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.css'],
  imports: [FormsModule, CommonModule, RouterModule], // Modul-modul yang diperlukan

})
export class UserResetPasswordComponent implements OnInit {

  // menyimpan ID user yang akan di-reset password-nya
  id: string = '';

  // menyimpan nilai input password baru dan konfirmasi password
  newPassword = '';
  confirmPassword = '';

  // pesan yang akan ditampilkan kepada pengguna (berhasil/gagal)
  message = '';

  constructor(
    private route: ActivatedRoute,    // untuk mengambil parameter dari URL
    public router: Router,            // untuk navigasi antar halaman
    private userService: UserService  // untuk melakukan operasi reset password ke backend
  ) {}

  // lifecycle hook yang dipanggil saat komponen diinisialisasi
  ngOnInit() {
    // ambil id dari url saat inisialisasi komponent
    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  handleReset() {
    // validasi jika form input kosong
    if (!this.newPassword || !this.confirmPassword) {
      this.message = 'Password dan konfirmasi password tidak boleh kosong';
      return;
    }

    // validasi kecocokan
    if (this.newPassword !== this.confirmPassword) {
      this.message = 'Password dan konfirmasi tidak cocok';
      return;
    }

    // kirim ke backend jika lolos validasi
    this.userService.resetPassword(this.id, { newPassword: this.newPassword }).subscribe({
      next: () => {
        // jika berhasil, tampilkan pesan sukses dan kembali ke halaman user setelah 1.5 detik
        this.message = 'Password berhasil di-reset';
        setTimeout(() => this.router.navigate(['/users']), 1500);
      },
      error: (err) => {
        // jika gagal, tampilkan pesan error dari server atau default
        this.message = err.error?.message || 'Gagal mereset password';
      }
    });
  }

}
