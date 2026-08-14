/* Legacy Group Title — interactions */
(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.nav__burger');
  var menu = document.querySelector('.mobile-menu');

  /* ---- Sticky / transparent nav ------------------------------------- */
  // Any dark banner at the top (full hero or shorter sub-hero) keeps the nav
  // light until the user scrolls past it.
  var banner = document.querySelector('.hero, .subhero');
  function threshold() {
    return banner ? banner.offsetHeight - 90 : 0;
  }
  function onScroll() {
    if (!nav) return;
    var y = window.scrollY;
    nav.classList.toggle('scrolled', y > 24);
    if (banner) nav.classList.toggle('at-top', y < threshold());
  }
  if (nav && !banner) nav.classList.add('light-top');
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu -------------------------------------------------- */
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- Scroll reveal ------------------------------------------------ */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Hero parallax ------------------------------------------------ */
  var heroImg = document.querySelector('.hero__bg img');
  if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var y = window.scrollY;
          if (y < window.innerHeight) heroImg.style.transform = 'translateY(' + (y * 0.18) + 'px) scale(1.05)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---- Card pointer tilt / glow ------------------------------------- */
  if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('[data-tilt]').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'translateY(-8px) perspective(900px) rotateX(' + (-py * 4) + 'deg) rotateY(' + (px * 4) + 'deg)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  }

  /* ---- Accordions --------------------------------------------------- */
  document.querySelectorAll('.acc__head').forEach(function (head) {
    head.addEventListener('click', function () {
      var item = head.closest('.acc__item');
      var body = item.querySelector('.acc__body');
      var open = item.classList.toggle('open');
      body.style.maxHeight = open ? body.scrollHeight + 'px' : 0;
    });
  });

  /* ---- Title insurance estimate calculator -------------------------- */
  var calc = document.getElementById('calc');
  if (calc) {
    var priceEl = document.getElementById('calc-price');
    var loanEl = document.getElementById('calc-loan');
    var amountEl = document.getElementById('calc-amount');
    var rangeEl = document.getElementById('calc-range');
    var seg = calc.querySelectorAll('.seg button');
    var mode = 'both'; // owner | lender | both

    function fmt(n) {
      return '$' + Math.round(n).toLocaleString('en-US');
    }
    function calcEstimate() {
      var price = parseFloat(priceEl.value) || 0;
      var loan = parseFloat(loanEl.value);
      if (isNaN(loan) || loan <= 0) loan = price * 0.8;
      // Industry rule of thumb: combined owner+lender ≈ 0.5%–1.0% of price (ALTA).
      var base = mode === 'lender' ? loan : price;
      var low, high;
      if (mode === 'both')      { low = price * 0.005;  high = price * 0.010; }
      else if (mode === 'owner'){ low = price * 0.004;  high = price * 0.007; }
      else                      { low = loan * 0.003;   high = loan * 0.005; }
      var mid = (low + high) / 2;
      amountEl.innerHTML = '<b>' + fmt(mid) + '</b>';
      rangeEl.textContent = 'Estimated range ' + fmt(low) + ' – ' + fmt(high);
    }
    priceEl.addEventListener('input', calcEstimate);
    loanEl.addEventListener('input', calcEstimate);
    seg.forEach(function (b) {
      b.addEventListener('click', function () {
        seg.forEach(function (x) { x.classList.remove('on'); });
        b.classList.add('on');
        mode = b.dataset.mode;
        loanEl.closest('.field').style.display = (mode === 'owner') ? 'none' : '';
        calcEstimate();
      });
    });
    calcEstimate();
  }

  /* ---- Footer year -------------------------------------------------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
