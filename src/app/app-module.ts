import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Amplify } from 'aws-amplify'
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_pveKN6Tw5',
      userPoolClientId: '1q7otr6g8mf6tcphvqacbgjr3i'
    }
  }
});

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,
],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
