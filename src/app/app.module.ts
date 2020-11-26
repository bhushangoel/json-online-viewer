import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {JsonGeneratorComponent} from './json-generator/json-generator.component';
import {JsonGeneratorService} from './json-generator/json-generator.service';
import { RegexHelpComponent } from './regex-help/regex-help.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonGeneratorComponent,
    RegexHelpComponent
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
