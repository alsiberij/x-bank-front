function getVerificationCode() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('verification'); 
  }
  
    async function sendVerificationRequest() {
    const verificationCode = getVerificationCode();
  console.log (verificationCode);
    if (verificationCode) {
      try {
        const response = await fetch('https://x-bank/verify.html?code=12345', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ verification: verificationCode })
        });
  
        if (response.ok) {
          console.log('Код верификации успешно отправлен');
        } else {
          console.error('Ошибка при отправке кода верификации');
        }
      } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
      }
    } else {
      console.error('Код верификации не найден в URL');
    }
  }
  
  sendVerificationRequest();
  