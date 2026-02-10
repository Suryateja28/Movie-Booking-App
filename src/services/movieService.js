// Movie Service for handling TMDB API operations
const API_KEY = '82445b6c28b2481343c3311c6d0af572';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const demoCities = ["Hyderabad", "New York", "London", "Seoul", "Mumbai", "Bangalore"];

const fallbackMovies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        language: "EN",
        city: "New York",
        poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        language: "EN",
        city: "London",
        poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "RRR",
        year: 2022,
        rating: 7.8,
        language: "TE",
        city: "Hyderabad",
        poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Spiderman: No Way Home",
        year: 2021,
        rating: 8.2,
        language: "EN",
        city: "New York",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 101,
        title: "Avatar: The Way of Water",
        year: 2022,
        rating: 7.6,
        language: "EN",
        city: "Mumbai",
        poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 102,
        title: "Interstellar",
        year: 2014,
        rating: 8.7,
        language: "EN",
        city: "Bangalore",
        poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 103,
        title: "Oppenheimer",
        year: 2023,
        rating: 8.5,
        language: "EN",
        city: "London",
        poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 104,
        title: "Dunki",
        year: 2023,
        rating: 7.2,
        language: "HI",
        city: "Mumbai",
        poster: "https://images.unsplash.com/photo-1543536448-d247d87197ec?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 105,
        title: "Animal",
        year: 2023,
        rating: 7.0,
        language: "HI",
        city: "Hyderabad",
        poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 201,
        title: "Avengers: Doomsday",
        year: 2026,
        rating: 9.2,
        language: "EN",
        city: "New York",
        poster: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 202,
        title: "The Batman Part II",
        year: 2026,
        rating: 8.9,
        language: "EN",
        city: "London",
        poster: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 203,
        title: "The Mandalorian & Grogu",
        year: 2026,
        rating: 8.5,
        language: "EN",
        city: "Seoul",
        poster: "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 205,
        title: "Supergirl: Woman of Tomorrow",
        year: 2026,
        rating: 8.6,
        language: "EN",
        city: "Hyderabad",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=500&auto=format&fit=crop"
    }
];

export const movieService = {
    getNowPlaying: async () => {
        try {
            console.log("Fetching now playing movies...");
            const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`);

            if (!response.ok) {
                console.warn("TMDB API failed, using fallback movies");
                return fallbackMovies;
            }

            const data = await response.json();
            if (!data.results || data.results.length === 0) return fallbackMovies;

            return data.results.map((movie, index) => ({
                id: movie.id,
                title: movie.title,
                year: movie.release_date?.split('-')[0] || '2024',
                rating: movie.vote_average.toFixed(1),
                language: movie.original_language.toUpperCase(),
                // Assign cities round-robin or randomly from our demo list
                city: demoCities[index % demoCities.length],
                poster: movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : `https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop`
            }));
        } catch (error) {
            console.error("Critical error in movieService, using fallback:", error);
            return fallbackMovies;
        }
    },

    getMovieDetails: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
            if (!response.ok) throw new Error('Detail fetch failed');
            const movie = await response.json();
            return {
                id: movie.id,
                title: movie.title,
                year: movie.release_date?.split('-')[0] || '2024',
                rating: movie.vote_average.toFixed(1),
                language: movie.original_language.toUpperCase(),
                city: demoCities[Math.floor(Math.random() * demoCities.length)],
                poster: movie.poster_path
                    ? `${IMAGE_BASE_URL}${movie.poster_path}`
                    : `https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop`,
                overview: movie.overview
            };
        } catch (error) {
            console.error("Error fetching movie details:", error);
            const fallback = fallbackMovies.find(m => m.id === parseInt(id));
            return fallback || fallbackMovies[0];
        }
    }
};

