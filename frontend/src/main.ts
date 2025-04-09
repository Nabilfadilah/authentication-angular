import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // komponen utama aplikasi
import { provideRouter } from '@angular/router'; // untuk menyediakan routing ke aplikasi
import { routes } from './app/app.routes';  // impor definisi route
import { provideHttpClient } from '@angular/common/http'; // mengaktifkan fitur HttpClient (untuk request API)

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // menyediakan routing berdasarkan route yang sudah ditentukan
    provideHttpClient()    // menyediakan HttpClient agar bisa dipakai di seluruh aplikasi
  ]
});
