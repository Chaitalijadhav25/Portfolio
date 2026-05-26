const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('open');
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
  });
});

const certificates = [
  {
    title: 'Software Development Intern',
    issuer: 'SkillCraft Technology',
    year: '2025',
    pdfUrl: 'assets/Skillcraft.pdf'
  },
  {
    title: 'Java Programming',
    issuer: 'CodSoft',
    year: '2026',
    pdfUrl: 'assets/CodSoft.pdf'
  },
  {
    title: 'VS Code Dev Days',
    issuer: 'AI Research & Innovation Forum',
    year: '2025',
    pdfUrl: 'assets/vscode.png'
  },
  {
    title: 'Robotics Workshop',
    issuer: 'e-Yantra IIT Bombay & SVKMIOT ACM Student Chapter',
    year: '2025',
    pdfUrl: 'assets/e-yantra.png'
  },
  {
    title: 'Code-O-thon a national level Mega competition',
    issuer: 'ACES , ADAS , SVKMIOT ACM Student Chapter',
    year: '2026',
    pdfUrl: 'assets/code-o-thon.png'
  },
  {
    title: 'DSA Olympiad',
    issuer: 'ACES , SVKMIOT ACM Student Chapter',
    year: '2025',
    pdfUrl: 'assets/dsa-oly.png'
  }
];

const certificateGrid = document.getElementById('certificateGrid');
certificates.forEach((certificate) => {
  const card = document.createElement('article');
  card.className = 'certificate-card';

  const body = document.createElement('div');
  body.className = 'certificate-card-body';
  body.innerHTML = `
    <h3>${certificate.title}</h3>
    <p class="certificate-meta"><strong>Issuer:</strong> ${certificate.issuer}</p>
    <p class="certificate-meta"><strong>Year:</strong> ${certificate.year}</p>
  `;

  const viewButton = document.createElement('a');
  viewButton.className = 'btn btn-secondary';
  viewButton.href = certificate.pdfUrl;
  viewButton.target = '_blank';
  viewButton.rel = 'noreferrer';
  viewButton.textContent = 'View PDF';

  card.appendChild(body);
  card.appendChild(viewButton);
  certificateGrid.appendChild(card);
});

// Projects: provide GitHub links via JS and enable 'View on GitHub' button
const projectLinks = {
  project1: 'https://github.com/yourusername/your-repo'
};

const project1 = document.getElementById('project1');
if (project1) {
  const viewLink = project1.querySelector('.github-view');
  const link = projectLinks.project1 || '#';
  if (link && link !== '#') {
    viewLink.href = link;
    viewLink.classList.remove('disabled');
    viewLink.removeAttribute('aria-disabled');
  }
}

// Contact form: send email via Formspree (no configuration needed)
// Formspree handles all email sending automatically - no keys required!

function setupContactForm() {
  const contactForm = document.querySelector('.contact-form');
  if (!contactForm) return;

  // Set Formspree action (replace YOUR_FORM_ID with actual ID from formspree.io)
  contactForm.action = 'https://formspree.io/f/meedredw';
  contactForm.method = 'POST';

  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = contactForm.querySelector('input[name="name"]').value.trim();
    const email = contactForm.querySelector('input[name="email"]').value.trim();
    const message = contactForm.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(contactForm);
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        alert('Message sent successfully! I\'ll get back to you soon.');
        contactForm.reset();
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error. Please check your connection and try again.');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupContactForm);
} else {
  setupContactForm();
}
