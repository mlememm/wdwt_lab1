document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.feedback-form');
    const errorMessage = document.getElementById('error-message');

    if (!form || !errorMessage) return;

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        errorMessage.textContent = '';
        errorMessage.style.color = '';

        const userName = form.querySelector('#userName');
        const userEmail = form.querySelector('#userEmail');
        const comments = form.querySelector('#comments');

        if (!userName.value.trim() || !userEmail.value.trim() || !comments.value.trim()) {
            errorMessage.textContent = 'Будь ласка, заповніть усі поля перед відправкою.';
            errorMessage.style.color = '#ffcccc';
            return;
        }

        errorMessage.textContent = 'Дякуємо! Ваш відгук надіслано.';
        errorMessage.style.color = '#b9ffce';
        form.reset();
    });
});