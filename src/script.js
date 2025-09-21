// This function is the "actor" in our animation. It can type any text into any element.
// It's wrapped in a "Promise" so that it can tell us when it's finished typing.
function typeText(element, text, typingSpeed = 100) {
    // A Promise is a modern JavaScript feature for handling asynchronous operations.
    // We return it immediately, and it will notify the caller when the typing is done.
    return new Promise((resolve) => {
      let i = 0; // A counter for the current character index.

      // We use setInterval to run a function repeatedly every `typingSpeed` milliseconds.
        const interval = setInterval(() => {
        // If we haven't typed all the characters yet...
            if (i < text.length) {
            // Add the next character to the element's content.
            // The 'innerHTML' property is what the user sees on the screen.
                element.innerHTML += text.charAt(i);
            i++; // Move to the next character.
            } else {
            // If we've reached the end of the text...
            clearInterval(interval); // Stop the setInterval from running anymore.
            resolve(); // Fulfill the Promise, signaling that this typing task is complete.
            }
        }, typingSpeed);
    });
}

  // A simple utility function to create a pause in our animation sequence.
  // Like typeText, it uses a Promise to let the async function know when the pause is over.
function delay(duration) {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
    }

  // This is the "director" of our animation. It controls the sequence of events.
  // The `async` keyword is what allows us to use `await` inside it.
async function startAnimationSequence() {
    // First, we get a reference to the HTML elements where we'll be typing.
    // The script needs to be able to find these IDs in your index.html file.
    const line1 = document.getElementById('line-1');
    const line2 = document.getElementById('line-2');

    // We wrap the entire sequence in an infinite loop so it repeats.
    while (true) {
      // --- SEQUENCE 1: Introduce yourself ---

      // The `await` keyword tells the code to PAUSE here and wait for the typeText Promise to resolve
      // before moving on to the next line. This is how we create a sequence.
    await typeText(line1, 'print("Developer Name: \n")');
    await typeText(line2, 'Lokesh Das');

      // Wait for 2 seconds before clearing the text.
    await delay(2000);

      // Clear the content of the elements for the next part of the animation.
    line1.innerHTML = '';
    line2.innerHTML = '';

      // A small delay before the next sequence starts.
    await delay(500);

      // --- SEQUENCE 2: What you do ---

    await typeText(line1, 'print("where is he?")');
      // You can replace this with any text you like.
    await typeText(line2, 'Either you find him solving problem or playing with Arduino!');

    await delay(2000);

    line1.innerHTML = '';
    line2.innerHTML = '';
    
    await delay(500);
    }
}

  // This is the final step that kicks everything off.
  // We add an event listener that waits for the entire HTML page to be loaded
  // before it tries to find the elements and start the animation.
document.addEventListener('DOMContentLoaded', startAnimationSequence);


