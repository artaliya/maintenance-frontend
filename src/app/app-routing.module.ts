import { NgModule } from '@angular/core';
import {MonitorComponent} from './monitor/monitor.component';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'monitor', component: MonitorComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
