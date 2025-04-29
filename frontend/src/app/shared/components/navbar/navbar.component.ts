import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true, // standalone component
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [CommonModule] // commonModule wajib untuk *ngIf, *ngFor
})
export class NavbarComponent {
  @Output() toggleSidebarEvent = new EventEmitter<void>(); // emit event untuk toggle sidebar

  username: string = ''; // nama user login

  constructor(private authService: AuthService, private router: Router) {
    const user = this.authService.getUser(); // ambil data user
    this.username = user || 'Guest'; // kalau tidak ada user, tampilkan Guest
  }

  logout() {
    this.authService.logout(); // panggil service logout
    this.router.navigate(['/login']); // redirect ke halaman login
  }

  toggleSidebar() {
    this.toggleSidebarEvent.emit(); // trigger toggle sidebar ke parent
  }
}

// export class NavbarComponent {
//   username: string = '';

//   constructor(private authService: AuthService, private router: Router) {
//     const user = this.authService.getUser();
//     this.username = user || 'Guest';
//   }

//   logout() {
//     this.authService.logout();
//     this.router.navigate(['/login']);
//   }
// }
