import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdEditComponent } from './components/ad/adEdit/adEdit.component';
import { AdListComponent } from './components/ad/adList/adList.component';
import { AdShowComponent } from './components/ad/show/show.component';
import { AuthComponent } from './components/auth/auth.component';
import { BanComponent } from './components/ban/ban.component';
import { GestAdminComponent } from './components/gestAdmin/gestAdmin.component';
import { UserEditComponent } from './components/user/edit/edit.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { BannedGuard } from './guards/Banned.guard';
import { NotAuthGuard } from './guards/notAuth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: "/ad",
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
		canActivate: [BannedGuard],
		pathMatch: 'full',
	},
	{
		path: 'ad/byUser/:user',
		component: AdListComponent,
		canActivate: [BannedGuard],
		pathMatch: 'full',
	},
	{
		path: 'ad/:id',
		component: AdShowComponent,
		canActivate: [BannedGuard],
		pathMatch: 'full',
	},
	{
		path: 'ad/:id/edit',
		canActivate: [AuthGuard, BannedGuard],
		component: AdEditComponent,
		pathMatch: 'full',
	},
	{
		path: 'user/data',
		canActivate: [AuthGuard, BannedGuard],
		component: UserEditComponent,
		pathMatch: 'full',
	},
	{
		path: 'gestAdmin',
		canActivate: [AuthGuard, AdminGuard, BannedGuard],
		component: GestAdminComponent,
		pathMatch: 'full',
	},
	{
		path: 'banned',
		canActivate: [AuthGuard],
		component: BanComponent,
		pathMatch: 'full',
	},
	{
		path: '**',
		component: AdListComponent,
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
