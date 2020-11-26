import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {JsonGeneratorComponent} from './json-generator/json-generator.component';

const routes: Routes = [
  { path: 'generate', component: JsonGeneratorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
