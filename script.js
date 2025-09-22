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
const statsSection = document.querySelector('.stats-section');
const statItems = document.querySelectorAll('.stat-item');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const sectionTop = statsSection.offsetTop;
  const sectionHeight = statsSection.offsetHeight;
  const windowHeight = window.innerHeight;

  // Start parallax when you are near above the section and continue till end
  // Adjust startOffset (e.g. 300px before section)
  const startOffset = sectionTop - windowHeight + 300; 

  if (scrollTop > startOffset && scrollTop < sectionTop + sectionHeight) {
    const offset = scrollTop - startOffset;
    const maxTranslate = 50; // max translation in px to limit movement

    statItems.forEach((item, index) => {
      // Calculate movement proportional to offset, limited by maxTranslate
      let translateY = Math.min(offset * 0.2 * (index + 1), maxTranslate);
      item.style.transform = `translateY(${translateY}px)`;
    });
  } else if (scrollTop <= startOffset) {
    // Reset position if before start offset
    statItems.forEach(item => item.style.transform = 'translateY(0)');
  } else {
    // Fix position at maxTranslate when past section bottom
    statItems.forEach((item, index) => {
      let translateY = 50 * (index + 1);
      item.style.transform = `translateY(${translateY}px)`;
    });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('qualificationForm');
  const messageEl = document.getElementById('formMessage');
  const bookCallSection = document.querySelector('.book-call-section');
  const bookCallBtnContainer = document.querySelector('.book-call-button-container');

  // Initially hide both booking section and button
  bookCallSection.style.display = 'none';
  bookCallBtnContainer.style.display = 'none';

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const budget = parseInt(this.budget.value, 10);
    const timeline = parseInt(this.timeline.value, 10);

    messageEl.textContent = '';

    if (budget >= 5000 && timeline <= 6) {
      // POST to SheetDB API
      fetch('https://sheetdb.io/api/v1/kvo3qzcsddpn5', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: name,
          Email: email,
          Budget: budget,
          Timeline: timeline
        }),
      })
      .then(() => {
        messageEl.textContent = "You are qualified! You can now book a free strategy call.";
        messageEl.style.color = "#d4af37";
        bookCallSection.style.display = 'block';      // Show Calendly booking section
        bookCallBtnContainer.style.display = 'block'; // Show Book a Call button
        bookCallBtnContainer.scrollIntoView({ behavior: 'smooth' });
      })
      .catch(() => {
        messageEl.textContent = "Error saving your data. Please try again.";
        messageEl.style.color = "#ff4c4c";
        bookCallSection.style.display = 'none';
        bookCallBtnContainer.style.display = 'none';
      });

    } else {
      messageEl.textContent = "Sorry, you currently do not meet our qualification criteria.";
      messageEl.style.color = "#ff4c4c";
      bookCallSection.style.display = 'none';
      bookCallBtnContainer.style.display = 'none';
    }
  });
});




