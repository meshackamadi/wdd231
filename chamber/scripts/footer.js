// Dynamic Footer Dates
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedPara = document.getElementById('lastModified');
if (lastModifiedPara) {
  lastModifiedPara.textContent = `Last Modified: ${document.lastModified}`;
}