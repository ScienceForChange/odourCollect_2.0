import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

import { LoginInterceptor } from './interceptors/http.interceptor';
import { AuthService } from './services/auth.service';
import { appInitializer } from './helpers/appInitializer';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CoreModule,
    NgbModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [AuthService],
    },
    { provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
