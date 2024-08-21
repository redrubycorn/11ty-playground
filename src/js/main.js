// Import all of Bootstrap's JS
var bootstrap = require('bootstrap');


// track active toc
document.addEventListener("DOMContentLoaded", function () {
    // Select all the ToC links
    const tocLinks = document.querySelectorAll("nav.toc a");
  
    // Select all the headings in the article
    const sections = document.querySelectorAll("article h2"); // Adjust if using different heading levels
  
    // Function to handle scrolling
    function onScroll() {
      let currentActiveIndex = -1;
  
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        
        // Check if the top of the section is above the middle of the viewport
        if (rect.top <= window.innerHeight / 2) {
          currentActiveIndex = index;
        }
      });
  
      // Remove the active class from all links
      tocLinks.forEach(link => link.classList.remove("toc-active"));
  
      // Add the active class to the currently active link
      if (currentActiveIndex !== -1) {
        tocLinks[currentActiveIndex].classList.add("toc-active");
      }
    }
  
    // Attach the onScroll function to the scroll event
    document.addEventListener("scroll", onScroll);
  
    // Initialize on load to highlight the correct link if the page is loaded with a section in view
    onScroll();
  });


  // copy the page link when btn is clicked
  document.getElementById('copy-link-btn').addEventListener('click', function() {
    const pageUrl = window.location.href;
    navigator.clipboard.writeText(pageUrl).then(function() {
        // Show confirmation message
        const message = document.getElementById('copy-message');
        message.style.display = 'inline';
        
        // Hide the confirmation message after 2 seconds
        setTimeout(() => {
            message.style.display = 'none';
        }, 500);
    }).catch(function(error) {
        console.error('Could not copy text: ', error);
    });
});