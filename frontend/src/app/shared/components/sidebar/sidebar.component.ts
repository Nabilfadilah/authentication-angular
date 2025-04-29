import { Component, Input, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'; // ⬅️ tambahkan
import { RouterModule } from '@angular/router'; // ⬅️ untuk routerLink
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true, // ini standalone karena menggunakan Angular standalone components
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule, RouterModule], // RouterModule di-import untuk routerLink
})
export class SidebarComponent implements OnInit {
  @Input() isOpen: boolean = true; // input properti dari parent untuk buka/tutup sidebar

  isAdmin = false; // status apakah user adalah admin
  isUser = false; // status apakah user adalah user biasa
  isDesktop = true; // tambahan untuk cek ukuran layar

  // AuthService ini dipakai untuk mendapatkan informasi user yang sedang login
  constructor(private authService: AuthService) {}

  // lifecycle hook Angular, otomatis dijalankan ketika komponen pertama kali di-load ke halaman
  ngOnInit() {
    // ambil data user yang sedang login dari AuthService.
    const user = this.authService.getUser();

    // jika user berhasil ditemukan (bukan null atau undefined):
    if (user) {
      
      // cek apakah role user adalah 'admin'
      this.isAdmin = user.role === 'admin';
      // kalau iya, set `isAdmin` jadi true. Ini nanti dipakai untuk menampilkan menu khusus admin

      // cek apakah role user adalah 'user' biasa
      this.isUser = user.role === 'user';
      // kalau iya, set `isUser` jadi true. Ini dipakai untuk menampilkan menu khusus user biasa
    }

    // panggil fungsi checkScreenSize() untuk menentukan apakah tampilan saat ini adalah desktop atau mobile
    this.checkScreenSize();
    // dilakukan saat komponen pertama kali load (bukan hanya saat resize)
  }

  @HostListener('window:resize', []) // dengarkan event resize window
  onWindowResize() {
    this.checkScreenSize(); // update flag desktop saat window resize
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth >= 768; // atur threshold untuk desktop 768px ke atas
  }
}

// opsi ke 2
// export class SidebarComponent implements OnInit {
//     @Input() isOpen: boolean = true;

//     isAdmin = false;
//     isUser = false;

//     constructor(private authService: AuthService) {
//       const role = this.authService.getUser();
//       this.isAdmin = role === 'admin';
//       this.isUser = role === 'user';
//     }

//     ngOnInit() {}
// }

// opsi ke 1
// export class SidebarComponent implements OnInit {
//   isSidebarOpen = true;
//   isAdmin = false;
//   isUser = false;

//   constructor(private authService: AuthService) {
//     const role = this.authService.getUser();
//     this.isAdmin = role === 'admin';
//     this.isUser = role === 'user';
//   }

//   ngOnInit() {
//     this.checkScreenSize();
//   }

//   toggleSidebar() {
//     this.isSidebarOpen = !this.isSidebarOpen;
//   }

//   @HostListener('window:resize', ['$event'])
//   onResize(event: any) {
//     this.checkScreenSize();
//   }

//   checkScreenSize() {
//     if (window.innerWidth <= 768) {
//       this.isSidebarOpen = false;
//     } else {
//       this.isSidebarOpen = true;
//     }
//   }
// }
