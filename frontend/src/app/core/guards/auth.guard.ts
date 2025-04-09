// opsi 2
import { Injectable } from '@angular/core'; // untuk membuat service atau guard yang bisa diinject
import { CanActivate, Router } from '@angular/router'; // CanActivate = interface untuk proteksi route
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
// menandakan bahwa service ini bisa langsung digunakan tanpa perlu declare manual di provider module
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, // service untuk akses token dari localStorage
    private router: Router // untuk navigasi jika user belum login
  ) {}

  canActivate(): boolean {
    const token = this.authService.getToken(); // ambil token dari localStorage
    if (token) {
      return true; // jika token ada, izinkan akses ke halaman (route dilindungi)
    } else {
      this.router.navigate(['/login']); // jika tidak ada token, redirect ke halaman login
      return false;
    }
  }
}

// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(): boolean {
//     const token = this.authService.getToken();
//     if (token) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
