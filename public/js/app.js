document.addEventListener('DOMContentLoaded', () => {
    const moviesTile = document.getElementById('movies-tile');
    const showsTile = document.getElementById('shows-tile');
    const userPanelTile = document.getElementById('user-panel-tile');
    const loginTile = document.getElementById('login-tile');
    const headerTile = document.getElementById('header-tile');

    headerTile.addEventListener('click', () => {
        window.location.href = '/'; 
    });
    moviesTile.addEventListener('click', () => {
        window.location.href = '/movies'; 
    });
    showsTile.addEventListener('click', () => {
        window.location.href = '/shows'; 
    });
    userPanelTile.addEventListener('click', () => {
        window.location.href = '/user-panel'; 
    });

    loginTile.addEventListener('click', () => {
        // Check login status and redirect
        const isLoggedIn = false; // Replace with actual login status check
        if (isLoggedIn) {
            // Perform logout action
            alert('Wylogowano!');
            loginTile.textContent = 'Zaloguj';
        } else {
            window.location.href = '/login'; // Replace with actual login page
        }
    });

    // Dynamically update login/logout tile based on login status
    const isLoggedIn = false; // Replace with actual login status
    loginTile.textContent = isLoggedIn ? 'Wyloguj' : 'Zaloguj';
});