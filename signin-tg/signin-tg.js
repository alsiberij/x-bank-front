window.onload = function (){
const twoFactorAuthenticationToken = localStorage.getItem('twoFactorAuthenticationToken');
const twoFactorAuthenticationCode = document.getElementById('2FA').value;


fetch('https://x-bank.alsiberij.com/ms-users/v1/auth/sign-in/2fa', {
  method: 'POST',
  headers: {
    'Authorization': "Bearer " + localStorage.getItem("2FA"),
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ code: '327305' }),
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
}