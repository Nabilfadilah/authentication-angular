import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // untuk router-outlet HTML
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,                 // nama selector yang digunakan
  imports: [RouterOutlet, NavbarComponent, SidebarComponent], // impor RouterOutlet untuk digunakan di template
  templateUrl: './app.component.html',  // template HTML dari komponen ini
  styleUrls: ['./app.component.css']    // file CSS untuk styling
})
export class AppComponent {
  title = 'frontend'; // properti title (opsional)

  isSidebarOpen = true; // tambah state buat sidebar

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // toggle buka/tutup
  }
}
