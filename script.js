const form = document.querySelector('.feedback-form');
const errorMessage = document.getElementById('error-message');

const validateFeedbackData = (name, email) => {
    if (!name || name.trim().length < 2) {
        throw new Error("Ім'я повинно містити щонайменше 2 символи.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        throw new Error("Будь ласка, введіть коректну email-адресу.");
    }

    return { isValid: true, message: "Дані успішно перевірено!" };
};

if (!form || !errorMessage) {
    console.warn('Feedback script: form or error message container not found.');
} else {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = document.getElementById('userName').value;
        const emailInput = document.getElementById('userEmail').value;

        errorMessage.textContent = '';

        try {
            validateFeedbackData(nameInput, emailInput);
            errorMessage.textContent = "Ваш відгук успішно відправлено! Дякуємо.";
            errorMessage.style.color = "green";
            form.reset();
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.color = "var(--error-color, red)";
        }
    });
}
