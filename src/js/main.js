// Import all of Bootstrap's JS
var bootstrap = require('bootstrap');


// track active toc
document.addEventListener("DOMContentLoaded", function () {
    const tocLinks = document.querySelectorAll("nav.toc a");
    const sections = document.querySelectorAll("article h2"); // Adjust if using different heading levels
  
    function onScroll() {
      let currentActive = null;
  
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {
          currentActive = section;
        }
      });
  
      tocLinks.forEach(link => {
        link.classList.remove("toc-active");
        if (currentActive && link.getAttribute("href").substring(1) === currentActive.id) {
          link.classList.add("toc-active");
        }
      });
    }
  
    document.addEventListener("scroll", onScroll);
    onScroll(); // Initialize on load
  });