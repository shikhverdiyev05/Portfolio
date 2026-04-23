$(function () {

  // --- Cursor Glow ---
  $(document).on('mousemove', function (e) {
    $('#cursor-glow').css({ left: e.clientX, top: e.clientY });
  });

  // --- Navbar Scroll ---
  $(window).on('scroll', function () {
    $('#navbar').toggleClass('scrolled', $(this).scrollTop() > 60);
  });

  // --- Hamburger ---
  $('#hamburger').on('click', function () {
    const menu = $('#mobile-menu');
    const willOpen = !menu.is(':visible');

    $(this).toggleClass('active', willOpen);
    $(this).attr('aria-expanded', willOpen);
    menu.stop(true, true).slideToggle(260);
  });

  // Close mobile menu
  $('#mobile-menu a').on('click', function () {
    $('#hamburger').removeClass('active').attr('aria-expanded', false);
    $('#mobile-menu').slideUp(300);
  });

  // Resize fix
  $(window).on('resize', function () {
    if (window.innerWidth >= 768) {
      $('#mobile-menu').hide();
      $('#hamburger').removeClass('active').attr('aria-expanded', false);
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
      charIndex--;
    } else {
      charIndex++;
    }

    typedEl.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(type, 1500);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(type, isDeleting ? 40 : 70);
  }

  type();

  // --- Reveal ---
  function reveal() {
    $('.reveal').each(function () {
      const top = this.getBoundingClientRect().top;
      if (top < window.innerHeight - 80) {
        $(this).addClass('visible');
      }
    });
  }

  $(window).on('scroll', reveal);
  reveal();

  // --- Skill Bars ---
  function animateBars() {
    $('.skill-bar-fill').each(function () {
      const el = $(this);
      const top = this.getBoundingClientRect().top;

      if (top < window.innerHeight - 50 && !el.hasClass('animated')) {
        el.addClass('animated');
        el.css('width', el.data('width') + '%');
      }
    });
  }

  $(window).on('scroll', animateBars);
  animateBars();

  // --- Counter Animation (FIXED) ---
  function animateCounters() {
    $('[data-count]').each(function () {
      const el = $(this);

      if (el.hasClass('counted')) return;

      const rect = this.getBoundingClientRect();

      // viewport check relaxed (daha stabil)
      if (rect.top < window.innerHeight) {
        el.addClass('counted');

        const target = parseInt(el.data('count')) || 0;

        $({ n: 0 }).animate({ n: target }, {
          duration: 1500,
          easing: 'swing',
          step: function () {
            el.text(Math.ceil(this.n) + '+');
          },
          complete: function () {
            el.text(target + '+');
          }
        });
      }
    });
  }

  $(window).on('scroll', animateCounters);

  // 🔥 CRITICAL FIX — load zamanı da işə düşsün
  $(window).on('load', function () {
    setTimeout(() => {
      animateCounters();
      animateBars();
      reveal();
    }, 200);
  });

  // --- Particles ---
  function createParticle() {
    const colors = ['#d946ef', '#7c3aed', '#3b82f6'];

    const p = $('<div class="particle"></div>').css({
      left: Math.random() * 100 + 'vw',
      background: colors[Math.floor(Math.random() * colors.length)],
      animationDuration: (8 + Math.random() * 8) + 's',
      animationDelay: (Math.random() * 5) + 's',
      width: Math.random() > 0.5 ? '2px' : '3px',
      height: Math.random() > 0.5 ? '2px' : '3px'
    });

    $('#particles').append(p);

    setTimeout(() => p.remove(), 15000);
  }

  setInterval(createParticle, 600);

  for (let i = 0; i < 8; i++) createParticle();

  // --- Contact Form ---
  $('#send-btn').on('click', function () {
    const btn = $(this);

    btn.html('<span class="flex items-center justify-center gap-2"><i class="fa-solid fa-spinner fa-spin text-xs"></i>Göndərilir...</span>');
    btn.prop('disabled', true);

    setTimeout(() => {
      btn.html('<span class="flex items-center justify-center gap-2"><i class="fa-solid fa-paper-plane text-xs"></i>Göndər</span>');
      btn.prop('disabled', false);

      $('#form-success').fadeIn(300);
      setTimeout(() => $('#form-success').fadeOut(300), 3000);
    }, 1400);
  });

  // --- Smooth Scroll ---
  $('a[href^="#"]').on('click', function (e) {
    const target = $(this.getAttribute('href'));

    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 80
      }, 600);
    }
  });

});