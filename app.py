from flask import Flask, render_template, jsonify, request
import wikipedia
import json

app = Flask(__name__)

# Set the Wikipedia language to English
wikipedia.set_lang("en")

# Load GK data from JSON file
try:
    with open("gk_data.json", "r") as file:
        gk_data = json.load(file)
except FileNotFoundError:
    print("Error: gk_data.json file not found.")
    gk_data = {}
except json.JSONDecodeError:
    print("Error: gk_data.json is not a valid JSON file.")
    gk_data = {}

# Home route (renders the gk.html template)
@app.route('/')
def index():
    return render_template('gk.html')

# Recommendation route (handles POST requests)
@app.route('/get-recommendations', methods=['POST'])
def get_recommendations():
    try:
        # Get the user's query from the frontend
        data = request.json
        query = data.get('query', '')

        if not query:
            return jsonify({"error": "Please provide a query."}), 400

        print(f"User query: {query}")  # Debug: Print the user's query
        print(f"Available topics: {list(gk_data.keys())}")  # Debug: Print available topics

        # Check if the query exists in the GK data
        if query in gk_data:
            print(f"Found GK questions for: {query}")  # Debug: Confirm topic is found
            return jsonify({
                "type": "gk_questions",
                "questions": gk_data[query]
            })

        # If not, fetch from Wikipedia
        search_results = wikipedia.search(query)

        if not search_results:
            return jsonify({"error": "No results found."}), 404

        # Fetch the summary of the first search result
        try:
            page = wikipedia.page(search_results[0])
            summary = wikipedia.summary(search_results[0], sentences=10)  # Fetch more sentences
            url = page.url

            # Ensure the summary is at least 80 words
            if len(summary.split()) < 80:
                summary = page.content[:500]  # Fetch the first 500 characters of the full content

            return jsonify({
                "type": "wikipedia_summary",
                "question": f"What is {search_results[0]}?",
                "answer": summary,
                "url": url
            })
        except wikipedia.exceptions.DisambiguationError as e:
            return jsonify({"error": "Multiple results found. Please be more specific.", "options": e.options}), 400
        except wikipedia.exceptions.PageError:
            return jsonify({"error": "No results found."}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)




# from flask import Flask, request, jsonify
# import wikipedia

# app = Flask(__name__)

# # Home Route (Optional, for testing)
# @app.route('/')
# def home():
#     return "Welcome to the GK Recommendation Backend!"

# # Recommendation Route
# @app.route('/get-recommendations', methods=['POST'])  # Ensure this line is correct
# def get_recommendations():
#     # Get the user's input from the frontend
#     data = request.json
#     query = data.get('query', '')

#     if not query:
#         return jsonify({"error": "Please provide a query."}), 400

#     try:
#         # Fetch a summary from Wikipedia
#         summary = wikipedia.summary(query, sentences=3)  # Get a 3-sentence summary
#         return jsonify({"query": query, "summary": summary})
#     except wikipedia.exceptions.DisambiguationError as e:
#         # Handle disambiguation errors (e.g., multiple results)
#         return jsonify({"error": "Multiple results found. Please be more specific.", "options": e.options}), 400
#     except wikipedia.exceptions.PageError:
#         # Handle page not found errors
#         return jsonify({"error": "No results found."}), 404

# if __name__ == '__main__':
#     app.run(debug=True)





