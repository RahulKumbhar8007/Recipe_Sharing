import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-details-component',
  templateUrl: './recipe-details-component.component.html',
  styleUrls: ['./recipe-details-component.component.css']
})
export class RecipeDetailsComponentComponent {
  recipe:any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const recipeId = params.get('id');
      this.fetchRecipeDetail(recipeId);
    });
    
  }

  fetchRecipeDetail(recipeId: any) {
    this.http.get<any>(`http://localhost:5000/Api/get_recipe/${recipeId}`).subscribe({
      next: (response: any) => {
        this.recipe = response;
       
      },
      error: (error: any) => {
        console.error('Error fetching recipe:', error);
      }
    });
  }
  
}
