import React, { useState, useEffect } from 'react';
import { movieService } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import { Search, MapPin, FilterX, Loader2, PlayCircle } from 'lucide-react';

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                const data = await movieService.getNowPlaying();
                setMovies(data || []);
            } catch (err) {
                console.error("Dashboard fetch error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    // Derive available cities from current movies
    const availableCities = [...new Set(movies.map(movie => movie.city))].sort();

    const filteredMovies = movies.filter(movie => {
        const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCity = selectedCity === '' || movie.city === selectedCity;
        return matchesSearch && matchesCity;
    });

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCity('');
    };

    return (
        <div className="space-y-10 pb-20">
            {/* Hero Section / Filters */}
            <div className="relative py-12 px-6 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-indigo-600/10 backdrop-blur-3xl" />
                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Discover Your Next <br />
                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                            Movie Adventure
                        </span>
                    </h1>

                    {loading ? (
                        <div className="flex items-center justify-center py-10">
                            <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
                        </div>
                    ) : (
                        <div className="flex flex-col md:flex-row items-center gap-4 bg-slate-900/50 p-2 rounded-2xl border border-slate-700 shadow-2xl">
                            <div className="relative flex-1 w-full">
                                <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search movies..."
                                    className="w-full bg-transparent border-none py-3 pl-12 pr-4 focus:ring-0 text-white placeholder-slate-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div className="h-8 w-[1px] bg-slate-700 hidden md:block" />

                            <div className="relative w-full md:w-48">
                                <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
                                <select
                                    className="w-full bg-transparent border-none py-3 pl-12 pr-8 focus:ring-0 text-white appearance-none cursor-pointer"
                                    value={selectedCity}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                >
                                    <option value="" className="bg-slate-900">All Cities</option>
                                    {availableCities.map(city => (
                                        <option key={city} value={city} className="bg-slate-900">{city}</option>
                                    ))}
                                </select>
                            </div>

                            {(searchTerm || selectedCity) && (
                                <button
                                    onClick={clearFilters}
                                    className="p-3 text-slate-400 hover:text-white transition-colors"
                                    title="Clear filters"
                                >
                                    <FilterX className="w-5 h-5" />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Now Playing Section Header */}
            {!loading && movies.length > 0 && (
                <div className="flex items-center justify-between px-2">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <PlayCircle className="w-6 h-6 text-indigo-400" />
                        Now Playing in Cinemas
                    </h2>
                    <span className="text-sm text-slate-400 font-medium">
                        Showing {filteredMovies.length} movies
                    </span>
                </div>
            )}

            {/* Movie Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {!loading && filteredMovies.map(movie => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>

            {!loading && filteredMovies.length === 0 && (
                <div className="text-center py-20">
                    <div className="bg-slate-800/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-8 h-8 text-slate-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-300">No movies found</h3>
                    <p className="text-slate-500 mt-2">Try adjusting your filters or search term</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
