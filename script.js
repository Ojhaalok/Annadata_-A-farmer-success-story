/**
 * Script to automatically set the current year in the footer.
 * Also includes logic for an auto-rotating hero image slideshow.
 */

// --- Footer Year ---
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// --- Hero Slideshow ---
let slideIndex = 0; // Starts at 0, will be incremented to 1 immediately
let slides = []; // Stores the image elements

function showSlides() {
    // 1. Initialize slides array the first time the function runs
    if (slides.length === 0) {
        slides = document.getElementsByClassName("hero-slide");
        if (slides.length === 0) {
            // Log an error if the slides aren't found, but don't stop the rest of the script
            console.error("Slideshow Error: Could not find any elements with class 'hero-slide'.");
            return;
        }
    }

    // 2. Hide all slides (set their opacity to 0)
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0"; 
    }

    // 3. Increment the slide index
    slideIndex++;

    // 4. Check if we've passed the last slide, and if so, loop back to the first one (index 1)
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    // 5. Show the current slide (using slideIndex - 1 because arrays are 0-indexed)
    slides[slideIndex - 1].style.opacity = "1";

    // 6. Set a timeout to call the function again after 5 seconds (5000 milliseconds)
    setTimeout(showSlides, 5000);
}


// Wait for the entire page (DOM) to load before running the script
document.addEventListener('DOMContentLoaded', () => {
    // Start the slideshow when the page is ready
    showSlides(); 
    
    // Smooth fade-in animation for method cards (kept your existing logic)
    const methodCards = document.querySelectorAll('.method-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing once it's shown for better performance
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.2 });

    methodCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
