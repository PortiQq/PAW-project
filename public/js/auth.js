document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        await login(email, password);
    });
});

async function login(email, password) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token); 
            window.location.href = '/user-panel';
        } else {
            alert(data.error || 'Błąd logowania');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Wystąpił problem podczas logowania.');
    }
}


async function logout() {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            credentials: 'include', 
        });

        if (response.ok) {
            localStorage.removeItem('token');
            window.location.href = '/login.html';
        } else {
            alert('Nie udało się wylogować. Spróbuj ponownie.');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        alert('Wystąpił problem podczas wylogowania.');
    }
}