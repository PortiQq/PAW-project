function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}


document.addEventListener('DOMContentLoaded', () => {

    const showsContainer = document.getElementById('shows-container');

    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    fetch('/api/reservations/myreservations', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching reservations');
        }
        return response.json();
    })
    .then(shows => {
        if (shows.length === 0) {
            showsContainer.innerHTML = '<p>Brak rezerwacji.</p>';
            return;
        }

        shows.forEach(show => {
            const showCard = document.createElement('div');
            showCard.classList.add('show-card');
            showCard.innerHTML = `
                <div class="show-title">${show.title}</div>
                <div class="show-date">${formatDate(show.date)}</div>
            `;
            showsContainer.appendChild(showCard);
        });
    })
    .catch(error => {
        console.error('Error fetching shows:', error);
    });

});
