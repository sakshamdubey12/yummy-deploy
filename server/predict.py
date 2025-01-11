import sys
import pandas as pd
import json
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import make_pipeline

# Load the dataset
df = pd.read_csv('dataset.csv')

# Features and target
X = df['Ingredients']
y = df['Recipe Name']

# Split the dataset into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create a pipeline with CountVectorizer and LogisticRegression
model = make_pipeline(CountVectorizer(), LogisticRegression(max_iter=200))

# Train the model
model.fit(X_train, y_train)

# Function to get the recipe instructions based on the predicted recipe
def get_recipe_details(recipe_name):
    # Find the row in the DataFrame that matches the predicted recipe name
    recipe_row = df[df['Recipe Name'] == recipe_name]
    if not recipe_row.empty:
        return {
            "RecipeName": recipe_row.iloc[0]['Recipe Name'],
            "Ingredients": recipe_row.iloc[0]['Ingredients'],
            "Instructions": recipe_row.iloc[0]['Recipe Instructions'],
            "CuisineType": recipe_row.iloc[0]['Cuisine Type'],
            "CookingTime": recipe_row.iloc[0]['Cooking Time'],
            "DifficultyLevel": recipe_row.iloc[0]['Difficulty Level'],
            "ServingSize": recipe_row.iloc[0]['Serving Size']
        }
    return None

# Get ingredients from command-line arguments
ingredients = sys.argv[1]

# Example of predicting a recipe based on new ingredients
new_ingredients = [ingredients]
predicted_recipe = model.predict(new_ingredients)[0]

# Fetch the corresponding recipe details
recipe_details = get_recipe_details(predicted_recipe)

# Output the recipe details as JSON
if recipe_details:
    print(json.dumps(recipe_details))  
else:
    print(json.dumps({"error": "Recipe not found"}))


# import sys
# import pandas as pd
# from sklearn.feature_extraction.text import CountVectorizer
# from sklearn.metrics.pairwise import cosine_similarity

# # Load the dataset
# df = pd.read_csv('dataset.csv')

# # Preprocess the data
# df['Ingredients'] = df['Ingredients'].str.lower()

# # Function to predict a recipe based on ingredients
# def predict_recipe(input_ingredients):
#     input_ingredients = input_ingredients.lower()
    
#     # Initialize a CountVectorizer to create a bag of words
#     vectorizer = CountVectorizer().fit_transform(df['Ingredients'])
    
#     # Vectorize the input ingredients
#     input_vector = vectorizer.transform([input_ingredients])
    
#     # Calculate cosine similarity between input ingredients and dataset
#     cosine_similarities = cosine_similarity(input_vector, vectorizer).flatten()
    
#     # Find the index of the most similar recipe
#     most_similar_recipe_index = cosine_similarities.argmax()
    
#     # Retrieve the details of the predicted recipe
#     predicted_recipe = df.iloc[most_similar_recipe_index].to_dict()
    
#     return predicted_recipe

# if __name__ == "__main__":
#     if len(sys.argv) > 1:
#         input_ingredients = sys.argv[1]
#         result = predict_recipe(input_ingredients)
#         print(result)
#     else:
#         print("Please provide a list of ingredients.")
