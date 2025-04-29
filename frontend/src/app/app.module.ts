// opsi 3
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // untuk reactive form (misal form login/register)
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http'; // HTTP dan interceptor
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component'; // Komponen utama (standalone)
import { LoginComponent } from './features/auth/login/login.component'; // komponen login (standalone)
import { AuthInterceptor } from './core/interceptors/auth.interceptor'; // interceptor custom
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserModule,        // module dasar untuk browser
    ReactiveFormsModule,  // mendukung Reactive Forms
    HttpClientModule,     // untuk API request
    RouterModule,         // modul routing
    AppComponent,         // komponen standalone, harus dimasukkan ke imports
    LoginComponent,       // komponen standalone lainnya juga harus di-import, bukan di declarations
    SidebarComponent,     // komponen
    NavbarComponent,      // komponen
    CommonModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // menyediakan interceptor custom untuk setiap request HTTP
      multi: true                // memungkinkan penggunaan banyak interceptor
    }
  ]
})
export class AppModule {}


// opsi 2
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { ReactiveFormsModule } from '@angular/forms'; // ✅ Tambahkan ini
// import { HttpClientModule } from '@angular/common/http';

// import { AppComponent } from './app.component';
// import { LoginComponent } from './features/auth/login/login.component';

// @NgModule({
//   declarations: [
//     AppComponent,
//     LoginComponent
//   ],
//   imports: [
//     BrowserModule,
//     ReactiveFormsModule,
//     HttpClientModule
//   ],
// })
// export class AppModule { }

