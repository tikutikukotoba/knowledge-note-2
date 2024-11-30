import mustache from 'mustache';
import html from '../templates/login.html?raw';

export const login = () => {
  const app = document.querySelector('#app');
  app.innerHTML = mustache.render(html);

  document
    .querySelector('#login-form')
    .addEventListener('submit', e => {
      e.preventDefault();
    });
};