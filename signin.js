
window.onload = function () {
const form = document.getElementById('signInForm');
const errorMessage = document.getElementById('error-message');


document.getElementById('form').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const login = document.getElementById('login').value.trim();
  const password = document.getElementById('password').value.trim();
  const accessToken = document.getElementById("accessToken");
  const refreshToken = document.getElementById("refreshToken");

    if (login === '' || password === '' ) {
    alert('Пожалуйста, заполните все поля!');
    return false;
     }

  fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-in', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login: login, password: password, accessToken, refreshToken})
  })
  
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка авторизации'); 
    }
    return response.json(); 
  })
  .then(data => {
    console.log('Успешная авторизация:', data); 
    // console.log('Access token:', data.tokens.accessToken);
    // console.log('Refresh token:', data.tokens.refreshToken);
    localStorage.setItem("accessToken", data.tokens.accessToken);
    localStorage.setItem("refreshToken", data.tokens.refreshToken);
    window.location.href = 'https://x-bank.alsiberij.com/?personal-data=true';
  })
  .catch(error => {
    console.error('Ошибка:', error);
    alert('Неверный логин или пароль!'); 
  });
});


  let q = new URLSearchParams(window.location.search)

  let isActivation = q.get('activation');
  if (isActivation) {
    document.getElementById('msg').innerHTML='<h5 class="activation">Ваш аккаунт успешно активирован!</h5>'
  }

  let isSignUp = q.get('sign-up');
  if (isSignUp) {
    document.getElementById('msg').innerHTML='<h5 class="activation">Аккаунт успешно создан. Проверьте email.</h5>'
  }

}