import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Amplify } from 'aws-amplify'
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_pveKN6Tw5',
      userPoolClientId: '540va5rijbq8jn37234iverd4f'
    }
  }
});

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
