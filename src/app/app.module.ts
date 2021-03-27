import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {Socket, SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatToolbarModule} from '@angular/material/toolbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';

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
    NgbModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [SocketChat, SocketStock],
  bootstrap: [AppComponent]
})
export class AppModule { }
