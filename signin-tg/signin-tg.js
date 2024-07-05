window.onload = function (){
  document.getElementById('signinTgButton').addEventListener('click', async function() {
    const twoFactorAuthenticationToken = localStorage.getItem('2FA');
    const twoFactorAuthenticationCode = document.getElementById('twoFactorAuthenticationCode').value;

    fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-in/2fa', {
      method: 'POST',
      headers: {
        'Authorization': "Bearer " + localStorage.getItem("2FA"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: twoFactorAuthenticationCode }),
    })
        .then(response => {
          if (!response.ok) {
            throw new Error('Ошибка авторизации.');
          }
          return response.json();
        })
        .then(data => {
          localStorage.setItem('accessToken', data.tokens.accessToken);
          localStorage.setItem('refreshToken', data.tokens.refreshToken);
          window.location.href = '/personalData/personalData.html';
        })
        .catch(error => {
          console.error(error);
        });
  })
}