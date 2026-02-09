document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const tabNav = document.querySelector('.tab-nav');

  function switchTab(tabId) {
    tabButtons.forEach((btn) => btn.classList.remove('active'));
    tabPanels.forEach((panel) => panel.classList.remove('active'));

    const activeBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
    const activePanel = document.getElementById(tabId);

    if (activeBtn) activeBtn.classList.add('active');
    if (activePanel) activePanel.classList.add('active');

    // Close mobile menu after selection
    if (tabNav) tabNav.classList.remove('open');

    // Update URL hash without scrolling
    history.replaceState(null, null, `#${tabId}`);
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Mobile menu toggle
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      tabNav.classList.toggle('open');
    });
  }

  // Handle hash on page load
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById(hash)) {
    switchTab(hash);
  }

  // Handle browser back/forward
  window.addEventListener('hashchange', () => {
    const newHash = window.location.hash.replace('#', '');
    if (newHash && document.getElementById(newHash)) {
      switchTab(newHash);
    }
  });
});
