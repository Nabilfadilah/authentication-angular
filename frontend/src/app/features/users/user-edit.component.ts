import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// dekorator @Component untuk mendefinisikan metadata komponen Angular
@Component({
  selector: 'app-user-edit', 
  standalone: true,          // menandakan ini adalah komponen standalone (bisa tanpa module.ts terpisah)
  templateUrl: './user-edit.component.html',
  imports: [FormsModule, CommonModule, RouterModule], // Modul-modul yang diperlukan
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  // menyimpan ID user dari URL
  id: string = '';

  // menyimpan data form user (nama, email, dan role)
  formData = {
    name: '',
    email: '',
    role: ''
  };

  // menyimpan pesan error jika ada
  error = '';

  // dependency injection untuk route, router, user service, dan auth service
  constructor(
    private route: ActivatedRoute,     // mengakses parameter dari route
    private router: Router,            // untuk navigasi antar halaman
    private userService: UserService,  // service untuk ambil/update data user
    public authService: AuthService    // digunakan di template untuk akses role user saat ini
  ) {}

  // lifecycle hook yang dipanggil saat komponen diinisialisasi
  ngOnInit() {
    // ambil ID dari parameter route
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.fetchUser(); // panggil fungsi ambil data user berdasarkan ID
  }

  // fungsi untuk ambil data user dari API berdasarkan ID
  fetchUser() {
    this.userService.getUserById(this.id).subscribe({
      next: (res) => {
        // isi formData dengan data user yang diterima
        this.formData = {
          name: res.name,
          email: res.email,
          role: res.role
        };
      },
      error: () => {
        this.error = 'Gagal mengambil data user'; // tampilkan error jika gagal
      }
    });
  }

  // fungsi navigasi manual (opsional digunakan)
  handleEdit(userId: string) {
    this.router.navigate(['/users', userId]);
  }  

  // fungsi saat form disubmit
  handleSubmit() {
    // siapkan data yang akan dikirim
    const payload: any = {
      name: this.formData.name,
      email: this.formData.email,
      role: this.formData.role // langsung sertakan role (bisa disesuaikan jika ingin role hanya admin)
    };
  
    console.log('Payload:', payload); // debug log
  
    // kirim permintaan update ke API
    this.userService.updateUser(this.id, payload).subscribe({
      next: () => {
        alert('User berhasil diperbarui'); // tampilkan notifikasi sukses
        this.router.navigate(['/users']);  // arahkan kembali ke halaman daftar user
      },
      error: (err) => {
        // tampilkan error jika terjadi kesalahan saat update
        this.error = err.error?.message || 'Gagal update user';
      }
    });
  }

  // getter untuk mendapatkan role user yang sedang login (dipakai di HTML jika perlu)
  get userRole() {
    return this.authService.getUser();
  }
}

