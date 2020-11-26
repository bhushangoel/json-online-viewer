import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {JsonGeneratorComponent} from './json-generator/json-generator.component';
import {JsonGeneratorService} from './json-generator/json-generator.service';

@NgModule({
  declarations: [
    AppComponent,
    JsonGeneratorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [JsonGeneratorService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
