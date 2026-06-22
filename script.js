// Знаходимо основні елементи форми
const form = document.getElementById('feedbackForm');
const nameInput = document.getElementById('userName');
const emailInput = document.getElementById('userEmail');
const globalMessage = document.getElementById('error-message');
const submitBtn = form.querySelector('button[type="submit"]');

// Функція для динамічного створення та відображення помилки
const showError = (input, message) => {
    let errorSpan = input.nextElementSibling;
    if (!errorSpan || !errorSpan.classList.contains('error-text')) {
        errorSpan = document.createElement('span');
        errorSpan.classList.add('error-text');
        errorSpan.style.color = 'var(--error-color, red)';
        errorSpan.style.fontSize = '12px';
        errorSpan.style.display = 'block';
        errorSpan.style.marginTop = '4px';
        input.parentNode.insertBefore(errorSpan, input.nextSibling);
    }
    errorSpan.textContent = message;
    input.style.borderColor = 'var(--error-color, red)';
};

// Функція для динамічного видалення помилки
const clearError = (input) => {
    const errorSpan = input.nextElementSibling;
    if (errorSpan && errorSpan.classList.contains('error-text')) {
        errorSpan.remove();
    }
    input.style.borderColor = 'var(--input-border, #ccc)';
};

// Функції валідації
const validateName = () => {
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, "Ім'я повинно містити щонайменше 2 символи.");
        return false;
    }
    clearError(nameInput);
    return true;
};

const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        showError(emailInput, "Будь ласка, введіть коректну email-адресу.");
        return false;
    }
    clearError(emailInput);
    return true;
};

// 1. Валідація форми при події input
nameInput.addEventListener('input', validateName);
emailInput.addEventListener('input', validateEmail);

// 1. Валідація форми та обробка серверних даних при події submit
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    globalMessage.textContent = '';
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();

    if (isNameValid && isEmailValid) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Відправка...';
        
        try {
            // 3. Імітація затримки відповіді сервера (2 секунди)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // 2. Завантаження JSON-файлу за допомогою Fetch API
            const response = await fetch('response.json');
            
            // Перевіряємо, чи успішний HTTP-статус
            if (!response.ok) {
                throw new Error('Помилка завантаження даних');
            }
            
            // Парсимо JSON у JavaScript-об'єкт
            const data = await response.json();
            
            // 2. Відображення відповіді
            if (data.success) {
                globalMessage.textContent = data.message;
                globalMessage.style.color = "green";
                form.reset(); 
            } else {
                throw new Error('Сервер повернув помилку');
            }
            
        } catch (error) {
            // Обробка помилок (наприклад, якщо відкрити файл просто в браузері без Live Server)
            globalMessage.textContent = "Сталася помилка: " + error.message;
            globalMessage.style.color = "var(--error-color, red)";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Відправити';
            setTimeout(() => globalMessage.textContent = '', 4000);
        }
    }
});