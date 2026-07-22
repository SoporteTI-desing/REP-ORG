// NOMAD GENETICS — Portal de Repositorios
// Aviso en consola si alguna tarjeta todavía tiene un enlace de marcador (placeholder) sin reemplazar.

document.addEventListener('DOMContentLoaded', () => {

  // --- Selector de tema (oscuro / claro) ---
  const root = document.documentElement;
  const themeButtons = document.querySelectorAll('.theme-toggle button');

  function applyTheme(theme){
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
    }
    themeButtons.forEach((btn) => {
      const isActive = btn.dataset.themeChoice === theme;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });
    try { localStorage.setItem('nomad-theme', theme); } catch (e) { /* almacenamiento no disponible */ }
  }

  const savedTheme = (() => {
    try { return localStorage.getItem('nomad-theme') || 'dark'; }
    catch (e) { return 'dark'; }
  })();

  applyTheme(savedTheme);

  themeButtons.forEach((btn) => {
    btn.addEventListener('click', () => applyTheme(btn.dataset.themeChoice));
  });

  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    const href = card.getAttribute('href') || '';
    const title = card.querySelector('h3')?.textContent?.trim();

    if (href.startsWith('ENLACE_REPOSITORIO')) {
      console.warn(`[NOMAD GENETICS] Falta reemplazar el enlace de: ${title}`);

      // Evita que el clic navegue a un enlace inválido mientras no se haya configurado
      card.addEventListener('click', (e) => {
        e.preventDefault();
        alert(`Este repositorio todavía no tiene un enlace configurado:\n${title}`);
      });
    }
  });
});