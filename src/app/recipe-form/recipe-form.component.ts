import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent {
  
  newIngredients: string = '';
  storedIngredients: string[] = [];

  addTask() {
    if (this.newIngredients.trim() !== '') {
      this.storedIngredients.push(this.newIngredients);
      this.newIngredients = '';
     console.log(this.storedIngredients)
    }
    

  }

  removeTask(index: number) {
    this.storedIngredients.splice(index, 1);
  }

  
 
  newMethodStep: string = '';
  storedMethodStep: string[] = [];

  addStep() {
    if (this.newMethodStep.trim() !== '') {
      this.storedMethodStep.push(this.newMethodStep);
      this.newMethodStep = '';
     
    }
    

  }

  removeStep(index: number) {
    this.storedMethodStep.splice(index, 1);
    
  }
 
 
recipe= {
    recipeName: '',
    method:this.storedMethodStep,
    ingredients:this.storedIngredients,
    image:'',
    email:'',
    yourName:'',
    totalCookTime:''
   
  };


  constructor(private http: HttpClient) {}

onSubmit() {
 const formData:any = new FormData();
    formData.append('recipeName', this.recipe.recipeName);
    formData.append('ingredients', JSON.stringify(this.recipe.ingredients));
    formData.append('method',JSON.stringify(this.recipe.method));
    formData.append('totalCookTime', this.recipe.totalCookTime);
    formData.append('image', this.recipe.image);
    formData.append('email', this.recipe.email);
    formData.append('yourName', this.recipe.yourName);
   
    

 
      this.http.post("http://localhost:5000/Api/recipes", formData)
      .subscribe({
        next: () => {
         alert('Recipe added successfully.');
        },
        error:(error) => {
          alert('Error adding recipe.');
          console.error(error);
        }
      }
      );
  
       
  }

  onFileSelected(event: any) {
    this.recipe.image = event.target.files[0];
  }
  }

  

