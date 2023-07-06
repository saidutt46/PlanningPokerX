import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule, UiUxModule } from '@modules';
import { CreateGameComponent, GameHomeComponent, HomeComponent, LoginComponent,
  NavigationComponent, RegistrationComponent } from '@components';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GamehubService, NOTIFICATION_SERV_TOKEN, NotificationService } from '@services';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    NavigationComponent,
    CreateGameComponent,
    GameHomeComponent
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
    {
      provide: APP_INITIALIZER,
      useFactory: (signalrService: GamehubService) => () => signalrService.initiateSignalR(),
      deps: [GamehubService],
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

