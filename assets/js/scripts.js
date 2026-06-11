  // AOS
  AOS.init({ once: true, duration: 600, easing: 'ease-out-cubic', offset: 60 });

  // Counter Animation
  function animateCount(el, target, suffix) {
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start) + (suffix || '');
    }, 16);
  }

  let counted = false;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && !counted) {
        counted = true;
        animateCount(document.getElementById('count-chapters'), 8, '');
        animateCount(document.getElementById('count-projects'), 6, '');
        animateCount(document.getElementById('count-tags'), 60, '+');
      }
    });
  }, { threshold: 0.3 });
  observer.observe(document.getElementById('home'));

  // Skill bar animation
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.getAttribute('data-width') + '%';
        });
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.glass-card').forEach(card => {
    if (card.querySelector('.skill-bar-fill')) barObserver.observe(card);
  });

  // Roadmap filter
  function filterPhase(phase, btn) {
    document.querySelectorAll('.phase-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    const items = document.querySelectorAll('.roadmap-item, .phase-label');
    items.forEach(item => {
      if (phase === 'all') {
        item.style.display = '';
      } else {
        if (item.classList.contains('phase-' + phase)) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      }
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
  