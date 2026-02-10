import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Globe, Calendar } from 'lucide-react';

const MovieCard = ({ movie }) => {
    const navigate = useNavigate();
    const [imgSrc, setImgSrc] = useState(movie.poster);

    const handleError = () => {
        setImgSrc('https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop');
    };

    return (
        <div
            onClick={() => navigate(`/cinema/${movie.id}`)}
            className="group relative bg-slate-800/40 rounded-2xl overflow-hidden border border-slate-700 hover:border-indigo-500/50 transition-all cursor-pointer hover:shadow-2xl hover:shadow-indigo-500/10 active:scale-[0.98]"
        >
            <div className="aspect-[2/3] overflow-hidden bg-slate-800">
                <img
                    src={imgSrc}
                    alt={movie.title}
                    onError={handleError}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                        {movie.title}
                    </h3>
                    <div className="flex items-center bg-slate-900/80 px-2 py-1 rounded-lg border border-slate-700">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-sm font-bold text-yellow-500">{movie.rating}</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 text-slate-400 text-sm">
                    <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1.5 opacity-60" />
                        {movie.year}
                    </div>
                    <div className="flex items-center">
                        <Globe className="w-4 h-4 mr-1.5 opacity-60" />
                        {movie.language}
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/50">
                    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {movie.city}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
