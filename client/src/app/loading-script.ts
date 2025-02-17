export const loadingScript = `
  document.documentElement.classList.add('js');
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });
`; 