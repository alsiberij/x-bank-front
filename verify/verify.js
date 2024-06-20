// const Form = document.getElementById('Form');
// const email = document.getElementById('email');
// const login = document.getElementById('login');
// const password = document.getElementById('password');
// const password2 = document.getElementById('password2');

// window.onload = function () {
// document.getElementById('Form').addEventListener('submit', function(event) {
//     event.preventDefault();

//     validateInputs();
// });

// const setError = (element, message) => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.error');

//     errorDisplay.innerText = message;
//     inputControl.classList.add('error');
//     inputControl.classList.remove('success')
// }

// const setSuccess = element => {
//     const inputControl = element.parentElement;
//     const errorDisplay = inputControl.querySelector('.success');

//     errorDisplay.innerText = '';
//     inputControl.classList.add('success');
//     inputControl.classList.remove('error');
// };

// const validateInputs = () => {
//     const emailValue = email.value.trim();
//     const loginValue = login.value.trim();
//     const passwordValue = password.value.trim();
//     const password2Value = password2.value.trim();

//     if(emailValue === '') {
//         setError(email, 'Email is required');
//     } else if (!isValid(emailValue)) {
//         setError(email, 'Provide a valid email address');
//     } else {
//         setSuccess(email);
//     }

//     if(loginValue === '') {
//         setError(login, 'Login is required');
//     } else {
//         setSuccess(login);
//     }
    
//     if(passwordValue === '') {
//         setError(password, 'Password is required');
//     } else if (passwordValue.length < 8 ) {
//         setError(password, 'Password must be at least 8 character.')
//     } else {
//         setSuccess(password);
//     }

//     if(password2Value === '') {
//         setError(password2, 'Please confirm your password');
//     } else if (password2Value !== passwordValue) {
//         setError(password2, "Passwords doesn't match");
//     } else {
//         setSuccess(password2);
//     }

// };
// }

//   if (login.length > 8) {
//     alert('Логин должнен содержать не менее 8 символов!');
//     return;
//   }
//   if (password.length < 8) {
//     alert('Пароль должен coдуржать не менее 8 символов!');
//     return;
//   }






