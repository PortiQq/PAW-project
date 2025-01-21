document.addEventListener('DOMContentLoaded', () => {
    const addMovieForm = document.getElementById('add-movie-form');
    const addShowForm = document.getElementById('add-show-form');
    const moviesList = document.getElementById('movies-list');
    const movieSelect = document.getElementById('movie_id');

    //Pobranie listy filmów
    fetch('/api/movies')
        .then(response => response.json())
        .then(movies => {
            movies.forEach(movie => {
                const movieItem = document.createElement('li');
                movieItem.textContent = `${movie.title} - ${movie.release_date} - ${movie.duration} min`;
                moviesList.appendChild(movieItem);

               //Filmy do select
                const option = document.createElement('option');
                option.value = movie.id;
                option.textContent = movie.title;
                movieSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Błąd podczas pobierania filmów:', error);
        });

    //Dodawanie filmu
    addMovieForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(addMovieForm);
        const movieData = {
            title: formData.get('title'),
            release_date: formData.get('release_date'),
            duration: formData.get('duration'),
            description: formData.get('description'),
        };

        fetch('/api/movies/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(movieData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Film został dodany');
            window.location.reload();
        })
        .catch(error => {
            console.error('Błąd podczas dodawania filmu:', error);
        });
    });

    //Dodawanie seansu
    addShowForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(addShowForm);
        const showData = {
            movie_id: formData.get('movie_id'),
            date: formData.get('date'),
        };

        fetch('/api/shows/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(showData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Seans został dodany');
        })
        .catch(error => {
            console.error('Błąd podczas dodawania seansu:', error);
        });
    });
});