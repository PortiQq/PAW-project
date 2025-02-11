function decodeToken(token) {
    const payload = token.split('.')[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
}

document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        await login(email, password);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordRepeat = document.getElementById('password-repeat').value;

        if (password !== passwordRepeat) {
            alert('Hasła nie są zgodne. Spróbuj ponownie.');
            return;
        }

        await register(username, email, password);
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

            //Sprawdzenie czy użytkownik jest adminem
            const decodedToken = decodeToken(data.token);
            const userRole = decodedToken.role;

            if(userRole === true){
                window.location.href = '/admin.html';
            } else{
                window.location.href = '/user-panel';
            }
            
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
            window.location.href = '/login';
        } else {
            alert('Nie udało się wylogować. Spróbuj ponownie.');
        }
    } catch (error) {
        console.error('Error during logout:', error);
        alert('Wystąpił problem podczas wylogowania.');
    }
}

async function register(username, email, password){
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            alert('Zarejestrowano pomyślnie!');
            window.location.href = '/login';
        } else {
            alert(data.error || 'Błąd rejestracji');
        }
    } catch (error) {
        console.error('Error during registration:', error);
        alert('Wystąpił problem podczas rejestracji.');
    }
}