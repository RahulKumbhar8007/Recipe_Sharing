import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  recipes: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchRecipes();
  }

  fetchRecipes() {
    this.http.get<any[]>("http://localhost:5000/Api/get_recipes").subscribe({
      next: (response) => {
        this.recipes = response;
      
         },
      error: (error) => {
        console.error('Error fetching recipes:', error);
      }
    });
}
}
