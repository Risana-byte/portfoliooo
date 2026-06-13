/* ========================================================= 
   PORTFOLIO ARCHITECTURE CORE RUNTIME LOGIC 
   ========================================================= */ 

document.addEventListener("DOMContentLoaded", () => { 
  
  // --- 1. LIGHT / DARK MODE TOGGLE INTERACTION --- 
  const themeToggle = document.querySelector('#theme-toggle'); 
  if (themeToggle) { 
    themeToggle.addEventListener('click', () => { 
      document.body.classList.toggle('dark'); 
      const isDark = document.body.classList.contains('dark'); 
      themeToggle.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19'; 
    }); 
  } 

  // --- 2. BACK-TO-TOP ROUTINE DISPLAY LISTENER --- 
  const toTopButton = document.querySelector('#to-top'); 
  if (toTopButton) { 
    window.addEventListener('scroll', () => { 
      if (window.scrollY > 400) { 
        toTopButton.classList.add('show'); 
      } else { 
        toTopButton.classList.remove('show'); 
      } 
    }, { passive: true }); 

    toTopButton.addEventListener('click', () => { 
      window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }); 
  } 

  // --- 3. REBUILT DYNAMIC FILTER ENGINE (+400 XP) --- 
  const filterButtons = document.querySelectorAll('.filter-btn'); 
  const projectCards = document.querySelectorAll('#projects-container .card'); 
  const projectCounter = document.querySelector('#project-counter'); 

  function processProjectFilter(activeFilter) { 
    let activeSelectionCount = 0; 

    projectCards.forEach(card => { 
      const targetCategory = card.getAttribute('data-category'); 

      if (activeFilter === 'all' || targetCategory === activeFilter) { 
        // 1. Instantly clear structural layout block blockages 
        card.classList.remove('card-hidden'); 
        
        // 2. Trigger micro-delay so browser catches transition style pipelines safely 
        setTimeout(() => { 
          card.classList.add('render-active'); 
        }, 30); 
        
        activeSelectionCount++; 
      } else { 
        // Fade down and completely clear unmatched nodes 
        card.classList.remove('render-active'); 
        card.classList.add('card-hidden'); 
      } 
    }); 

    // Sync metrics counters seamlessly 
    if (projectCounter) { 
      if (activeFilter === 'all') { 
        projectCounter.textContent = `Showing all projects (${activeSelectionCount})`; 
      } else { 
        const formattedLabel = activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1); 
        projectCounter.textContent = `Showing ${formattedLabel} (${activeSelectionCount})`; 
      } 
    } 
  } 

  // Attach event execution streams to filter button controls 
  filterButtons.forEach(button => { 
    button.addEventListener('click', (event) => { 
      filterButtons.forEach(btn => btn.classList.remove('active')); 
      event.target.classList.add('active'); 

      const designatedFilterKey = event.target.getAttribute('data-filter'); 
      processProjectFilter(designatedFilterKey); 
    }); 
  }); 

  // Force first render cycle activation immediately across the active grid layout 
  processProjectFilter('all'); 
});
document.addEventListener("DOMContentLoaded", function() {
  const grid = document.getElementById("projects-container");

  // Grab the JSON file created by the Python script
  fetch("projects.json")
    .then(res => res.json())
    .then(projects => {
      // Clear out any placeholder HTML design cards first
      grid.innerHTML = ""; 
      
      // Generate standard design cards for each project
      projects.forEach(project => {
        const card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-category", project.category);
        
        card.innerHTML = `
          <span class="tag">${project.category} Category</span>
          <h3>${project.title}</h3>
          <p>${project.description}</p>
          <div class="chips">
            <span class="chip">${project.tech}</span>
          </div>
          <a href="${project.link}" target="_blank" class="card-link">View Project ↗</a>
        `;
        
        grid.appendChild(card);
      });
    })
    .catch(err => console.log("Run the Python script locally first to generate the file:", err));
});