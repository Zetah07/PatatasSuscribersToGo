import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubscriberListComponent } from './subscriber/list/subscriber-list.component';
import { SubscriberFormComponent } from './subscriber/form/subscriber-form.component';
import { SubscriberDetailsComponent } from './subscriber/details/subscriber-details.component';


const routes: Routes = [
  { path: '', redirectTo: 'subscribers', pathMatch: 'full' },
  { path: 'subscribers', component: SubscriberListComponent },
  { path: 'add', component: SubscriberFormComponent },
  { path: 'update/:id', component: SubscriberFormComponent },
  { path: 'details/:id', component: SubscriberDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
