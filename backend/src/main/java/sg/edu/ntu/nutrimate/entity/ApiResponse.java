package sg.edu.ntu.nutrimate.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

// This ApiResponse class is used to map the JSON response from the Spoonacular API into a List of ApiRecipe
// ignore all other properties that are not defined in this class
@JsonIgnoreProperties(ignoreUnknown = true)
public class ApiResponse {
    private List<ApiRecipe> results;
    private int totalResults;
    private int page;
    private int number;
    
    public int getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(int totalResults) {
        this.totalResults = totalResults;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }    

    public List<ApiRecipe> getResults() {
        return this.results;
    }

    public void setResults(List<ApiRecipe> results) {
        this.results = results;
    }

}
