const renderIcons = () => {
  window.lucide?.createIcons();
};

renderIcons();

const menuToggle = document.querySelector('[data-menu-toggle]');
const mobileNav = document.querySelector('[data-mobile-nav]');

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileNav?.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
  menuToggle.setAttribute('aria-label', isOpen ? 'Stäng meny' : 'Öppna meny');
  menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;
  renderIcons();
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Öppna meny');
    if (menuToggle) {
      menuToggle.innerHTML = '<i data-lucide="menu"></i>';
      renderIcons();
    }
  });
});

const intentTabs = document.querySelectorAll('[data-intent]');
const intentField = document.querySelector('[data-intent-field]');
const messageField = document.querySelector('textarea[name="message"]');
const statusLine = document.querySelector('[data-form-status]');

const placeholders = {
  Bandet: 'Berätta om eventet, önskad speltid och eventuella låtönskemål...',
  'PA-hyra': 'Berätta vilken PA-lösning du vill hyra, datum, tider och transportbehov...',
  Merch: 'Skriv vilka produkter, storlekar och antal du vill beställa...',
};

intentTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const intent = tab.dataset.intent || 'Bandet';
    intentTabs.forEach((item) => item.classList.toggle('is-active', item === tab));
    if (intentField) intentField.value = intent;
    if (messageField) messageField.placeholder = placeholders[intent] || placeholders.Bandet;
    if (statusLine) statusLine.textContent = `Förfrågan gäller: ${intent}. Vi svarar normalt inom 48 timmar.`;
  });
});

document.querySelectorAll('.merch-list a').forEach((link) => {
  link.addEventListener('click', () => {
    const merchTab = document.querySelector('[data-intent="Merch"]');
    merchTab?.dispatchEvent(new Event('click'));
  });
});

document.querySelector('a[href="#boka"].text-link')?.addEventListener('click', () => {
  const paTab = document.querySelector('[data-intent="PA-hyra"]');
  paTab?.dispatchEvent(new Event('click'));
});

const bookingForm = document.querySelector('[data-booking-form]');

bookingForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  const data = new FormData(bookingForm);
  const subject = `Förfrågan: ${data.get('intent') || 'Bandet'} - P.I.K`;
  const rows = [
    `Typ: ${data.get('intent') || ''}`,
    `Namn: ${data.get('name') || ''}`,
    `E-post: ${data.get('email') || ''}`,
    `Telefon: ${data.get('phone') || ''}`,
    `Datum: ${data.get('date') || ''}`,
    `Plats / stad: ${data.get('place') || ''}`,
    `Antal gäster: ${data.get('guests') || ''}`,
    '',
    'Meddelande:',
    data.get('message') || '',
  ];

  const mailto = new URL('mailto:boka@pannanikaklet.se');
  mailto.searchParams.set('subject', subject);
  mailto.searchParams.set('body', rows.join('\n'));

  if (statusLine) statusLine.textContent = 'Öppnar ditt e-postprogram med förfrågan ifylld.';
  window.location.href = mailto.toString();
});
