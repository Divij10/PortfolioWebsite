// Live clock for Tempe, AZ (Mountain Standard Time — AZ does not observe DST)
function updateClock() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', {
    timeZone: 'America/Phoenix',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
  const el = document.getElementById('clock');
  if (el) el.textContent = timeStr;
}

updateClock();
setInterval(updateClock, 1000);

// ── Contact panel: pin on click, unpin on outside click ──

const panel = document.querySelector('.contact-panel');

if (panel) {
  panel.addEventListener('click', () => {
    panel.classList.add('pinned');
  });

  document.addEventListener('click', (e) => {
    if (panel.classList.contains('pinned') && !panel.contains(e.target)) {
      panel.classList.remove('pinned');
    }
  });
}

// "Contact" nav link expands and pins the panel instead of scrolling
const contactNavLink = document.querySelector('.nav-link[href="#contact"]');
if (contactNavLink && panel) {
  contactNavLink.addEventListener('click', (e) => {
    e.preventDefault();
    panel.classList.add('pinned');
  });
}

// ── Active nav highlight on scroll ──

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -50% 0px' }
);

sections.forEach((section) => observer.observe(section));

// ── Responsive iframe preview scaling ──
// Renders at 1280×720 internally, scales to fill the actual column width.
function scaleIframePreviews() {
  document.querySelectorAll('.preview-viewport').forEach(function (vp) {
    var iframe = vp.querySelector('.detail-preview');
    if (!iframe) return;
    var scale = vp.clientWidth / 1280;
    iframe.style.transform = 'scale(' + scale + ')';
    vp.style.height = Math.round(720 * scale) + 'px';
  });
}

scaleIframePreviews();
window.addEventListener('resize', scaleIframePreviews);
