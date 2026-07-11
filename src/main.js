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
const subjectField = document.querySelector('[data-subject-field]');
const nextField = document.querySelector('[data-next-field]');
const messageField = document.querySelector('textarea[name="Meddelande"]');
const statusLine = document.querySelector('[data-form-status]');

const placeholders = {
  Bandet: 'Berätta om eventet, önskad speltid och eventuella låtönskemål...',
  'PA-hyra': 'Berätta vilken PA-lösning du vill hyra, datum, tider och transportbehov...',
  Merch: 'Merchen släpps snart. Skriv gärna om du är intresserad av T-shirt eller Coaster...',
};

intentTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const intent = tab.dataset.intent || 'Bandet';
    intentTabs.forEach((item) => item.classList.toggle('is-active', item === tab));
    if (intentField) intentField.value = intent;
    if (subjectField) subjectField.value = `Ny ${intent}-förfrågan till P.I.K`;
    if (messageField) messageField.placeholder = placeholders[intent] || placeholders.Bandet;
    if (statusLine) statusLine.textContent = `Förfrågan gäller: ${intent}. Vi svarar normalt inom 48 timmar.`;
  });
});

document.querySelector('a[href="#boka"].text-link')?.addEventListener('click', () => {
  const paTab = document.querySelector('[data-intent="PA-hyra"]');
  paTab?.dispatchEvent(new Event('click'));
});

const bookingForm = document.querySelector('[data-booking-form]');

if (new URLSearchParams(window.location.search).has('skickat') && statusLine) {
  statusLine.textContent = 'Tack! Din förfrågan är skickad.';
}

bookingForm?.addEventListener('submit', () => {
  if (nextField) {
    nextField.value = `${window.location.origin}${window.location.pathname}?skickat=1#boka`;
  }
  if (statusLine) statusLine.textContent = 'Skickar förfrågan...';
});
