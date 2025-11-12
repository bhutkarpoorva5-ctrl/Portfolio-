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
$("#contact-form").submit(function (event) {
    emailjs.init("Szzd0Btz3bP7mxZNl");

    emailjs.sendForm('Poorva_mail123', 'template_v76go2a', '#contact-form')
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
            document.getElementById("contact-form").reset();
            alert("Form Submitted Successfully");
        }, function (error) {
            console.log('FAILED...', error);
            alert("Form Submission Failed! Try Again");
        });
    event.preventDefault();
});
