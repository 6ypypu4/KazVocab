// Dictionary (word -> translation)
const dictionary = {
    сәлем: "привет",
    әлем: "мир",
    алма: "яблоко",
    ит: "собака",
    мысық: "кошка",
    үй: "дом",
    автомобиль: "машина",
    кітап: "книга",
    күн: "солнце",
    ай: "луна",
  };
  
  // Get DOM elements
  const wordContainer = document.getElementById("word-container");
  const userInput = document.getElementById("user-input");
  const feedback = document.getElementById("feedback");
  
  // Function to get a random word from the dictionary
  function getRandomWord() {
    const words = Object.keys(dictionary);
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
  
  // Generate a pool of 6 unique random words
  function generateWordPool() {
    const words = [];
    while (words.length < 6) {
      const word = getRandomWord();
      if (!words.includes(word)) {
        words.push(word);
      }
    }
    return words;
  }
  
  // Display words in a row
  function displayWords(words) {
    const wordRow = document.createElement("div");
    wordRow.className = "word-row";
    words.forEach((word, index) => {
      const wordDiv = document.createElement("div");
      wordDiv.className = "word";
      wordDiv.textContent = word;
      if (index === 0) {
        wordDiv.classList.add("active"); // Highlight the first word
      }
      wordRow.appendChild(wordDiv);
    });
    wordContainer.appendChild(wordRow);
  }
  
  // Initialize the game
  let wordPool = generateWordPool();
  displayWords(wordPool);
  
  let currentWordIndex = 0;
  
  // Check user input
  userInput.addEventListener("input", () => {
    const typedText = userInput.value.trim().toLowerCase();
    const currentWord = wordPool[currentWordIndex].toLowerCase();
  
    // Re-add the active class if input is cleared
    if (typedText.length === 0) {
      const wordRow = wordContainer.children[0];
      wordRow.children[currentWordIndex].classList.add("active");
    }
  
    if (typedText === currentWord) {
      // Show translation
      const wordRow = wordContainer.children[0];
      const wordDiv = wordRow.children[currentWordIndex];
      const translationDiv = document.createElement("div");
      translationDiv.className = "translation";
      translationDiv.textContent = dictionary[currentWord];
      wordDiv.appendChild(translationDiv);
  
      // Animate translation
      setTimeout(() => {
        translationDiv.style.opacity = "1";
      }, 10);
  
      // Move to the next word
      currentWordIndex++;
      userInput.value = ""; // Clear input
  
      // Update active word highlighting
      if (currentWordIndex < wordPool.length) {
        wordRow.children[currentWordIndex - 1].classList.remove("active");
        wordRow.children[currentWordIndex].classList.add("active");
      }
  
      // When all words are completed
      if (currentWordIndex >= wordPool.length) {
        setTimeout(() => {
          // Fade out current words
          const currentRow = wordContainer.children[0];
          currentRow.style.opacity = '0';
          
          // Wait for fade out to complete
          setTimeout(() => {
            // Remove old row
            wordContainer.innerHTML = '';
            
            // Generate and display new words
            wordPool = generateWordPool();
            displayWords(wordPool);
            currentWordIndex = 0;
            
            // Fade in new words
            const newRow = wordContainer.children[0];
            newRow.style.opacity = '0';
            setTimeout(() => {
                newRow.style.opacity = '1';
            }, 10);
          }, 300); // Match this with CSS transition duration
        }, 500);
      }
    }
  });
  