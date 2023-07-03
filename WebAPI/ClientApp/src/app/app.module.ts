import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, UiUxModule } from '@modules';
import { HomeComponent, LoginComponent, NavigationComponent, RegistrationComponent } from '@components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NOTIFICATION_SERV_TOKEN, NotificationService } from '@services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    UiUxModule,
    AppRoutingModule,
    FlexLayoutModule
  ],
  providers: [
    { provide: NOTIFICATION_SERV_TOKEN, useClass: NotificationService },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

