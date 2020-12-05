import {BrowserModule, Title, Meta} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {NgJsonEditorModule} from 'ang-jsoneditor';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {JsonGeneratorComponent} from './json-generator/json-generator.component';
import {JsonGeneratorService} from './json-generator/json-generator.service';
import {RegexHelpComponent} from './regex-help/regex-help.component';
import {JsonViewerComponent} from './json-viewer/json-viewer.component';
import {JsonFormatterComponent} from './json-formatter/json-formatter.component';
import {DocsComponent} from './docs/docs.component';
import {MessageComponentComponent} from './shared/message-component/message-component.component';
import {JsonGeneratorTableComponent} from './json-generator-table/json-generator-table.component';

import {MessageComponentService} from './shared/message-component/message-component.service';
import {LocalStorageService} from './services/local-storage.service';

@NgModule({
  declarations: [
    AppComponent,
    JsonGeneratorComponent,
    RegexHelpComponent,
    JsonViewerComponent,
    JsonFormatterComponent,
    DocsComponent,
    MessageComponentComponent,
    JsonGeneratorTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgJsonEditorModule,
    NgbModule
  ],
  providers: [Title, JsonGeneratorService, MessageComponentService, LocalStorageService, Meta],
  bootstrap: [AppComponent]
})
export class AppModule {
}
