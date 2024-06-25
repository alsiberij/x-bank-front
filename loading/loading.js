window.onload = function () {
    async function sendVerificationRequest() {
      await new Promise(r => setTimeout(r, 5000));
      let verificationCode = new URLSearchParams(window.location.search).get('code');
      if (verificationCode) {
        try {
          const response = await fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/verification?code='+verificationCode, {
            method: 'POST',
          });
          if (response.ok) {
            document.getElementById('wrapper').innerHTML = '<h4 class="activation">Аккаунт успешно активирован, перенаправление...</h4>'
            await new Promise(r => setTimeout(r, 2000));
            window.location.href = 'https://x-bank.alsiberij.com/?activation=true';
          } else {
            document.getElementById('wrapper').innerHTML = '<h4 class="activation">Произошла ошибка!</h4>'
          }
        } catch (error) {
          console.error('Ошибка при отправке запроса', error);
        }
      } else {
        console.error('Код верификации не найден в URL');
      }
    }
    sendVerificationRequest()
    }