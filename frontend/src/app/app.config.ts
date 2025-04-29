import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    // optimasi perubahan zona: menggabungkan beberapa event DOM menjadi satu tick Angular, untuk meningkatkan performa.

    provideRouter(routes), 
    // mendaftarkan konfigurasi routing aplikasi dengan menggunakan 'routes' yang sudah didefinisikan.

    provideClientHydration(withEventReplay()),
    // membantu mendukung SSR (Server Side Rendering) dengan fitur 'event replay' untuk menjaga interaktivitas aplikasi.

    provideHttpClient(withInterceptorsFromDi())
    // mengaktifkan HTTP Client bawaan Angular dan mengizinkan penggunaan interceptor yang diambil dari Dependency Injection (DI).
  ]
};
