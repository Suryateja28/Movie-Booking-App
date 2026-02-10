export const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        rating: 8.8,
        language: "English",
        city: "New York",
        poster: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "The Dark Knight",
        year: 2008,
        rating: 9.0,
        language: "English",
        city: "London",
        poster: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=2674&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "Parasite",
        year: 2019,
        rating: 8.6,
        language: "Korean",
        city: "Seoul",
        poster: "https://images.unsplash.com/photo-154df2426038-a7cd244cca9a?q=80&w=2643&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "RRR",
        year: 2022,
        rating: 7.8,
        language: "Telugu",
        city: "Hyderabad",
        poster: "https://images.unsplash.com/photo-1627844718626-4a69ec689104?q=80&w=2670&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "Spiderman: No Way Home",
        year: 2021,
        rating: 8.2,
        language: "English",
        city: "New York",
        poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=2670&auto=format&fit=crop"
    }
];

export const cities = [...new Set(movies.map(m => m.city))];
