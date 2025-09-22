document.addEventListener('DOMContentLoaded', () => {
  const faqButtons = document.querySelectorAll('.faq-question');

  faqButtons.forEach(button => {
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      // Close all open
      faqButtons.forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.nextElementSibling.classList.remove('active');
      });

      // Open clicked if was closed
      if (!expanded) {
        button.setAttribute('aria-expanded', 'true');
        button.nextElementSibling.classList.add('active');
      }
    });
  });

  // Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

document.querySelectorAll('.flip-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});

const light = document.getElementById('cursor-light');
window.addEventListener('mousemove', e => {
  light.style.top = e.clientY + 'px';
  light.style.left = e.clientX + 'px';
});
window.addEventListener('load', () => {
  const bookcallSection = document.getElementById('bookcall');
  if (bookcallSection) {
    bookcallSection.scrollIntoView({ behavior: 'smooth' });
  }
});
