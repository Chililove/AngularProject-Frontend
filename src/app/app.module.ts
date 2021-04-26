import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import {NgxsModule} from '@ngxs/store';
import {environment} from '../environments/environment.prod';


@Injectable()
export class SocketChat extends Socket {

  constructor() {

    super({ url: 'http://localhost:3000', options: {}});
  }

}
@Injectable()
export class SocketStock extends Socket {

  constructor() {

    super({ url: 'http://localhost:3200', options: {}});
  }

}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule,
    BrowserAnimationsModule,
    SharedModule,
    MatFormFieldModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    })
  ],
  providers: [SocketChat, SocketStock],
  bootstrap: [AppComponent]
})
export class AppModule { }
