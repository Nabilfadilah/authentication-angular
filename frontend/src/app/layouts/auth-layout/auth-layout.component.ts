import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true, // ini berarti komponen berdiri sendiri tanpa module
  imports: [RouterOutlet], // import RouterOutlet untuk menampilkan child routes
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {} 
// komponen sederhana sebagai wrapper layout untuk halaman otentikasi (login/register).