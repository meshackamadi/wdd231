// Set current year dynamically
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// Set last modified date
const lastModifiedPara = document.getElementById('lastModified');
if (lastModifiedPara) {
  const lastModified = document.lastModified;
  const date = new Date(lastModified);
  
  // Format: MM/DD/YYYY HH:MM:SS
  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  
  lastModifiedPara.textContent = `Last Modification: ${formattedDate}`;
}