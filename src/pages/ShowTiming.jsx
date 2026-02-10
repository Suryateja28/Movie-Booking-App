import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { movieService } from '../services/movieService';
import { cinemas, showTimings } from '../data/cinemas';
import { useAuth } from '../context/AuthContext';
import { Clock, Calendar as CalendarIcon, ChevronLeft, CreditCard, Loader2 } from 'lucide-react';
import { bookingService } from '../services/bookingService';

const ShowTiming = () => {
    const { movieId, cinemaId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const cinema = cinemas.find(c => c.id === parseInt(cinemaId));

    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedTime, setSelectedTime] = useState('');

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
    if (!movie || !cinema) return <div className="text-center py-20 font-bold text-slate-400">Booking info not found</div>;

    const handleBooking = () => {
        if (!selectedTime) return;

        const booking = {
            userId: user.email,
            movie: movie.title,
            city: movie.city,
            cinema: cinema.name,
            date: selectedDate,
            time: selectedTime,
        };

        bookingService.saveBooking(booking);
        navigate('/confirmation', { state: { booking: { ...booking, id: Date.now() } } });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-10 pb-20 px-4">
            <div className="flex items-center gap-4">
                <Link to={`/cinema/${movieId}`} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors shadow-lg">
                    <ChevronLeft className="w-6 h-6" />
                </Link>
                <div>
                    <h1 className="text-3xl font-black text-white">Choose Schedule</h1>
                    <p className="text-slate-400 font-medium">{movie.title} • {cinema.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-10">
                {/* Date Selection */}
                <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 space-y-6 shadow-xl backdrop-blur-md">
                    <label className="flex items-center gap-3 text-white font-bold text-xl">
                        <CalendarIcon className="w-7 h-7 text-indigo-400" />
                        1. Select Booking Date
                    </label>
                    <div className="max-w-sm">
                        <input
                            type="date"
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-6 py-5 text-white text-xl focus:ring-4 focus:ring-indigo-500/20 focus:outline-none transition-all cursor-pointer font-medium"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Time Selection */}
                <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 space-y-8 shadow-xl backdrop-blur-md">
                    <label className="flex items-center gap-3 text-white font-bold text-xl">
                        <Clock className="w-7 h-7 text-indigo-400" />
                        2. Choose Showtime
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
                        {showTimings.map(time => (
                            <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-6 rounded-2xl border-2 font-black text-xl transition-all duration-300 ${selectedTime === time
                                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-2xl shadow-indigo-600/40 scale-105 z-10'
                                        : 'bg-slate-900/50 border-slate-700 text-slate-500 hover:border-slate-500 hover:bg-slate-800'
                                    }`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Confirm Button */}
                <div className="flex justify-center pt-8">
                    <button
                        onClick={handleBooking}
                        disabled={!selectedTime}
                        className={`group px-20 py-7 rounded-3xl font-black text-2xl flex items-center gap-4 transition-all duration-500 ${selectedTime
                                ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-[0_20px_50px_rgba(79,70,229,0.3)] hover:-translate-y-2 active:scale-95'
                                : 'bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700 opacity-50'
                            }`}
                    >
                        <CreditCard className={`w-8 h-8 transition-transform duration-500 ${selectedTime ? 'group-hover:rotate-12' : ''}`} />
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShowTiming;
