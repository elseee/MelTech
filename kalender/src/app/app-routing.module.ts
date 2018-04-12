import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MyComponent } from './my/my-component';
import { KlantComponent } from './klant/klant.component'

const routes: Routes = [
	{ path: '', redirectTo: '/klant', pathMatch: 'full' },
	{ path: 'klant', component: KlantComponent },
	{ path: 'admin', component: LoginComponent },
	{ path: 'kalender', component: MyComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
