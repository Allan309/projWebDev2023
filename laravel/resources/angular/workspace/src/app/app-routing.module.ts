import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdEditComponent } from './components/ad/adEdit/adEdit.component';
import { AdListComponent } from './components/ad/adList/adList.component';
import { AdShowComponent } from './components/ad/show/show.component';
import { AuthComponent } from './components/auth/auth.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user/edit/edit.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		pathMatch: 'full',
	},
	{
		path: 'auth',
		component: AuthComponent,
		canActivate: [NotAuthGuard],
		pathMatch: 'full',
	},
	{
		path: 'ad',
		component: AdListComponent,
		pathMatch: 'full',
	},
	{
		path: 'ad/byUser/:user',
		component: AdListComponent,
		pathMatch: 'full',
	},
	{
		path: 'ad/:id',
		component: AdShowComponent,
		pathMatch: 'full',
	},
	{
		path: 'ad/:id/edit',
		canActivate: [AuthGuard],
		component: AdEditComponent,
		pathMatch: 'full',
	},
	{
		path: 'user/data',
		canActivate: [AuthGuard],
		component: UserEditComponent,
		pathMatch: 'full',
	},
	{
		path: '**',
		component: HomeComponent,
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
