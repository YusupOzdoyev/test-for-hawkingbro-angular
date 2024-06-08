import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { InfoComponent } from './components/info/info.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { BasketComponent } from './components/basket/basket.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "info", component: InfoComponent },
  { path: "contacts", component: ContactsComponent },
  { path: "basket", component: BasketComponent },
  { path: "**", redirectTo: '', component: HomeComponent }
];
