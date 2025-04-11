// Get all cards
const cards = document.querySelectorAll('.card');

// Initialize progress values
const progressValues = {
  '掃除': 0,
  '皿洗い': 0,
  '風呂洗い': 0
};

// Function to update progress
function updateProgress(title, value) {
  const card = Array.from(cards).find(card => card.querySelector('.title').textContent === title);
  if (card) {
    const circle = card.querySelector('.circle');
    circle.style.setProperty('--progress', value);
    
    // Update color based on progress
    let color = '#f46060'; // default color
    if (value >= 75) color = '#00ff00';
    else if (value >= 50) color = '#ffff00';
    else if (value >= 25) color = '#ffa500';
    else if (value > 0) color = '#ff0000';
    
    circle.style.setProperty('--stroke-color', color);
  }
}

// Add click handlers to buttons
cards.forEach(card => {
  const button = card.querySelector('.btn--orange');
  const title = card.querySelector('.title').textContent;
  
  button.addEventListener('click', (e) => {
    e.preventDefault();
    progressValues[title] = 100;
    updateProgress(title, 100);
    
    // Here you would typically update Firebase
    // const taskRef = ref(database, `tasks/${title}`);
    // set(taskRef, { progress: 100 });
  });
});

// Initialize progress for all cards
Object.entries(progressValues).forEach(([title, value]) => {
  updateProgress(title, value);
});
