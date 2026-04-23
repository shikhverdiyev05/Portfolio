$(document).ready(function () {

    // --- Cursor Glow ---
    $(document).mousemove(function (e) {
      $('#cursor-glow').css({ left: e.clientX, top: e.clientY });
    });

    // --- Navbar Scroll ---
    $(window).scroll(function () {
      if ($(this).scrollTop() > 60) {
        $('#navbar').addClass('scrolled');
      } else {
        $('#navbar').removeClass('scrolled');
      }
    });

    // --- Hamburger ---
    $('#hamburger').click(function () {
      const menu = $('#mobile-menu');
      const willOpen = !menu.is(':visible');

      $(this).toggleClass('active', willOpen);
      $(this).attr('aria-expanded', willOpen ? 'true' : 'false');
      menu.stop(true, true).slideToggle(260);
    });

    // Close mobile menu on link click
    $('#mobile-menu a').click(function () {
      $('#hamburger').removeClass('active');
      $('#hamburger').attr('aria-expanded', 'false');
      $('#mobile-menu').slideUp(300);
    });

    // Keep desktop/mobile states consistent on resize
    $(window).on('resize', function () {
      if (window.innerWidth >= 768) {
        $('#mobile-menu').hide();
        $('#hamburger').removeClass('active').attr('aria-expanded', 'false');
      }
    });

    // --- Typed Effect ---
    const roles = ['Full-Stack Developer', '.NET MVC Expert', 'Clean Code Advocate', 'Cloud Architect'];
    let roleIndex = 0, charIndex = 0, isDeleting = false;
    const typedEl = document.getElementById('typed-text');

    function type() {
      if (!typedEl) return;
      const current = roles[roleIndex];
      if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; charIndex = 0; setTimeout(type, 400); return; }
      } else {
        typedEl.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) { isDeleting = true; setTimeout(type, 1800); return; }
      }
      setTimeout(type, isDeleting ? 50 : 80);
    }
    type();

    // --- Reveal on Scroll ---
    function reveal() {
      $('.reveal').each(function () {
        const top = $(this)[0].getBoundingClientRect().top;
        if (top < window.innerHeight - 80) {
          $(this).addClass('visible');
        }
      });
    }
    $(window).scroll(reveal);
    reveal();

    // --- Skill Bars ---
    function animateBars() {
      $('.skill-bar-fill').each(function () {
        const el = $(this);
        const top = el[0].getBoundingClientRect().top;
        if (top < window.innerHeight - 50 && !el.hasClass('animated')) {
          el.addClass('animated');
          el.css('width', el.data('width') + '%');
        }
      });
    }
    $(window).scroll(animateBars);
    animateBars();

    // --- Counter Animation ---
    function animateCounters() {
      $('[data-count]').each(function () {
        const el = $(this);
        const top = el[0].getBoundingClientRect().top;
        if (top < window.innerHeight - 50 && !el.hasClass('counted')) {
          el.addClass('counted');
          const target = parseInt(el.data('count'));
          $({ n: 0 }).animate({ n: target }, {
            duration: 1800,
            easing: 'swing',
            step: function () { el.text(Math.ceil(this.n) + '+'); },
            complete: function () { el.text(target + '+'); }
          });
        }
      });
    }
    $(window).scroll(animateCounters);
    animateCounters();

    // --- Particles ---
    function createParticle() {
      const colors = ['#d946ef', '#7c3aed', '#3b82f6'];
      const left = Math.random() * 100;
      const duration = 8 + Math.random() * 8;
      const delay = Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const p = $('<div class="particle"></div>').css({
        left: left + 'vw',
        background: color,
        animationDuration: duration + 's',
        animationDelay: delay + 's',
        width: Math.random() > 0.5 ? '2px' : '3px',
        height: Math.random() > 0.5 ? '2px' : '3px',
      });
      $('#particles').append(p);
      setTimeout(() => p.remove(), (duration + delay) * 1000);
    }
    setInterval(createParticle, 600);
    for (let i = 0; i < 8; i++) createParticle();

    // --- Contact Form ---
    $('#send-btn').click(function () {
      const btn = $(this);
      btn.html('<span class="flex items-center justify-center gap-2"><i class="fa-solid fa-spinner fa-spin text-xs"></i>Göndərilir...</span>');
      btn.prop('disabled', true);
      setTimeout(() => {
        btn.html('<span class="flex items-center justify-center gap-2"><i class="fa-solid fa-paper-plane text-xs"></i>Göndər</span>');
        btn.prop('disabled', false);
        $('#form-success').fadeIn(400);
        setTimeout(() => $('#form-success').fadeOut(400), 4000);
      }, 1600);
    });

    // --- Smooth scroll for nav links ---
    $('a[href^="#"]').on('click', function (e) {
      const target = $(this.getAttribute('href'));
      if (target.length) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700);
      }
    });

  });