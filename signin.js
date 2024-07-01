
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

  let isActivation = q.get('activation');
  if (isActivation) {
    document.getElementById('msg').innerHTML='<h5 class="activation">Ваш аккаунт успешно активирован!</h5>'
  }

  let isSignUp = q.get('sign-up');
  if (isSignUp) {
    document.getElementById('msg').innerHTML='<h5 class="activation">Аккаунт успешно создан. Проверьте email.</h5>'
  }

const signinButton = document.getElementById('signinButton');
let accessToken = localStorage.getItem("accessToken");
let refreshToken = localStorage.getItem("refreshToken");

signinButton.addEventListener('click', async () => {
  try {
    const response = await fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken, refreshToken }),
    });

    const data = await response.json();

    if (response.ok) { 
      if (data.accessToken || data.refreshToken) {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        window.location.href = 'https://x-bank.alsiberij.com/?personal-data=true';
      } else if (data.twoFactorToken) {
        localStorage.setItem('twoFactorToken', data.twoFactorToken);
        window.location.href = 'https://x-bank.alsiberij.com/?signin-tg=true';
      } else {
        console.error('Неверный ответ сервера', data);
      }
    } else {
      console.error('Ошибка', response.status);
    }
  } catch (error) {
    console.error('Ошибка:', error);
  } 
}); 

}



// window.onload = function () {
//   const form = document.getElementById('signInForm');
//   const errorMessage = document.getElementById('error-message');

  
//   document.getElementById('form').addEventListener('submit', function(event) {
//     event.preventDefault(); 
  
//     const login = document.getElementById('login').value.trim();
//     const password = document.getElementById('password').value.trim();
//     let accessToken = localStorage.getItem("accessToken");
//     let refreshToken = localStorage.getItem("refreshToken");
  
//       if (login === '' || password === '' ) {
//       alert('Пожалуйста, заполните все поля!');
//       return false;
//        }
  
//      fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-in', { 
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ login: login, password: password, accessToken, refreshToken })
//     })

//     if (response.ok) { 
//       if (data.accessToken || data.refreshToken) {
//         localStorage.setItem('accessToken', data.accessToken);
//         localStorage.setItem('refreshToken', data.refreshToken);
//         window.location.href = 'https://x-bank.alsiberij.com/?personal-data=true';
//       } else if (data.twoFactorToken) {
//         localStorage.setItem('twoFactorToken', data.twoFactorToken);
//         window.location.href = 'https://x-bank.alsiberij.com/?signin-tg=true';
//       } else {
//         console.error('Неверный ответ сервера', data);
//       } };

//     then(response => {
//       if (!response.ok) {
//         throw new Error('Ошибка авторизации'); 
//       }
//       return response.json(); 
//     })
//     .then(data => {
//       console.log('Успешная авторизация:', data); 
//     })
//     .catch(error => {
//       console.error('Ошибка:', error);
//       alert('Неверный логин или пароль!'); 
//     });
//   });
  
//     let q = new URLSearchParams(window.location.search)
  
//     let isActivation = q.get('activation');
//     if (isActivation) {
//       document.getElementById('msg').innerHTML='<h5 class="activation">Ваш аккаунт успешно активирован!</h5>'
//     }
  
//     let isSignUp = q.get('sign-up');
//     if (isSignUp) {
//       document.getElementById('msg').innerHTML='<h5 class="activation">Аккаунт успешно создан. Проверьте email.</h5>'
//     }

//   }