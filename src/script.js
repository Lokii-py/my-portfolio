// This function types a given text into an element.
// It returns a "Promise" to let us know when it's finished.
function typeText(element, text, typingSpeed = 100) {
  return new Promise((resolve) => {
      let i = 0;
      element.innerHTML = ''; // Clear the element first

      const interval = setInterval(() => {
          if (i < text.length) {
              element.innerHTML += text.charAt(i);
              i++;
          } else {
              clearInterval(interval);
              resolve(); // Signal that typing is complete
          }
      }, typingSpeed);
  });
}

// A simple function to create a pause
function delay(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

// This is the main function that controls the animation sequence.
// `async` allows us to use `await` for cleaner, sequential code.
async function startAnimationSequence() {
  const line1 = document.getElementById('line-1');
  const line2 = document.getElementById('line-2');

  const textForLine1 = 'print("where is he?")';
  const textForLine2 = 'Either you find him solving a problem or playing with Arduino!';

  // An infinite loop to make the animation repeat
  while (true) {
      // Type the first line
      await typeText(line1, textForLine1, 80);

      // Wait a little, then type the second line
      await delay(500);
      await typeText(line2, textForLine2, 50);

      // Wait for a longer period before restarting
      await delay(4000);

      // Clear the lines to start over
      line1.innerHTML = '';
      line2.innerHTML = '';
      await delay(500);
  }
}

// Wait for the entire webpage to load before starting the animation.
document.addEventListener('DOMContentLoaded', startAnimationSequence);