
  AOS.init({ once: true, duration: 550, easing: 'ease-out-cubic', offset: 50 });

  /* === READING PROGRESS BAR === */
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const scrolled = doc.scrollTop / (doc.scrollHeight - doc.clientHeight);
    const pct = Math.round(scrolled * 100);
    document.getElementById('reading-bar').style.width = pct + '%';
    if (document.getElementById('sidebar-progress')) {
      document.getElementById('sidebar-progress').style.width = pct + '%';
      document.getElementById('sidebar-pct').textContent = pct + '% read';
    }
  });

  /* === TOC ACTIVE === */
  const tocLinks = document.querySelectorAll('.toc-link');
  const sections = document.querySelectorAll('[id]');
  const tocObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach(s => tocObserver.observe(s));

  /* === INTERVIEW Q TOGGLE === */
  function toggleIQ(el) {
    const ans = el.nextElementSibling;
    const toggle = el.querySelector('.iq-toggle');
    ans.classList.toggle('open');
    toggle.classList.toggle('rotated');
  }

  /* === CHECKLIST === */
  let checkCount = 0;
  const totalChecks = 10;
  function toggleCheck(item) {
    const box = item.querySelector('.check-box');
    const label = item.querySelector('.check-label');
    const isDone = box.classList.contains('done');
    if (isDone) {
      box.classList.remove('done');
      label.classList.remove('done');
      checkCount = Math.max(0, checkCount - 1);
    } else {
      box.classList.add('done');
      label.classList.add('done');
      checkCount++;
    }
    const pct = (checkCount / totalChecks) * 100;
    document.getElementById('checklist-fill').style.width = pct + '%';
    document.getElementById('checklist-count').textContent = `${checkCount} / ${totalChecks} completed`;
    localStorage.setItem('html_ch1_checklist', checkCount);
  }

  /* === CHAPTER COMPLETION === */
  function markComplete() {
    localStorage.setItem('html_chapter_1', 'completed');
    const btn = document.getElementById('btn-complete');
    btn.innerHTML = '<i class="fas fa-check"></i> Chapter 1 Completed!';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg, var(--green), #16a34a)';
    const msg = document.getElementById('completion-msg');
    msg.classList.add('show');
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  /* === UNDO COMPLETION === */
  function undoComplete() {
    localStorage.removeItem('html_chapter_1');
    const btn = document.getElementById('btn-complete');
    if (btn) {
      btn.innerHTML = '<i class="fas fa-trophy"></i> Mark Chapter 1 as Complete';
      btn.disabled = false;
      btn.style.background = '';
    }
    const msg = document.getElementById('completion-msg');
    if (msg) {
      msg.classList.remove('show');
    }
  }

  /* === RESTORE STATE === */
  window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('html_chapter_1') === 'completed') {
      const btn = document.getElementById('btn-complete');
      if (btn) {
        btn.innerHTML = '<i class="fas fa-check"></i> Chapter 1 Completed!';
        btn.disabled = true;
        btn.style.background = 'linear-gradient(135deg, var(--green), #16a34a)';
        document.getElementById('completion-msg').classList.add('show');
      }
    }
  });

  /* === SMOOTH SCROLL === */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });
