 import { Component, OnInit } from '@angular/core'; // untuk membuat komponen dan menangani lifecycle
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service'; ; // service untuk autentikasi (login/logout, user)
import { CommonModule } from '@angular/common'; // modul umum angular seperti ngIf, ngFor
import { RouterLink } from '@angular/router'; // untuk mengaktifkan routerLink pada HTML

// deklarasi komponen
@Component({
  selector: 'app-dashboard', // nama selector untuk dipakai di template HTML lain
  standalone: true, // menandakan komponen ini tidak bergantung pada modul eksternal
  imports: [CommonModule, RouterLink], // impor modul yang dibutuhkan di dalam template HTML
  templateUrl: './dashboard.component.html', // template HTML untuk tampilan UI
  styleUrls: ['./dashboard.component.css'] // file CSS untuk styling tampilan
})

export class DashboardComponent implements OnInit {
  user: any = null; // properti untuk menyimpan data user saat ini

  // konstruktor, di-inject AuthService dan Router
  constructor(private authService: AuthService, private router: Router) {}

  // lifecycle hook yang dijalankan saat komponen pertama kali di-load
  ngOnInit(): void {
    this.user = this.authService.getUser(); // ambil data user dari localStorage
  }

  // fungsi untuk menangani logout
  handleLogout(): void {
    this.authService.logout(); // hapus token & user dari localStorage
    this.router.navigate(['/login']); // arahkan ke halaman login
  }
}
