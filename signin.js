
window.onload = function () {
const form = document.getElementById('signInForm');
const errorMessage = document.getElementById('error-message');


document.getElementById('form').addEventListener('submit', async function(event) {
  event.preventDefault(); 

  const login = document.getElementById('login').value.trim();
  const password = document.getElementById('password').value.trim();
  const accessToken = document.getElementById("accessToken");
  const refreshToken = document.getElementById("refreshToken");
  const twoFA = document.getElementById('2FA');

    if (login === '' || password === '' ) {
    alert('Пожалуйста, заполните все поля!');
    return false;
     }

   fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-in', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ login: login, password: password, accessToken, refreshToken, twoFA })
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
 
    if (data['2FA']) {
      localStorage.setItem('2FA', data['2FA']);
      window.location.href = '/signin-tg/signin-tg.html';
      console.log('2FA', data['2FA']);
    }
  else {
    localStorage.setItem("accessToken", data.tokens.accessToken);
    localStorage.setItem("refreshToken", data.tokens.refreshToken);
    window.location.href = '/personalData/personalData.html';
  }
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