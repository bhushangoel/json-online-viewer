import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {JsonGeneratorComponent} from './json-generator/json-generator.component';
import {RegexHelpComponent} from './regex-help/regex-help.component';
import {JsonViewerComponent} from './json-viewer/json-viewer.component';
import {DocsComponent} from './docs/docs.component';

const routes: Routes = [
  {path: '', redirectTo: '/generate', pathMatch: 'full'},
  {path: 'generate', component: JsonGeneratorComponent},
  {path: 'regex-help', component: RegexHelpComponent},
  {path: 'json-viewer', component: JsonViewerComponent},
  {path: 'docs', component: DocsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
