import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  currentIndex = 0;
  subscription: Subscription;
  visibleRecipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @ViewChild('carouselContainer') carouselContainer: ElementRef;

  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
        this.visibleRecipes = this.recipes.slice(0, 6); // Update visible recipes
      }
    );
    this.recipes = this.recipeService.getRecipes();
    this.visibleRecipes = this.recipes.slice(0, 6); // Initialize visible recipes
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex -= 3;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.recipes.length - 3) {
      this.currentIndex += 3;
    }
  }
}
