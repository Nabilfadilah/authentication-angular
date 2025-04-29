// // app-routing.module.ts
// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './core/guards/auth.guard';

// import { LoginComponent } from './features/auth/login/login.component';
// import { DashboardComponent } from './layouts/dashboard/dashboard.component';
// // import { RegisterComponent } from './app/features/auth/register/register.component';
// // import { UserListComponent } from './app/features/user/user-list.component';
// // import { UserEditComponent } from './app/features/user/user-edit.component';
// // import { ResetPasswordComponent } from './app/features/user/reset-password.component';
// // import { BiodataListComponent } from './app/features/user/biodata-list.component';
// // import { BiodataEditComponent } from './app/features/user/biodata-edit.component';
// // import { BiodataViewComponent } from './app/features/user/biodata-view.component';

// const routes: Routes = [
//   { path: 'login', component: LoginComponent },
// //   { path: 'register', component: RegisterComponent },
//   { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
// //   { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
// //   { path: 'users/:id', component: UserEditComponent, canActivate: [AuthGuard] },
// //   { path: 'admin/reset-password/:id', component: ResetPasswordComponent, canActivate: [AuthGuard] },
// //   { path: 'biodata', component: BiodataListComponent, canActivate: [AuthGuard] }, // akan diatur berdasarkan role juga nanti
// //   { path: 'biodata/create', component: BiodataEditComponent, canActivate: [AuthGuard] },
// //   { path: 'biodata/edit/:id', component: BiodataEditComponent, canActivate: [AuthGuard] },
// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
