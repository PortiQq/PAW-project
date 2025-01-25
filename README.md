# Aplikacja Kina

Aplikacja kina pozwala użytkownikom na przeglądanie filmów, rezerwowanie miejsc na seansach, a administratorom na dodawanie filmów i seansów do bazy. Całość opiera się na technologii Node.js z wykorzystaniem Express.js, PostgreSQL jako bazy danych oraz frontendzie napisanym w HTML, CSS i JavaScript.

## Technologie

- **Backend:** Node.js (Express.js)
- **Frontend:** HTML, CSS, JavaScript
- **Baza danych:** PostgreSQL

## Wymagania

Aby uruchomić projekt, należy posiadać:

- Node.js zainstalowane na systemie
- PostgreSQL jako bazę danych
- Visual Studio Code lub inne środowisko do pracy z kodem

## Instalacja

1. **Sklonuj repozytorium:**

```bash
git clone https://github.com/PortiQq/PAW-project.git
```

2. **Zainstaluj zależności**

```bash
npm install 
```

3. **Skonfiguruj bazę danych**

4. **Uruchom aplikację**

```bash
npm start
```

Aplikacja będzie dostępna pod adresem http://localhost:3000

## Struktura projektu
```
PAW-project/
│
│── app.js                # Główna aplikacja Express.js
│── db.js                 # Połączenie z bazą danych PostgreSQL
|── routing.js            # ścieżki 
│── routes/               # Katalog z plikami tras
│   |── auth.js           # Obsługa logowania, rejestracji, wylogowywania
│   │── movies.js         # Obsługa filmów
│   │── reservations.js   # Obsługa rezerwacji
│   │── shows.js          # Obsługa seansów
|── middleware/           # Katalog z middleware
│   ├── authToken.js      # Middleware autoryzacji tokenu
│
├── public/                # Folder z frontendem
│   ├── index.html         # Strona główna
│   ├── admin.html         # Panel administratora
│   ├── movies.html        # Podstrona z filmami
│   ├── shows.html         # Podstrona z seansami
│   ├── user-panel.html    # Panel użytkownika
│   ├── css/               # Folder ze stylami
|      ├── styles.css      # plik stylów
│   └── js/                # Folder z plikami JavaScript
|     ├── admin.js         # Funkcjonalności panelu admina
|     ├── auth.js          # Funkcjonalności panelu logowania
|     ├── movies.js        # Funkcjonalności panelu filmów
|     ├── shows.js         # Funkcjonalności panelu seansów
|     ├── ui.js            # Funkcjonalności intefejsu użytkownika i nawigacji
|     ├── user.js          # Funkcjonalności panelu użytkownika
|── package-lock.json      # Plik package-lock
|── package.json           # Plik zależności
```

# Endpointy backendowe

## Związane z użytkownikiem
```
/api/movies                      # Wyświetla listę filmów
/api/movies/:id                  # Wyświetla szczegóły filmu    
/api/futureshows/                # Wyświetla dostępne przyszłe seanse
/api/shows/reserve               # Rezerwuje miejsce na seansie
/api/reservations/myreservations # Wyświetla rezerwacje użytkownika
/api/auth/register               # Rejestruje nowego użytkownika
/api/auth/login                  # Logowanie użytkownika
/api/auth/logout                 # Wylogowanie użytkownika  
```

## Związane z administratorem
```
/api/movies/add                  # Dodaje film
/api/shows/add                   # Dodaje seans
/api/reservations                # Wyświetla listę rezerwacji
/api/shows                       # Wyświetla listę seansów
```


## Baza danych

Należy utworzyć bazę danych PostgreSQL ze schematem cinema_schema

```SQL
–-tabela users
CREATE TABLE cinema_schema.users (
	id integer NOT NULL,
	name character varying(64) NOT NULL,
	email character varying(255) NOT NULL,
	password_hash character varying(255) NOT NULL,
	role boolean DEFAULT false
);

CREATE SEQUENCE cinema_schema.users_id_seq
	AS integer
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;

ALTER SEQUENCE cinema_schema.users_id_seq OWNED BY cinema_schema.users.id;

ALTER TABLE ONLY cinema_schema.users ALTER COLUMN id SET DEFAULT nextval('cinema_schema.users_id_seq'::regclass);

–- tabela movies
CREATE TABLE cinema_schema.movies (
	id integer NOT NULL,
	title character varying(255) NOT NULL,
	release_date date,
	description text,
	duration smallint
);

CREATE SEQUENCE cinema_schema.movies_id_seq
	AS integer
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;

ALTER SEQUENCE cinema_schema.movies_id_seq OWNED BY cinema_schema.movies.id;

ALTER TABLE ONLY cinema_schema.movies ALTER COLUMN id SET DEFAULT nextval('cinema_schema.movies_id_seq'::regclass);


-–tabela shows
CREATE TABLE cinema_schema.shows (
	id integer NOT NULL,
	movie_id integer NOT NULL,
	date timestamp without time zone NOT NULL
);

CREATE SEQUENCE cinema_schema.shows_id_seq
	AS integer
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;


ALTER SEQUENCE cinema_schema.shows_id_seq OWNED BY cinema_schema.shows.id;

ALTER TABLE ONLY cinema_schema.shows ALTER COLUMN id SET DEFAULT nextval('cinema_schema.shows_id_seq'::regclass);


–-tabela reservations
CREATE TABLE cinema_schema.reservations (
	id bigint NOT NULL,
	show_id bigint NOT NULL,
	user_id integer NOT NULL
);

CREATE SEQUENCE cinema_schema.reservations_id_seq
	START WITH 1
	INCREMENT BY 1
	NO MINVALUE
	NO MAXVALUE
	CACHE 1;

ALTER SEQUENCE cinema_schema.reservations_id_seq OWNED BY cinema_schema.reservations.id;

ALTER TABLE ONLY cinema_schema.reservations ALTER COLUMN id SET DEFAULT nextval('cinema_schema.reservations_id_seq'::regclass);

ALTER TABLE ONLY cinema_schema.users
	ADD CONSTRAINT "email unique" UNIQUE (email);


ALTER TABLE ONLY cinema_schema.movies
	ADD CONSTRAINT movies_pkey PRIMARY KEY (id);


ALTER TABLE ONLY cinema_schema.movies
	ADD CONSTRAINT movies_title_key UNIQUE (title);


ALTER TABLE ONLY cinema_schema.reservations
	ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


ALTER TABLE ONLY cinema_schema.reservations
	ADD CONSTRAINT reservations_show_id_user_id_key UNIQUE (show_id, user_id);

ALTER TABLE ONLY cinema_schema.shows
	ADD CONSTRAINT shows_pkey PRIMARY KEY (id);

ALTER TABLE ONLY cinema_schema.users
	ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY cinema_schema.shows
	ADD CONSTRAINT movie_fkey FOREIGN KEY (movie_id) REFERENCES cinema_schema.movies(id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY cinema_schema.reservations
	ADD CONSTRAINT reservations_show_id_fkey FOREIGN KEY (show_id) REFERENCES cinema_schema.shows(id);

ALTER TABLE ONLY cinema_schema.reservations
	ADD CONSTRAINT reservations_user_id_fkey FOREIGN KEY (user_id) REFERENCES cinema_schema.users(id);

```



