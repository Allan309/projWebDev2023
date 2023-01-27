import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdShowComponent } from './components/ad/show/show.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
	},
	{
		path: 'auth',
		component: AuthComponent,
		pathMatch: 'full',
	},
	{
		path: 'ad',
		component: AdShowComponent,
		pathMatch: 'full',
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
