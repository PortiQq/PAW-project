function getUserIdFromToken(token) {
    const payload = JSON.parse(atob(token.split('.')[1])); // Dekodowanie tokena
    return payload.user_id;
}

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


 function reserveShow(showId) {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '/login.html';
        return;
    }
    const userId = getUserIdFromToken(token);

    fetch('/api/reservations/reserve', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ user_id: userId, show_id: showId })
    })
    .then(response => {
        if (response.status === 409) {
            alert('Już zarezerwowałeś ten seans!');
            return;
        }
        if (!response.ok) {
            throw new Error('Rezerwacja nie powiodła się');
        } else{
        alert('Rezerwacja udana!')
        }
        return response.json();
    })
    
    .catch(error => {
        console.error('Error during reservation:', error);
        alert('Wystąpił błąd podczas rezerwacji.');
    });
}


     fetch('/api/shows')
     .then(response => response.json())
     .then(shows => {
         shows.forEach(show => {
             const showCard = document.createElement('div');
             showCard.classList.add('show-card');
             showCard.innerHTML = `
                 <div class="show-title">${show.title}</div>
                 <div class="show-date">${formatDate(show.date)}</div>
                 <div class="hover-text" style="display: none;">Rezerwuj</div> <!-- Text "Rezerwuj" -->
             `;

             const hoverText = showCard.querySelector('.hover-text');

              showCard.addEventListener('mouseenter', () => {
                showCard.style.backgroundColor = '#007bff';
                hoverText.style.display = 'block';
            });
            showCard.addEventListener('mouseleave', () => {
                showCard.style.backgroundColor = '';
                hoverText.style.display = 'none';
            });
            showCard.addEventListener('click', () => {
                reserveShow(show.id);
            });

             showsContainer.appendChild(showCard);
         });
     })
     .catch(error => {
         console.error('Error fetching shows:', error);
     });
});