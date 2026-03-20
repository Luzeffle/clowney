"use client";

import { useEffect } from "react";

export default function TabTypewriter() {
  useEffect(() => {
    const prefix = "@";
    const word = "Clowney";
    let currentIndex = 0;
    let isDeleting = false;

    const interval = setInterval(() => {
      // 1. Update the document title (Prefix + whatever portion of the word is currently typed)
      document.title = prefix + word.substring(0, currentIndex);

      // 2. Logic for typing and deleting
      if (!isDeleting) {
        currentIndex++;
        // If the word is fully typed, pause, then start deleting
        if (currentIndex > word.length) {
          isDeleting = true;
          clearInterval(interval);
          setTimeout(startAnimation, 2000); // Pause for 2 seconds when fully spelled out
          return;
        }
      } else {
        currentIndex--;
        // If fully deleted (back to just the @), pause, then type again
        if (currentIndex === 0) {
          isDeleting = false;
          clearInterval(interval);
          setTimeout(startAnimation, 500); // Short pause before re-typing
          return;
        }
      }
    }, 250); // Typing speed in milliseconds

    // Wrapper to handle the pausing/restarting
    function startAnimation() {
      setInterval(intervalLogic, 250);
    }
    
    // We separate the logic so we can call it from the timeouts
    function intervalLogic() {
      document.title = prefix + word.substring(0, currentIndex);
      if (!isDeleting) {
        currentIndex++;
        if (currentIndex > word.length) {
          isDeleting = true;
        }
      } else {
        currentIndex--;
        if (currentIndex === 0) {
          isDeleting = false;
        }
      }
    }

    // Cleanup function when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return null; // This component is invisible!
}