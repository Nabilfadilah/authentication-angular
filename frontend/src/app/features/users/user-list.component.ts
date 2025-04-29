import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service'; // service untuk mengakses API user
import { AuthService } from '../../core/services/auth.service'; // service untuk autentikasi dan data user login
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // digunakan untuk ngModel (two-way binding)

@Component({
  selector: 'app-user-list',
  standalone: true, // menandakan komponen ini tidak bergantung pada modul eksternal Angular
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  users: any = null;      // menyimpan daftar user dari API
  public isAdmin = false; // menyimpan apakah user login adalah admin

  constructor(
    public userService: UserService, // service user dibuat public agar bisa diakses di template (jika perlu)
    public authService: AuthService, // sama seperti userService
    private router: Router           // digunakan untuk navigasi antar halaman
  ) {}

  // navigasi kembali ke dashboard
  handleBack() {
    this.router.navigate(['/dashboard']);
  }

  // lifecycle hook saat komponen pertama kali diload
  ngOnInit(): void {
    this.fetchUsers(); // ambil data user
    this.isAdmin = this.authService.getUser()?.role === 'admin'; // cek apakah role user adalah admin
  }

  // mengambil semua user dari API
  fetchUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res) => {
        this.users = res.users; // simpan data user ke variabel users
      },
      error: (err) => {
        console.error('Gagal mengambil data user', err); // tampilkan error jika gagal
      },
    });
  }

  // navigasi ke halaman edit user
  handleEdit(id: string) {
    this.router.navigate(['/users', id]);
  }

  // menghapus user berdasarkan id
  handleDelete(id: string) {
    if (confirm('Yakin ingin menghapus user ini?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => {
          alert('User berhasil dihapus');
          this.fetchUsers(); // refresh daftar user
        },
        error: (err) => {
          console.error('Gagal menghapus user', err);
          alert('Gagal menghapus user');
        },
      });
    }
  }

  // navigasi ke halaman reset password user
  handleResetPassword(id: string) {
    this.router.navigate(['/admin/reset-password', id]);
  }

  // variabel untuk pencarian dan pagination
  searchTerm: string = '';   // input pencarian
  currentPage: number = 1;   // halaman saat ini
  itemsPerPage: number = 10; // jumlah item per halaman

  // filter user berdasarkan pencarian dan paginate hasilnya
  get filteredUsers() {
    const filtered = this.users?.filter(
      (user: any) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return filtered?.slice(start, start + this.itemsPerPage); // potong data sesuai halaman
  }

  // hitung jumlah total halaman berdasarkan hasil filter
  get totalPages() {
    const filteredLength = this.users?.filter(
      (user: any) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).length;
    return Math.ceil(filteredLength / this.itemsPerPage); // bulatkan ke atas
  }

  // ubah halaman saat tombol pagination diklik
  setPage(page: number) {
    this.currentPage = page;
  }
}
