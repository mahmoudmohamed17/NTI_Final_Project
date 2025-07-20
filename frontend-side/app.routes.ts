import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Auth } from './auth/auth';
import { Cart } from './cart/cart';

export const routes: Routes = [
    { path: 'auth', component: Auth },
    { path: 'home', component: Home },
    { path: 'cart', component: Cart },
];
