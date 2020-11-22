// Fetch form search field.
const form = document.querySelector('form');
const person_idUI = document.querySelector('#person_id');
const join_statusUI = document.querySelector('#join_status');
const corona_stausUI = document.querySelector('#corona_staus');
const diagnostic_dateUI = document.querySelector('#diagnostic_date');
const logoutUI = document.querySelector('#logout');


// logout/
logoutUI.addEventListener('click', function () {

    localStorage.removeItem('token');

    location.href = 'index.html';
});


// Add listener when the form submited.
form.addEventListener('submit', function (event) {


    // clear the previous results
    join_statusUI.innerHTML = '';
    corona_stausUI.innerHTML = '';
    diagnostic_dateUI.innerHTML = '';

    // prevent the default behavior.
    event.preventDefault();

    console.log(person_idUI.value);
    // set the request to check if the status of the person.
    axios.get('http://api.mohe.ps/coronacheck/check/student', {
        params: {
            person_id: person_idUI.value
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    }).then(function (response) {

        if (!response.data.status) {
            alert('رقم الهوية خطا!');
            return;
        }

        if (response.data.status.code != 200 && response.data.status.code != 422) {
            location.href = 'index.html';
        }

        if (response.data.status.code == 422) {
            alert('رقم الهوية مطلوب');
        }

        if (response.data.status.code == 200) {
            join_statusUI.textContent = response.data.join_status;

            corona_stausUI.textContent = response.data.crona_status;

            diagnostic_dateUI.textContent = response.data.diagnostic_date;
        }
    });

});


