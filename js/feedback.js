document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.feedback-form');
    const errorMessage = document.getElementById('error-message');

    if (!form || !errorMessage) return;

    const fields = {
        userName: form.querySelector('#userName'),
        userEmail: form.querySelector('#userEmail'),
        comments: form.querySelector('#comments')
    };

    const validators = {
        userName: value => {
            if (!value.trim()) return 'Будь ласка, введіть ім’я.';
            if (value.trim().length < 2) return 'Ім’я повинно містити щонайменше 2 символи.';
            return '';
        },
        userEmail: value => {
            if (!value.trim()) return 'Будь ласка, введіть email.';
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value.trim())) return 'Будь ласка, введіть коректну email-адресу.';
            return '';
        },
        comments: value => {
            if (!value.trim()) return 'Будь ласка, напишіть свій відгук.';
            if (value.trim().length < 10) return 'Відгук повинен містити щонайменше 10 символів.';
            return '';
        }
    };

    const clearFieldError = input => {
        const errorNode = input.parentElement?.querySelector('.field-error');
        if (errorNode) errorNode.remove();
    };

    const setFieldError = (input, message) => {
        clearFieldError(input);
        const errorNode = document.createElement('div');
        errorNode.className = 'field-error';
        errorNode.textContent = message;
        input.parentElement?.appendChild(errorNode);
    };

    const clearAllErrors = () => {
        errorMessage.textContent = '';
        errorMessage.className = '';
        Object.values(fields).forEach(clearFieldError);
    };

    const showStatusMessage = (message, type = 'error') => {
        errorMessage.textContent = message;
        errorMessage.classList.toggle('message-success', type === 'success');
        errorMessage.classList.toggle('message-error', type !== 'success');
    };

    Object.values(fields).forEach(field => {
        field.addEventListener('input', () => {
            const error = validators[field.id]?.(field.value);
            if (error) {
                setFieldError(field, error);
            } else {
                clearFieldError(field);
            }

            if (!Object.values(fields).some(f => validators[f.id]?.(f.value))) {
                showStatusMessage('', 'success');
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearAllErrors();

        let hasErrors = false;

        Object.values(fields).forEach(field => {
            const error = validators[field.id]?.(field.value);
            if (error) {
                setFieldError(field, error);
                hasErrors = true;
            }
        });

        if (hasErrors) {
            showStatusMessage('Будь ласка, виправте помилки у формі.', 'error');
            return;
        }

        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Надсилається...';
        showStatusMessage('Надсилаємо форму...', 'success');

        setTimeout(() => {
            form.reset();
            clearAllErrors();
            showStatusMessage('Дякуємо! Ваш відгук успішно надіслано.', 'success');
            submitButton.disabled = false;
            submitButton.textContent = 'Відправити';
        }, 1200);
    });
});