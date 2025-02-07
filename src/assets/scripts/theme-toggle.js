const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Set the new theme to the root element
  document.documentElement.setAttribute('data-theme', newTheme);

  // Store the theme preference in localStorage
  localStorage.setItem('theme', newTheme);

  // Update the button icon
  document.getElementById('theme-toggle').textContent = newTheme === 'dark' ? '🌙' : '🌞';
};

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.getElementById('theme-toggle').textContent = savedTheme === 'dark' ? '🌙' : '🌞';
} else {
  // Default to light theme if no preference is saved
  document.documentElement.setAttribute('data-theme', 'light');
  document.getElementById('theme-toggle').textContent = '🌞';
}

// Add event listener for the theme toggle button
document.getElementById('theme-toggle').addEventListener('click', toggleTheme);