(function () {
  const menuButton = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.nav-links');

  if (menuButton && navLinks) {
    const closeMenu = function () {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      document.body.classList.remove('menu-open');
    };

    menuButton.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      document.body.classList.toggle('menu-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && navLinks.classList.contains('open')) {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  document.querySelectorAll('.faq-question').forEach(function (button) {
    button.addEventListener('click', function () {
      const answer = document.getElementById(button.getAttribute('aria-controls'));
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!isOpen));
      if (answer) answer.classList.toggle('open', !isOpen);
    });
  });

  document.querySelectorAll('[data-year]').forEach(function (node) {
    node.textContent = String(new Date().getFullYear());
  });

  const advocateForm = document.querySelector('[data-advocate-question-form]');
  if (advocateForm) {
    const summary = advocateForm.querySelector('#question-summary');
    const count = advocateForm.querySelector('#summary-count');
    const status = advocateForm.querySelector('[data-form-status]');

    const updateCount = function () {
      if (summary && count) count.textContent = summary.value.length + '/600';
    };

    if (summary) {
      summary.addEventListener('input', updateCount);
      updateCount();
    }

    advocateForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!advocateForm.reportValidity()) return;

      const data = new FormData(advocateForm);
      const message = [
        'Hi NyaySetu, I want to request consultation coordination with an independent advocate.',
        '',
        'Category: ' + data.get('category'),
        'Preferred language: ' + data.get('language'),
        'Known timing: ' + data.get('urgency'),
        'Question summary: ' + String(data.get('summary')).trim(),
        '',
        'I understand this is NyaySetu intake, not emergency assistance or a confirmed advocate-client relationship. Please share availability, scope, professional details and price before any booking.'
      ].join('\n');

      if (status) status.textContent = 'Opening WhatsApp. Review the message before you send it.';
      const destination = 'https://wa.me/917020030080?text=' + encodeURIComponent(message);
      window.location.assign(destination);
    });
  }
}());
