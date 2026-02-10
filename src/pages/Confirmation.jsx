import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Building2, Ticket, ArrowLeft, CreditCard } from 'lucide-react';

const Confirmation = () => {
    const location = useLocation();
    const booking = location.state?.booking;

    if (!booking) return <Navigate to="/" />;

    return (
        <div className="max-w-xl mx-auto py-10">
            <div className="bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md">
                {/* Success Header */}
                <div className="bg-emerald-500/10 border-b border-emerald-500/20 p-8 text-center space-y-4">
                    <div className="bg-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20 animate-bounce">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-white">Booking Successful!</h1>
                    <p className="text-emerald-400 font-medium">Your ticket has been successfully booked.</p>
                </div>

                {/* Ticket Details */}
                <div className="p-8 space-y-6">
                    <div className="flex justify-between items-center pb-6 border-b border-slate-700/50">
                        <div className="space-y-1">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Booking ID</span>
                            <p className="text-lg font-mono text-indigo-400">#BK-{booking.id.toString().slice(-6)}</p>
                        </div>
                        <Ticket className="w-12 h-12 text-slate-700" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-slate-700/50 p-2 rounded-lg">
                                    <Ticket className="w-4 h-4 text-indigo-400" />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 block uppercase">Movie</span>
                                    <p className="font-bold text-white">{booking.movie}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-slate-700/50 p-2 rounded-lg">
                                    <Building2 className="w-4 h-4 text-indigo-400" />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 block uppercase">Cinema</span>
                                    <p className="font-bold text-white">{booking.cinema}</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-slate-700/50 p-2 rounded-lg">
                                    <Calendar className="w-4 h-4 text-indigo-400" />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 block uppercase">Date</span>
                                    <p className="font-bold text-white">{booking.date}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="mt-1 bg-slate-700/50 p-2 rounded-lg">
                                    <Clock className="w-4 h-4 text-indigo-400" />
                                </div>
                                <div>
                                    <span className="text-xs text-slate-500 block uppercase">Time</span>
                                    <p className="font-bold text-white">{booking.time}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-700/50">
                        <div className="flex items-start gap-3">
                            <div className="mt-1 bg-slate-700/50 p-2 rounded-lg">
                                <MapPin className="w-4 h-4 text-indigo-400" />
                            </div>
                            <div>
                                <span className="text-xs text-slate-500 block uppercase">Location</span>
                                <p className="font-bold text-white">{booking.city}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Button */}
                <div className="p-8 pt-0">
                    <Link
                        to="/"
                        className="w-full bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        Return to Dashboard
                    </Link>
                </div>
            </div>

            <div className="mt-8 text-center text-slate-500 text-sm">
                A confirmation has been saved to your local storage.
            </div>
        </div>
    );
};

export default Confirmation;
