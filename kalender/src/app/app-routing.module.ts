import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyComponent } from './my/my-component';
import { KlantComponent } from './klant/klant.component';
import { SuccesComponent } from './succes/succes.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ContactComponent } from './contact/contact.component';
import { OverOnsComponent } from './over-ons/over-ons.component';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: 'klant', component: KlantComponent },
	{ path: 'admin', component: LoginComponent },
	{ path: 'kalender', component: MyComponent},
	{ path: 'succes', component: SuccesComponent },
	{ path: 'home', component: HomepageComponent },
	{ path: 'over_ons', component: OverOnsComponent },
	{ path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }

// hier moet straks de verwijzing ook naar de succes pagina van het formulier komen te staan