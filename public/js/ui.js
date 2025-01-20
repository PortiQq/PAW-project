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

    //Przycisk zaloguj/wyloguj 
    if (localStorage.getItem('token')) {
        loginTile.textContent = 'Wyloguj';
        loginTile.addEventListener('click', () => {
            logout();
        });
    } else {
        loginTile.textContent = 'Zaloguj';
        loginTile.addEventListener('click', () => {
            window.location.href = 'login.html';
        });
    }

     if (userPanelTile) {
         userPanelTile.addEventListener('click', () => {
             if (localStorage.getItem('token')) {
                 window.location.href = '/user-panel';
             } else {
                 window.location.href = '/login.html';
             }
         });
     }
})