import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { UserListComponent } from './features/users/user-list.component';
import { UserEditComponent } from './features/users/user-edit.component';
import { UserResetPasswordComponent } from './features/users/user-reset-password.component';

// opsi ke 2
export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent, // khusus untuk halaman otentikasi (login/register)
    children: [
      // jika URL kosong, otomatis redirect ke halaman login
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent, // layout utama setelah login (membutuhkan proteksi auth)
    canActivate: [AuthGuard], // hanya dapat diakses jika sudah login (AuthGuard akan mengecek autentikasi)
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: UserEditComponent },
      { path: 'admin/reset-password/:id', component: UserResetPasswordComponent },
    ],
  },
];

// opsi ke 1
// export const routes: Routes = [
//   { path: '', redirectTo: 'login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},  // proteksi route: hanya bisa diakses jika sudah login
// ];
