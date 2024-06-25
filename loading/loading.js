setTimeout(function() {
    alert('Подождите несколько секунд');
  }, 6000); 
  
  
window.onload = function () {
    async function sendVerificationRequest() {
      const url = new URL('https://x-bank.alsiberij.com/ms-users/v1/auth/verification?code=123456');
      const verificationCode = url.searchParams.get('code');
      if (verificationCode) {
        try {
          const response = await fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/verification?code=123456', { 
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ verification: verificationCode })
          });
    
          if (response.ok) {
            console.log('Код верификации успешно отправлен');
            alert('Аккаунт успешно активирован!');
            window.location.href = 'https://x-bank.alsiberij.com/ms-users/v1/auth/sign-in';
          } else {
            console.error('Ошибка при отправке кода верификации');
            alert('Ошибка активации!');
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