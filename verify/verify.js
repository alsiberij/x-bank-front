
    window.onload = function () {
    const form = document.getElementById('verifyForm');
    const errorMessage = document.getElementById('error-message');
    const emailRegex = /^.+@.+\..+$/;
    function validateEmail(email) {
    return emailRegex.test(email);
    }

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

         if (login.length < 3 || login.length > 32) {
            alert('Логин должнен содержать от 3 до 32 символов!');
            return;
          }
          if (password.length < 6 || password.length > 32) {
            alert('Пароль должен содержать от 6 до 32 символов!');
            return;
          }

          if (password != password2) {
            alert('Пароли не совпадают!');
            return;
          }

          async function checkAvailability(login, email) {
            try {
              const response = await fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-up', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ login, email })
              });
          
              const data = await response.json();
          
              if (response.ok) {
                if (data.loginAvailable) {
                  document.getElementById('wrapper').innerHTML = '<h5 class="activation">Логин доступен</h5>'
                } else {
                  document.getElementById('wrapper').innerHTML = '<h5 class="activation">Логин занят</h5>'
                }
                if (data.emailAvailable) {
                  document.getElementById('wrapper').innerHTML = '<h5 class="activation">Email доступен</h5>'
                } else {
                  document.getElementById('wrapper').innerHTML = '<h5 class="activation">Email занят</h5>'
                }
              } else {
                console.error('Ошибка при проверке доступности');
              }
            } catch (error) {
              console.error('Ошибка при выполнении запроса', error);
            }
          }

      fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: email, login: login, password: password, password2: password2 })
      })
      .then(data => {
        if (data.ok) {
          window.location.href = 'https://x-bank.alsiberij.com/?sign-up=true';
        } else {
          alert(data.message || 'Ошибка регистрации!'); 
        }
      })
      .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при регистрации!');
      });
    });
 }

    
