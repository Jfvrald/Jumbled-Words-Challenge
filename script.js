// Array of words with their corresponding hints
let words = [
  { word: "addition", hint: "The process of adding numbers" },
  { word: "meeting", hint: "Event in which people come together" },
  { word: "number", hint: "Math symbol used for counting" },
  { word: "exchange", hint: "The act of trading" },
  { word: "canvas", hint: "Piece of fabric for oil painting" },
  { word: "garden", hint: "Space for planting flower and plant" },
  { word: "position", hint: "Location of someone or something" },
  { word: "feather", hint: "Hair like outer covering of bird" },
  { word: "comfort", hint: "A pleasant feeling of relaxation" },
  { word: "tongue", hint: "The muscular organ of mouth" },
  { word: "expansion", hint: "The process of increase or grow" },
  { word: "country", hint: "A politically identified region" },
  { word: "group", hint: "A number of objects or persons" },
  { word: "taste", hint: "Ability of tongue to detect flavour" },
  { word: "store", hint: "Large shop where goods are traded" },
  { word: "field", hint: "Area of land for farming activities" },
  { word: "friend", hint: "Person other than a family member" },
  { word: "pocket", hint: "A bag for carrying small items" },
  { word: "needle", hint: "A thin and sharp metal pin" },
  { word: "expert", hint: "Person with extensive knowledge" },
  { word: "statement", hint: "A declaration of something" },
  { word: "second", hint: "One-sixtieth of a minute" },
  { word: "library", hint: "Place containing collection of books" },
  { word: "temperature", hint: "Measure of how hot or cold something is" },
  { word: "journey", hint: "The act of traveling from one place to another" },
  {
    word: "science",
    hint: "Systematic study of the physical and natural world",
  },
  { word: "frequency", hint: "The number of occurrences of a repeating event" },
  { word: "artist", hint: "A person who creates art" },
  { word: "concept", hint: "An abstract idea or general notion" },
  {
    word: "horizon",
    hint: "The line where the earth's surface and sky appear to meet",
  },
  { word: "safety", hint: "The condition of being protected from harm" },
  { word: "vehicle", hint: "A machine used for transporting people or goods" },
  { word: "emotion", hint: "A natural instinctive state of mind" },
  { word: "movement", hint: "The act of changing physical location" },
  { word: "tradition", hint: "A long-established custom or belief" },
  {
    word: "ocean",
    hint: "A vast body of salt water that covers most of the earth",
  },
  {
    word: "language",
    hint: "A system of communication used by a particular community",
  },
  {
    word: "mountain",
    hint: "A large natural elevation of the earth's surface",
  },
  {
    word: "culture",
    hint: "The social behavior and norms found in human societies",
  },
  {
    word: "balance",
    hint: "An even distribution of weight enabling someone or something to remain upright",
  },
  {
    word: "witness",
    hint: "A person who sees an event, typically a crime or accident",
  },
  {
    word: "strategy",
    hint: "A plan of action designed to achieve a long-term or overall goal",
  },
  { word: "device", hint: "A machine made for a particular purpose" },
  { word: "response", hint: "A reaction to something" },
  { word: "happiness", hint: "A state of well-being and contentment" },
  {
    word: "challenge",
    hint: "A call to take part in a contest or competition",
  },
];

const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word"),
  pointsDisplay = document.querySelector(".points b"), // For points display
  missedDisplay = document.querySelector(".missed b"), // For missed display
  resetBtn = document.querySelector(".reset-scoreboard"), // For reset button
  refreshCountDisplay = document.querySelector(".refresh-count b"); // For refresh count display

let correctWord, timer;
let points = 0, // Initialize points
  missedWords = 0, // Initialize missed words
  refreshCount = 0; // Initialize refresh click count

// Function to display custom alert messages
const showPopupMessage = (message) => {
  const popup = document.querySelector(".popup-message");
  const messageText = document.querySelector(".popup-message-text");
  messageText.innerText = message;
  popup.classList.add("show");

  // Hide the popup after 2 seconds
  setTimeout(() => {
    popup.classList.remove("show");
  }, 2000);
};

// Function to create letter spans for the word with typing animation
const displayWordWithTypingEffect = (word) => {
  wordText.innerHTML = ""; // Clear the existing word
  const letters = word.split(""); // Split the word into letters

  letters.forEach((letter) => {
    const span = document.createElement("span");
    span.innerText = letter; // Set the letter text
    wordText.appendChild(span); // Append the letter span to the word display
  });
};

// Function to shuffle the letters of a word with animation
const shuffleWord = (word) => {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
};

// Function to handle shuffling with a smooth transition
const shuffleWithAnimation = () => {
  const spans = wordText.querySelectorAll("span");
  const shuffledWord = shuffleWord(correctWord).split("");

  spans.forEach((span, index) => {
    // Animate the existing spans to create a typing effect
    setTimeout(() => {
      span.style.opacity = "0"; // Fade out current letters
      span.style.transform = "translateY(10px)"; // Move down
    }, index * 200); // Delay each letter fade out for typing effect

    // After all spans are animated, replace them with new shuffled letters
    setTimeout(() => {
      // Update the span with new shuffled letters
      span.innerText = shuffledWord[index];
      span.style.opacity = "1"; // Fade in the new letters
      span.style.transform = "translateY(0)"; // Move back to original position
    }, index * 200); // Start replacing after all current letters fade out
  });
};

// Function to initialize the timer
const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timeText.innerText = maxTime);
    }
    // If time runs out, increase missed words and update the scoreboard
    missedWords++;
    missedDisplay.innerText = missedWords; // Update missed words in scoreboard
    showPopupMessage(
      `Time off! ${correctWord.toUpperCase()} was the correct word`
    );
    initGame();
  }, 1000);
};

// Function to initialize the game
const initGame = () => {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  correctWord = randomObj.word.toLowerCase();
  displayWordWithTypingEffect(shuffleWord(correctWord)); // Display the shuffled word without typing effect
  hintText.innerText = randomObj.hint;
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
};

// Initialize the game
initGame();

// Set interval to shuffle the word every 5 seconds
setInterval(() => {
  if (timer) {
    // Check if the timer is running
    shuffleWithAnimation(); // Shuffle with animation
  }
}, 10000); // 10000 milliseconds = 10 seconds

// Function to check the user's input word
const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) return showPopupMessage("Please enter a word to check!");

  if (userWord !== correctWord) {
    missedWords++;
    missedDisplay.innerText = missedWords; // Update missed words in scoreboard
    showPopupMessage(`Oops! ${userWord} is not correct.`);
    shuffleWithAnimation(); // Shuffle the word after an incorrect guess
  } else {
    points++; // Increment points for a correct guess
    pointsDisplay.innerText = points; // Update points in scoreboard
    showPopupMessage(`Yay! ${userWord.toUpperCase()} is correct!`);
    initGame(); // Initialize the game for the next word
  }
};

// Refresh word button click event
refreshBtn.addEventListener("click", () => {
  refreshCount++; // Increment refresh count
  refreshCountDisplay.innerText = refreshCount; // Update refresh count display
  initGame(); // Initialize a new game
});

// Check word button click event
checkBtn.addEventListener("click", checkWord);

// Reset scoreboard button click event
resetBtn.addEventListener("click", () => {
  points = 0; // Reset points
  missedWords = 0; // Reset missed words
  refreshCount = 0; // Reset refresh count
  pointsDisplay.innerText = points; // Update points display
  missedDisplay.innerText = missedWords; // Update missed words display
  refreshCountDisplay.innerText = refreshCount; // Update refresh count display
  showPopupMessage("Scoreboard has been reset!");
});

// Handle input field on enter key press
inputField.addEventListener("keyup", (event) => {
  if (event.key === "Enter") checkWord();
});
