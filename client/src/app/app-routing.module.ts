import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './dashboard/create/create.component';
import { UpdateComponent } from './dashboard/update/update.component';
import { CountriesComponent } from './dashboard/countries/countries.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: DashboardComponent}, 
  { path: 'create', component: CreateComponent},
  { path: 'update/:id', component: UpdateComponent },
  { path: 'countries', component: CountriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
