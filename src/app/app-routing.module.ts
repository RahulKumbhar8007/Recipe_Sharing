import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './Gaurd/auth.guard';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { RecipeDetailsComponentComponent } from './recipe-details-component/recipe-details-component.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "/home",
    pathMatch: 'full'
  },
  { path: 'recipe/:id', 
  component: RecipeDetailsComponentComponent
 },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'recipes',
    component: RecipesComponent
  },
  {
    path: 'recipeForm',
    component: RecipeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
