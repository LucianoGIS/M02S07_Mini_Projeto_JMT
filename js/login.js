const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');
const loginForm = document.getElementById('loginForm');

function checkFormValidity() {
    const isValid = emailInput.value.trim() !== '' && passwordInput.value.trim() !== '';
    loginBtn.disabled = !isValid;
}

emailInput.addEventListener('input', checkFormValidity);
passwordInput.addEventListener('input', checkFormValidity);

function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordField.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (loginBtn.disabled) return;
    
    const email = emailInput.value.trim();
    
    localStorage.setItem('userEmail', email);
    
    window.location.href = 'listagem-parceiros.html';
});