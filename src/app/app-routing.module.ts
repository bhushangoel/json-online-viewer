import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {JsonGeneratorComponent} from './json-generator/json-generator.component';
import {RegexHelpComponent} from './regex-help/regex-help.component';

const routes: Routes = [
  { path: '', redirectTo: '/generate', pathMatch: 'full' },
  { path: 'generate', component: JsonGeneratorComponent },
  { path: 'regex-help', component: RegexHelpComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
