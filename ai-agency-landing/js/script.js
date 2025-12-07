// Basic helper
const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// Typing effect
const typingTexts = [
  "Building the Future... One Bot at a Time",
  "Automate. Scale. Delight.",
  "Smart AI. Real Results."
];
let typeIndex = 0, charIndex = 0;
const typedEl = document.getElementById('typed');
const cursorEl = document.querySelector('.cursor');

function typeLoop(){
  const full = typingTexts[typeIndex];
  if(charIndex <= full.length){
    typedEl.textContent = full.slice(0, charIndex);
    charIndex++;
    setTimeout(typeLoop, 40);
  } else {
    setTimeout(() => eraseLoop(), 1200);
  }
}
function eraseLoop(){
  const full = typingTexts[typeIndex];
  if(charIndex >= 0){
    typedEl.textContent = full.slice(0, charIndex);
    charIndex--;
    setTimeout(eraseLoop, 24);
  } else {
    typeIndex = (typeIndex + 1) % typingTexts.length;
    setTimeout(typeLoop, 200);
  }
}
typeLoop();

// Carousel logic
const carousel = document.getElementById('carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let autoScrollTimer = null;
const cardWidth = 260 + 16; // card width + gap

function scrollNext(){
  carousel.scrollBy({left: cardWidth, behavior: 'smooth'});
}
function scrollPrev(){
  carousel.scrollBy({left: -cardWidth, behavior: 'smooth'});
}
nextBtn.addEventListener('click', () => { scrollNext(); resetAutoScroll(); });
prevBtn.addEventListener('click', () => { scrollPrev(); resetAutoScroll(); });

// Auto-scroll
function startAutoScroll(){
  stopAutoScroll();
  autoScrollTimer = setInterval(() => {
    // if at end, go to start smoothly
    if (Math.abs(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth)) < 10) {
      carousel.scrollTo({left:0, behavior:'smooth'});
    } else {
      scrollNext();
    }
  }, 3000);
}
function stopAutoScroll(){
  if(autoScrollTimer) clearInterval(autoScrollTimer);
}
function resetAutoScroll(){
  stopAutoScroll();
  setTimeout(startAutoScroll, 2000);
}
startAutoScroll();

// Contact form logic (no page reload) -> show modal
const contactForm = document.getElementById('contactForm');
const modal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');
const modalOk = document.getElementById('modalOk');

contactForm.addEventListener('submit', function(e){
  e.preventDefault();
  // simple validation
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if(!name || !email || !message){
    alert('Please complete all fields.');
    return;
  }

  // simulate success (here you'd normally call fetch to your backend)
  modal.setAttribute('aria-hidden', 'false');
});

closeModal.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
modalOk.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));

// footer year
document.getElementById('year').textContent = new Date().getFullYear();

// scroll buttons
$('#scrollToServices').addEventListener('click', () => document.getElementById('services').scrollIntoView({behavior:'smooth'}));
$('#scrollToContact').addEventListener('click', () => document.getElementById('contact').scrollIntoView({behavior:'smooth'}));
$('#hireBtn').addEventListener('click', () => document.getElementById('contact').scrollIntoView({behavior:'smooth'}));

// Accessibility: close modal with escape
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') modal.setAttribute('aria-hidden', 'true');
});
