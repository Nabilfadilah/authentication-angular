import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-layout',
  standalone: true, // komponen berdiri sendiri tanpa module
  imports: [CommonModule ,RouterOutlet, SidebarComponent, NavbarComponent],
  templateUrl: './main-layout.component.html',
})

// opsi ke 3
export class MainLayoutComponent implements OnInit {
  isSidebarOpen = true; // menyimpan status sidebar apakah terbuka
  isDesktop = true;     // menyimpan status apakah layar saat ini berukuran desktop

  ngOnInit() {
    // cek ukuran layar saat pertama kali load
    this.checkScreenSize();

    // setiap window resize, jalankan pengecekan ulang ukuran layar
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  toggleSidebar() {
    // fungsi untuk toggle sidebar buka/tutup
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  checkScreenSize() {
    this.isDesktop = window.innerWidth >= 768; // anggap 768px sebagai breakpoint desktop md breakpoint Tailwind
    if (!this.isDesktop) {
      this.isSidebarOpen = false; // Mobile: sidebar default tertutup
    } else {
      this.isSidebarOpen = true;  // Desktop: sidebar default terbuka
    }
  }
}

// opsi ke 2
// export class MainLayoutComponent {
//   isSidebarOpen = true; // kontrol sidebar dari layout

//   toggleSidebar() {
//     this.isSidebarOpen = !this.isSidebarOpen;
//   }
// }

// opsi ke 1
// export class MainLayoutComponent {
//   sidebarWidth = '16rem'; // default 64

//   constructor() {
//     this.updateSidebarWidth();
//     window.addEventListener('resize', () => {
//       this.updateSidebarWidth();
//     });
//   }

//   updateSidebarWidth() {
//     if (window.innerWidth <= 768) {
//       this.sidebarWidth = '5rem'; // 20 w-20 = 5rem
//     } else {
//       this.sidebarWidth = '16rem'; // 64 w-64 = 16rem
//     }
//   }
// }
