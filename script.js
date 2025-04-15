







function toggleMenu() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("active");
  }

  // Optional: close dropdown when clicking outside
  window.addEventListener("click", function (e) {
    const menu = document.getElementById("menu");
    const burger = document.querySelector(".hamburgernew");

    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      menu.classList.remove("active");
    }
  });














document.addEventListener("DOMContentLoaded", function () {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answerBox = item.querySelector(".faq-answer");
        const answerText = answerBox.getAttribute("data-answer");

        question.addEventListener("click", () => {
            // Close all other FAQ answers
            faqItems.forEach((otherItem) => {
                if (otherItem !== item) {
                    otherItem.classList.remove("active");
                    const otherAnswerBox = otherItem.querySelector(".faq-answer");
                    otherAnswerBox.innerHTML = "";  // Clear text
                    otherAnswerBox.style.display = "none";
                }
            });

            // Toggle current FAQ answer
            if (item.classList.contains("active")) {
                item.classList.remove("active");
                answerBox.innerHTML = "";
                answerBox.style.display = "none";
            } else {
                item.classList.add("active");
                answerBox.style.display = "block";
                typeText(answerBox, answerText, 0);
            }
        });
    });

    function typeText(element, text, index) {
        if (index < text.length) {
            element.innerHTML += text[index];
            setTimeout(() => typeText(element, text, index + 1), 30); // Adjust speed here
        }
    }
});




















function searchGK() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let articles = document.querySelectorAll(".searchable");

    articles.forEach(article => {
        let text = article.innerText.toLowerCase();
        let parentBox = article.closest(".news-box");

        if (text.includes(input)) {
            parentBox.style.display = "block"; // Show matching results
            article.classList.add("highlight"); // Highlight text
        } else {
            parentBox.style.display = "none"; // Hide non-matching results
            article.classList.remove("highlight");
        }
    });
}


document.addEventListener("DOMContentLoaded", function() {
    // Dropdown menu functionality
    const dropdownToggle = document.querySelector(".dropdown-toggle");
    const dropdownMenu = document.querySelector(".dropdown-menu");

    dropdownToggle.addEventListener("click", function(event) {
        event.preventDefault();
        dropdownMenu.classList.toggle("show");
    });

    // Close dropdown if clicked outside
    document.addEventListener("click", function(event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove("show");
        }
    });

    // Login functionality (basic validation)
    document.getElementById("loginForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        if (email === "test@example.com" && password === "password") {
            alert("Login successful!");
            window.location.href = "dashboard.html"; // Redirect to a dashboard page
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });

    // Image Upload Functionality
    function uploadImage() {
        const fileInput = document.getElementById("imageUpload");
        const previewContainer = document.getElementById("imagePreview");

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();

            reader.onload = function(event) {
                const img = document.createElement("img");
                img.src = event.target.result;
                img.classList.add("uploaded-image");
                previewContainer.innerHTML = ""; // Clear previous images
                previewContainer.appendChild(img);
            };

            reader.readAsDataURL(file);
        }
    }

    window.uploadImage = uploadImage; // Expose function to global scope
});

// Check for browser support
if (!('webkitSpeechRecognition' in window)) {
    alert("Your browser does not support speech recognition. Try using Google Chrome.");
} else {
    // Create a new instance of webkitSpeechRecognition
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // When the voice search button is clicked
    document.getElementById("voice-search").addEventListener("click", function() {
        recognition.start();
    });

    // Process the results when speech recognition returns them
    recognition.onresult = function(event) {
        // Get the transcript from the first result
        const transcript = event.results[0][0].transcript;
        // Set the transcript to the search input field
        document.getElementById("searchInput").value = transcript;
    };

    recognition.onerror = function(event) {
        console.error("Speech recognition error:", event.error);
    };

    // Optional: You can also handle recognition end event if needed
    recognition.onend = function() {
        console.log("Voice recognition ended.");
    };
}


function toggleDropdown() {
    var menu = document.getElementById("dropdownMe");
    menu.classList.toggle("show-dropdown");
}



        


        // 🌗 Dark & Light Mode
        const toggleBtn = document.getElementById("theme-toggle");
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });

        function toggleDropdown() {
            var dropdown = document.getElementById("dropdownMe");
            if (dropdown.style.display === "block") {
                dropdown.style.display = "none";
            } else {
                dropdown.style.display = "block";
            }
        }
        
        // Close dropdown when clicking outside
        document.addEventListener("click", function(event) {
            var dropdown = document.getElementById("dropdownMe");
            var hamburger = document.querySelector(".hamburger");
            
            // If the click is not inside the hamburger or dropdown, hide it
            if (!hamburger.contains(event.target) && !dropdown.contains(event.target)) {
                dropdown.style.display = "none";
            }
        });



        document.addEventListener("DOMContentLoaded", function () {
            const textarea = document.querySelector(".writing-assistant textarea");
            const submitBtn = document.querySelector(".submit-btn");
        
            // Load saved article from local storage
            if (localStorage.getItem("savedArticle")) {
                textarea.value = localStorage.getItem("savedArticle");
            }
        
            // Save text as user types
            textarea.addEventListener("input", function () {
                localStorage.setItem("savedArticle", textarea.value);
            });
        
            // Handle submit button click
            submitBtn.addEventListener("click", function () {
                const articleText = textarea.value.trim();
        
                if (articleText === "") {
                    alert("Please write something before submitting!");
                    return;
                }
        
                // Simulate submission (You can integrate a backend here)
                alert("✅ Article submitted successfully!");
        
                // Clear textarea and remove from local storage
                textarea.value = "";
                localStorage.removeItem("savedArticle");
            });
        });
        


  
  // Simulated AI Chatbot function.
  function chatAI() {
    const input = document.getElementById("chat-input").value;
    if (!input) {
      alert("Please enter a question.");
      return;
    }
    document.getElementById("chat-output").innerText = "DANGOL AI: " + input + " is a thought-provoking question!";
  }
        


  // Fetch the footer data from the backend
  fetch('/footer')
  .then(response => response.json())
  .then(data => {
      const footer = document.getElementById('footer');
      footer.innerHTML = `
          <div class="footer-container">
              <div class="footer-section popular-posts">
                  <h3>Popular Posts</h3>
                  <ul>
                      ${data.popularPosts.map(post => `<li><a href="${post.link}">${post.title}</a></li>`).join('')}
                  </ul>
              </div>
              <div class="footer-section latest-posts">
                  <h3>Latest Posts</h3>
                  <ul>
                      ${data.latestPosts.map(post => `<li><a href="${post.link}">${post.title}</a></li>`).join('')}
                  </ul>
              </div>
              <div class="footer-section might-posts">
                  <h3>Might Posts</h3>
                  <ul>
                      ${data.mightPosts.map(post => `<li><a href="${post.link}">${post.title}</a></li>`).join('')}
                  </ul>
              </div>
          </div>
          <div class="footer-bottom">
              &copy; 2023 Your Website Name. All rights reserved.
          </div>
      `;
  })
  .catch(error => console.error('Error fetching footer data:', error));

  
 // DOM Elements
const interestInput = document.getElementById('interest-input');
const recommendationOutput = document.getElementById('recommendation-output');
const recommendationList = document.getElementById('recommendation-list');
const closeBtn = document.getElementById('close-btn');

















// Function to show recommendations
function getRecommendations() {
  const interest = interestInput.value.trim();

  if (interest) {
    // Simulate fetching recommendations (replace with actual API call)
    const recommendations = [
      "World War II Quiz",
      "Space Exploration Article",
      "Famous Scientists Video",
      "Geography Trivia Game"
    ];

    // Display recommendations
    recommendationList.innerHTML = recommendations.map(item => `<p>${item}</p>`).join('');
    recommendationOutput.style.display = 'block'; // Show dropdown
  } else {
    recommendationList.innerHTML = '<p>Please enter an interest to get recommendations!</p>';
    recommendationOutput.style.display = 'block'; // Show dropdown
  }
}

// Function to close the dropdown
function closeDropdown() {
  recommendationOutput.style.display = 'none'; // Hide dropdown
}

// Close dropdown when clicking outside
document.addEventListener('click', (event) => {
  if (!recommendationOutput.contains(event.target)) {
    recommendationOutput.style.display = 'none'; // Hide dropdown
  }
});

function getRecommendations() {
    // Get the user's input
    const query = document.querySelector('textarea').value;

    // Send a POST request to the backend
    fetch('/get-recommendations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => {
      const outputDiv = document.getElementById('recommendation-output');

      // Display the result or error
      if (data.error) {
        outputDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
      } else {
        outputDiv.innerHTML = `<p>${data.summary}</p>`;
      }

      // Show the recommendation output div
      outputDiv.style.display = 'block';
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  function closeDropdown() {
    // Hide the recommendation output div
    const outputDiv = document.getElementById('recommendation-output');
    outputDiv.style.display = 'none';
  }




  function getRecommendations() {
    // Get the user's input
    const query = document.querySelector('textarea').value;

    // Send a POST request to the backend
    fetch('http://127.0.0.1:5000/get-recommendations', {
        method: 'POST',  // Ensure this is POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: query })
    })
    .then(response => response.json())
    .then(data => {
        const outputDiv = document.getElementById('recommendation-output');

        // Display the result or error
        if (data.error) {
            outputDiv.innerHTML = `<p style="color: red;">${data.error}</p>`;
        } else {
            outputDiv.innerHTML = `<p>${data.summary}</p>`;
        }

        // Show the recommendation output div
        outputDiv.style.display = 'block';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}



fetch("http://127.0.0.1:5000/get-recommendations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query: query })
})

document.querySelector(".scroll-container").addEventListener("wheel", function(event) {
    event.preventDefault();
    this.scrollLeft += event.deltaY;
});

// document.querySelector(".scroll-container").addEventListener("wheel", function(event) {
//     event.preventDefault();
//     this.scrollLeft += event.deltaY;
// });
