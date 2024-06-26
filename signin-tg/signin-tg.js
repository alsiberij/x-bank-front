window.onload = function () {
const signinTgButton = document.getElementById('signinTgButton'); 

signinTgButton.addEventListener('click', async () => {
    const twoFactorCode = document.getElementById('twoFactorCode').value;
  try {
    const response = await fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-in/2fa', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        twoFactorToken: localStorage.getItem('twoFactorToken'),
        code: twoFactorCode,
      }),
    });

    if (!response.ok) {
      throw new Error('Ошибка подтверждения 2FA');
    }

    const data = await response.json();

    if (data.accessToken && data.refreshToken) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      window.location.href = 'https://x-bank.alsiberij.com/?personal-data=true';
    } else {
      console.error('Неверный ответ сервера', data);
    }
  } catch (error) {
    console.error('Ошибка', error);
  }
});
}