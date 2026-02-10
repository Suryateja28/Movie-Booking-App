// Storage Service for handling LocalStorage operations

const STORAGE_KEYS = {
    USERS: 'users',
    CURRENT_USER: 'currentUser',
    BOOKINGS: 'bookings'
};

export const bookingService = {
    // User operations
    getUsers: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),

    saveUser: (user) => {
        const users = bookingService.getUsers();
        users.push(user);
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    },

    getCurrentUser: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_USER)),

    setCurrentUser: (user) => {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    },

    clearCurrentUser: () => {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    },

    // Booking operations
    getBookings: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.BOOKINGS) || '[]'),

    saveBooking: (booking) => {
        const bookings = bookingService.getBookings();
        bookings.push({
            ...booking,
            id: Date.now(),
            timestamp: new Date().toISOString()
        });
        localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
    }
};
