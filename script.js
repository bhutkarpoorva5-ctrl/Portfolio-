// Update footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll with fade and slide animations
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
revealElements.forEach(el => observer.observe(el));

// Smooth scroll behavior for all links with href starting with #
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Animated text effect
const animatedText = document.getElementById('animated-text');
const words = ['IT Graduate', 'UX/UI Enthusiast', 'Front-end Developer', 'Creative Designer', 'Problem Solver'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    animatedText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    animatedText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => isDeleting = true, 1000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const typingSpeed = isDeleting ? 100 : 150;
  setTimeout(typeWriter, typingSpeed);
}

typeWriter();

// EMAILJS Integration
(function() {
  emailjs.init("YLoBA_tRSGlo74E_at"); // Replace with your EmailJS Public Key
})();

document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();

  emailjs.send("service_6itsebc", "template_v76go2a", {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value
  })
  .then(() => {
    alert("Message sent successfully!");
    document.getElementById("contact-form").reset();
  }, (error) => {
    alert("Failed to send message. Please try again later.");
    console.error(error);
  });
});
