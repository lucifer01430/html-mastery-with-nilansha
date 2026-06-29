// CHAPTER -2 JS


  AOS.init({ once:true, duration:550, easing:'ease-out-cubic', offset:50 });

  /* Reading progress bar */
  window.addEventListener('scroll', () => {
    const doc = document.documentElement;
    const pct = Math.round(doc.scrollTop / (doc.scrollHeight - doc.clientHeight) * 100);
    document.getElementById('reading-bar').style.width = pct + '%';
    const sp = document.getElementById('sidebar-progress');
    if (sp) { sp.style.width = pct + '%'; document.getElementById('sidebar-pct').textContent = pct + '% read'; }
  });

  /* TOC active state */
  const tocLinks = document.querySelectorAll('.toc-link');
  const secIds = [...tocLinks].map(l => l.getAttribute('href').replace('#','')).filter(Boolean);
  const tocObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.toc-link[href="#${e.target.id}"]`);
        if (a) a.classList.add('active');
      }
    });
  }, { rootMargin:'-20% 0px -70% 0px' });
  secIds.forEach(id => { const el = document.getElementById(id); if (el) tocObs.observe(el); });

  /* Interview accordion chevron sync */
  document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const chevron = btn.querySelector('.iq-chevron');
      if (!chevron) return;
      setTimeout(() => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        if (expanded) { chevron.style.transform='rotate(180deg)'; chevron.style.color='var(--orange)'; }
        else { chevron.style.transform=''; chevron.style.color=''; }
      }, 50);
    });
  });

  /* Copy code button */
  function copyCode(btn) {
    const codeBody = btn.closest('.code-window').querySelector('.code-body');
    const lines = codeBody.querySelectorAll('div');
    let text = '';
    lines.forEach(line => {
      const spans = line.querySelectorAll('span:not(.c-ln)');
      spans.forEach(s => { text += s.textContent; });
      text += '\n';
    });
    // decode HTML entities
    const ta = document.createElement('textarea');
    ta.value = text.trim();
    document.body.appendChild(ta); ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 2000);
  }

  /* Checklist */
  let checkCount = 0;
  const totalChecks = 10;
  function toggleCheck(item) {
    const box = item.querySelector('.check-box');
    const label = item.querySelector('.check-label');
    const done = box.classList.contains('done');
    if (done) { box.classList.remove('done'); label.classList.remove('done'); checkCount = Math.max(0, checkCount - 1); }
    else { box.classList.add('done'); label.classList.add('done'); checkCount++; }
    const pct = (checkCount / totalChecks) * 100;
    document.getElementById('cl-fill').style.width = pct + '%';
    document.getElementById('cl-count').textContent = `${checkCount} / ${totalChecks} completed`;
    localStorage.setItem('html_ch2_checklist', checkCount);
  }

  /* Completion */
  function markComplete() {
    localStorage.setItem('html_chapter_2', 'completed');
    const btn = document.getElementById('btn-complete');
    btn.innerHTML = '<i class="fas fa-check"></i> Chapter 2 Completed!';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg, var(--green), #16a34a)';
    const msg = document.getElementById('completion-msg');
    msg.classList.add('show');
    msg.scrollIntoView({ behavior:'smooth', block:'center' });
  }

  /* Restore state */
  window.addEventListener('DOMContentLoaded', () => {
    // Check Ch1 status from localStorage
    if (localStorage.getItem('html_chapter_1') !== 'completed') {
      const ch1Card = document.getElementById('ch1-status');
      if (ch1Card) {
        ch1Card.style.background = 'rgba(255,255,255,.03)';
        ch1Card.style.borderColor = 'rgba(255,255,255,.06)';
        ch1Card.innerHTML = '<i class="fas fa-circle-check" style="color:var(--text-muted)"></i><div><div style="font-size:.8rem;font-weight:700;color:var(--text-muted);">Chapter 1 &mdash; Not Yet Completed</div><div style="font-size:.72rem;color:var(--text-muted);">Introduction to Web Development</div></div>';
      }
    }
    // Restore ch2 completion
    if (localStorage.getItem('html_chapter_2') === 'completed') {
      const btn = document.getElementById('btn-complete');
      if (btn) { btn.innerHTML = '<i class="fas fa-check"></i> Chapter 2 Completed!'; btn.disabled = true; btn.style.background = 'linear-gradient(135deg, var(--green), #16a34a)'; document.getElementById('completion-msg').classList.add('show'); }
    }
  });

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth' }); }
    });
  });
