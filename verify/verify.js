
    window.onload = function () {
    const form = document.getElementById('verifyForm');
    const errorMessage = document.getElementById('error-message');

    document.getElementById('form').addEventListener('submit', function(event) {
      event.preventDefault();

      const email = document.getElementById('email').value.trim();
      const login = document.getElementById('login').value.trim();
      const password = document.getElementById('password').value.trim();
      const password2 = document.getElementById('password2').value.trim();

        if (email === '' || login === '' || password === '' || password2 === '') {
        alert('Пожалуйста, заполните все поля!');
        return false;
         }

         if (login.length > 8) {
            alert('Логин должнен содержать не менее 8 символов!');
            return;
          }
          if (password.length < 8) {
            alert('Пароль должен coдержать не менее 8 символов!');
            return;
          }

          if (password != password2) {
            alert('Пароли не совпадают!');
            return;
          }

      fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, login: login, password: password, password2: password2 })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка авторизации');
        }
        return response.json();
      })
      .then(data => {
        console.log('Успешная авторизация', data);
      })
    });
 }
