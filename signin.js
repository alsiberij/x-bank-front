
window.onload = function () {
const form = document.getElementById('signInForm');
const errorMessage = document.getElementById('error-message');

document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const login = document.getElementById('login').value.trim();
  const password = document.getElementById('password').value.trim();

    if (login === '' || password === '' ) {
    alert('Пожалуйста, заполните все поля!');
    return false;
     }

  fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-in', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login: login, password: password })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка авторизации'); 
    }
    return response.json(); 
  })
  .then(data => {
    console.log('Успешная авторизация:', data); 
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Неверный логин или пароль!'); 
  });
});

  let q = new URLSearchParams(window.location.search)

  let isActivation = q.get('msg');
  if (isActivation) {
    document.getElementById('activation').innerHTML='<h5 class="activation">Ваш аккаунт успешно активирован!</h5>'
  }

  let isSignUp = q.get('sign-up');
  if (isSignUp) {
    document.getElementById('msg').innerHTML='<h5 class="activation">Аккаунт успешно создан. Проверьте email.</h5>'
  }
}

