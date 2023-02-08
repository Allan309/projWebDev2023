import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialImportModule } from './modules/material.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { AdEditComponent } from './components/ad/adEdit/adEdit.component';
import { AdListComponent } from './components/ad/adList/adList.component';
import { AdShowComponent } from './components/ad/show/show.component';
import { UserEditComponent } from './components/user/edit/edit.component';
import { AdListFiltreComponent } from './components/ad/adList/filtre/filtre.component';
import { GestAdminComponent } from './components/gestAdmin/gestAdmin.component';
import { BanComponent } from './components/ban/ban.component';

library.add(fas, far, fab);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AuthComponent,
    SnackbarComponent,
    AdEditComponent,
    AdListComponent,
    AdShowComponent,
    UserEditComponent,
    AdListFiltreComponent,
    GestAdminComponent,
    BanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MaterialImportModule,
    HttpClientModule,
		FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
	constructor(library: FaIconLibrary) {
		library.addIconPacks(fas, far, fab);
	}
}
