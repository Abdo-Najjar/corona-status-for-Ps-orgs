const form = document.querySelector('form');
const name = document.querySelector('#name');
const password = document.querySelector('#password');


// add action after submitting a form
form.addEventListener('submit', (event) => {

  // prevent the default behavior
  event.preventDefault();

  axios.post('http://api.mohe.ps/coronacheck/auth/login', {
    username: name.value,
    password: password.value
  })
    .then(function (response) {

      //fetch code from response.
      const code = response.data.status.code;

      // validation error
      if (code == 422) {
        alert('خطأ في ادخال المدخلات!');
      } else if (response.data.status.code == 401) {
        alert('كلمة المرور او المستخدم غير صحيحة');
      } else if (response.data.status.code == 200) {

        // store token into localstorage
        localStorage.setItem('token' ,response.data.token )

        location.href = 'result.html';
      }
    });
});
