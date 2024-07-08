import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelhomePageComponent } from './hotelhome-page/hotelhome-page.component';

const routes: Routes = [
  {path: 'home', component: HotelhomePageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
