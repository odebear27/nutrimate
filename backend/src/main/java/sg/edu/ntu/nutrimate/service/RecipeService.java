package sg.edu.ntu.nutrimate.service;

import java.util.List;

import sg.edu.ntu.nutrimate.entity.ApiRecipe;
import sg.edu.ntu.nutrimate.entity.ApiResponse;
import sg.edu.ntu.nutrimate.entity.CustomerRecipe;
import sg.edu.ntu.nutrimate.entity.Recipe;

public interface RecipeService {

    CustomerRecipe uploadCustomerRecipe(CustomerRecipe recipe);

    public ApiResponse getAllRecipes();

    public List<CustomerRecipe> getAllCustomerRecipesByUserID();

    public CustomerRecipe updateRecipe(int recipeId, CustomerRecipe recipe);

    public void deleteRecipe(int recipeId);

    public List<Recipe> searchRecipes(String search);

    public List<Recipe> searchRecipesByCuisine(String cuisine);

    public List<CustomerRecipe> adminGetAllCustomerRecipes();

    public CustomerRecipe adminGetCustomerRecipeById(int recipeId);

    public void adminDeleteRecipe(int recipeId);

}
