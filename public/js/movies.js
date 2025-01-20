document.addEventListener('DOMContentLoaded', () => {
    const moviesContainer = document.getElementById('movies-container');
    const movieModal = document.getElementById('movie-modal');
    const closeModalButton = document.getElementById('close-modal');
    
    async function loadMovies() {
        try {
            const response = await fetch('/api/movies');
            const movies = await response.json();
            
            if (movies.length === 0) {
                moviesContainer.innerHTML = '<h1>Brak filmów do wyświetlenia.</h1>';
                return;
            }

            movies.forEach(movie => {
                const movieCard = document.createElement('div');
                movieCard.classList.add('movie-card');

                const movieImage = document.createElement('div');
                movieImage.classList.add('movie-image');
                movieImage.style.backgroundImage = `url(${movie.imageUrl || '/images/default-movie.jpg'})`;

                const movieTitle = document.createElement('div');
                movieTitle.classList.add('movie-title');
                movieTitle.textContent = movie.title;

                movieCard.appendChild(movieImage);
                movieCard.appendChild(movieTitle);
                moviesContainer.appendChild(movieCard);

                movieCard.addEventListener('click', () => showMovieDetails(movie.id));
            });
        } catch (error) {
            console.error('Błąd podczas pobierania filmów:', error);
            moviesContainer.innerHTML = '<h1>Wystąpił problem podczas ładowania filmów.</h1>';
        }
    }

     function showMovieDetails(id) {
        fetch(`/api/movies/${id}`)
            .then(response => response.json())
            .then(movie => {
                document.getElementById('movie-title').textContent = movie.title;
                document.getElementById('movie-description').textContent = movie.description;
                document.getElementById('movie-duration').textContent = "Czas trwania: " + movie.duration + " min";
                document.getElementById('movie-release-date').textContent = "Data premiery: "+ movie.release_date;
                movieModal.style.display = 'block';
            });
    }

    closeModalButton.addEventListener('click', () => {
        movieModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === movieModal) {
            movieModal.style.display = 'none';
        }
    });

    loadMovies();
});