import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {NgJsonEditorModule} from 'ang-jsoneditor';

import {AppComponent} from './app.component';
import {JsonGeneratorComponent} from './json-generator/json-generator.component';
import {JsonGeneratorService} from './json-generator/json-generator.service';
import {RegexHelpComponent} from './regex-help/regex-help.component';
import {JsonViewerComponent} from './json-viewer/json-viewer.component';
import {JsonFormatterComponent} from './json-formatter/json-formatter.component';
import {DocsComponent} from './docs/docs.component';
import {MessageComponentComponent} from './shared/message-component/message-component.component';

import {MessageComponentService} from './shared/message-component/message-component.service';

@NgModule({
  declarations: [
    AppComponent,
    JsonGeneratorComponent,
    RegexHelpComponent,
    JsonViewerComponent,
    JsonFormatterComponent,
    DocsComponent,
    MessageComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgJsonEditorModule
  ],
  providers: [JsonGeneratorService, MessageComponentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
