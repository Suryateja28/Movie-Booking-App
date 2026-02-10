import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { cinemas } from '../data/cinemas';
import { MapPin, ChevronLeft, Building2, Loader2 } from 'lucide-react';

const CinemaListing = () => {
    const { movieId } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await movieService.getMovieDetails(movieId);
                setMovie(data);
            } catch (error) {
                console.error("Failed to fetch movie details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMovie();
    }, [movieId]);

    if (loading) return (
        <div className="flex items-center justify-center py-40">
            <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
        </div>
    );
    if (!movie) return <div className="text-center py-20 font-bold text-slate-400">Movie not found</div>;

    // For demo, we show cinemas in the same city or mapped cinemas
    const availableCinemas = cinemas.filter(cinema =>
        cinema.movieIds.includes(parseInt(movieId)) || cinema.location === movie.city
    );

    return (
        <div className="max-w-4xl mx-auto space-y-12 pb-20">
            {/* Movie Banner/Header */}
            <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden group">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute bottom-6 left-8 right-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-4 font-medium transition-colors">
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Back to Movies
                        </Link>
                        <h1 className="text-4xl font-black text-white">{movie.title}</h1>
                        <div className="flex items-center text-slate-300 mt-2">
                            <MapPin className="w-4 h-4 mr-1 text-slate-500" />
                            {movie.city}
                        </div>
                    </div>
                </div>
            </div>

            {/* Cinema List */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Building2 className="w-6 h-6 text-indigo-400" />
                    Select a Cinema
                </h2>

                <div className="grid gap-4">
                    {availableCinemas.length > 0 ? availableCinemas.map(cinema => (
                        <div
                            key={cinema.id}
                            onClick={() => navigate(`/booking/${movieId}/${cinema.id}`)}
                            className="bg-slate-800/40 border border-slate-700 p-6 rounded-2xl flex items-center justify-between hover:border-indigo-500/50 hover:bg-slate-800/60 transition-all cursor-pointer group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-slate-700/50 p-3 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                                    <Building2 className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">
                                        {cinema.name}
                                    </h3>
                                    <div className="text-slate-400 text-sm flex items-center">
                                        <MapPin className="w-3 h-3 mr-1" />
                                        {cinema.location}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-indigo-600/10 text-indigo-400 px-4 py-2 rounded-lg font-bold border border-indigo-500/20 opacity-0 group-hover:opacity-100 transition-opacity">
                                Book Tickets
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-10 bg-slate-800/20 rounded-2xl border border-dashed border-slate-700">
                            <p className="text-slate-500">No cinemas available for this movie yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CinemaListing;
