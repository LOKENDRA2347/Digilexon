  // ===== preloader =====
  (function(){
    const preloader = document.getElementById('preloader');
    if(!preloader) return;
    document.body.style.overflow = 'hidden';
    const fill = document.getElementById('preloaderFill');
    let progress = 0;
    const tick = setInterval(() => {
      progress += Math.random() * 22;
      if(progress > 90) progress = 90;
      if(fill) fill.style.width = progress + '%';
    }, 160);
    function finish(){
      clearInterval(tick);
      if(fill) fill.style.width = '100%';
      setTimeout(() => {
        preloader.classList.add('hide');
        document.body.style.overflow = '';
        setTimeout(() => preloader.remove(), 800);
      }, 260);
    }
    if(document.readyState === 'complete'){ finish(); }
    else { window.addEventListener('load', finish); }
    setTimeout(finish, 4000); // safety fallback
  })();

  // sticky header
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 30);
  });

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el => io.observe(el));

  // counters
  const counters = document.querySelectorAll('.counter');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        const el = e.target;
        const target = parseFloat(el.dataset.target);
        let cur = 0;
        const step = Math.max(target/60, 0.5);
        const tick = () => {
          cur += step;
          if(cur >= target){ el.textContent = target; }
          else { el.textContent = Math.floor(cur); requestAnimationFrame(tick); }
        };
        tick();
        counterIO.unobserve(el);
      }
    });
  }, {threshold:0.5});
  counters.forEach(c => counterIO.observe(c));

  // bar fills
  const bars = document.querySelectorAll('.bar-fill');
  const barIO = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.style.width = e.target.dataset.pct + '%';
        barIO.unobserve(e.target);
      }
    });
  }, {threshold:0.4});
  bars.forEach(b => barIO.observe(b));

  // faq accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => {
        o.classList.remove('open');
        o.querySelector('.faq-a').style.maxHeight = null;
      });
      if(!isOpen){
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // mobile burger (simple toggle for nav-links visibility)
  const burger = document.getElementById('burger');
  burger.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    const cta = document.querySelector('.nav-cta');
    const open = burger.classList.toggle('open');
    if(open){
      links.style.cssText = 'display:flex;flex-direction:column;position:fixed;top:70px;left:20px;right:20px;background:#101018;border:1px solid rgba(244,242,237,0.12);padding:24px;gap:20px;z-index:99;';
      cta.style.cssText = 'display:block;position:fixed;top:230px;left:20px;right:20px;text-align:center;z-index:99;';
    } else {
      links.style.cssText = '';
      cta.style.cssText = '';
    }
  });
  // ===== custom cursor =====
  const curDot = document.getElementById('curDot');
  const curRing = document.getElementById('curRing');
  let mx=0,my=0, rx=0, ry=0;
  window.addEventListener('mousemove', e => {
    mx=e.clientX; my=e.clientY;
    curDot.style.left = mx+'px'; curDot.style.top = my+'px';
  });
  (function ringLoop(){
    rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
    curRing.style.left = rx+'px'; curRing.style.top = ry+'px';
    requestAnimationFrame(ringLoop);
  })();
  document.querySelectorAll('a, button, .faq-q, .tilt').forEach(el => {
    el.addEventListener('mouseenter', () => curRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => curRing.classList.remove('hover'));
  });
  document.querySelectorAll('h1, h2').forEach(el => {
    el.addEventListener('mouseenter', () => curRing.classList.add('text-hover'));
    el.addEventListener('mouseleave', () => curRing.classList.remove('text-hover'));
  });

  // ===== particle field (hero) =====
  const canvas = document.getElementById('particleField');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let particles = [];
    let pmx = -9999, pmy = -9999;
    const heroEl = document.querySelector('.hero, .page-hero');

    function resizeCanvas(){
      canvas.width = heroEl.offsetWidth;
      canvas.height = heroEl.offsetHeight;
      const count = Math.min(90, Math.floor((canvas.width*canvas.height)/16000));
      particles = Array.from({length:count}, () => ({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        vx: (Math.random()-0.5)*0.25,
        vy: (Math.random()-0.5)*0.25,
        r: Math.random()*1.6+0.6
      }));
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    heroEl.addEventListener('mousemove', e => {
      const rect = heroEl.getBoundingClientRect();
      pmx = e.clientX - rect.left; pmy = e.clientY - rect.top;
    });
    heroEl.addEventListener('mouseleave', () => { pmx=-9999; pmy=-9999; });

    function drawParticles(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for(let i=0;i<particles.length;i++){
        const p = particles[i];
        // repel from cursor
        const dx = p.x-pmx, dy = p.y-pmy;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if(dist < 120){
          const force = (120-dist)/120;
          p.x += (dx/dist||0) * force * 2.2;
          p.y += (dy/dist||0) * force * 2.2;
        }
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0) p.x = canvas.width; if(p.x > canvas.width) p.x = 0;
        if(p.y < 0) p.y = canvas.height; if(p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = 'rgba(244,242,237,0.55)';
        ctx.fill();
      }
      // connecting lines
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a=particles[i], b=particles[j];
          const dx=a.x-b.x, dy=a.y-b.y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if(d < 110){
            ctx.beginPath();
            ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y);
            ctx.strokeStyle = 'rgba(255,77,46,'+(0.16*(1-d/110))+')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // ===== magnetic buttons =====
  document.querySelectorAll('.magnetic').forEach(wrap => {
    const el = wrap.querySelector('a, button') || wrap;
    wrap.addEventListener('mousemove', e => {
      const rect = wrap.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width/2;
      const relY = e.clientY - rect.top - rect.height/2;
      el.style.transform = `translate(${relX*0.35}px, ${relY*0.5}px)`;
    });
    wrap.addEventListener('mouseleave', () => { el.style.transform = 'translate(0,0)'; });
  });

  // ===== 3D tilt on cards =====
  document.querySelectorAll('.tilt').forEach(card => {
    card.style.position = card.style.position || 'relative';
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotX = (0.5 - py) * 8;
      const rotY = (px - 0.5) * 8;
      card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
      card.style.setProperty('--mx', (px*100)+'%');
      card.style.setProperty('--my', (py*100)+'%');
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(700px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });

  // ===== orb parallax on scroll + mouse =====
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth/2, cy = window.innerHeight/2;
    orbs.forEach(o => {
      const depth = parseFloat(o.dataset.depth) || 0.05;
      const dx = (e.clientX - cx) * depth;
      const dy = (e.clientY - cy) * depth;
      o.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  });

  // ===== headline scramble-in on load =====
  const headline = document.getElementById('heroHeadline');
  if(headline){
    const original = headline.innerHTML;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const plain = headline.textContent;
    let frame = 0;
    const totalFrames = 24;
    function scrambleStep(){
      frame++;
      const revealCount = Math.floor((frame/totalFrames) * plain.length);
      let out = '';
      for(let i=0;i<plain.length;i++){
        if(plain[i] === ' '){ out += ' '; continue; }
        if(i < revealCount) out += plain[i];
        else out += chars[Math.floor(Math.random()*chars.length)];
      }
      headline.textContent = out;
      if(frame < totalFrames){
        requestAnimationFrame(scrambleStep);
      } else {
        headline.innerHTML = original;
      }
    }
    requestAnimationFrame(scrambleStep);
  }

  // ===== active nav link =====
  (function(){
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
      const href = a.getAttribute('href');
      if(href === path || (path === '' && href === 'index.html')){
        a.classList.add('active');
      }
    });
  })();

  // ===== contact form (front-end only) =====
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const success = document.getElementById('formSuccess');
      success.classList.add('show');
      contactForm.reset();
    });
  }
