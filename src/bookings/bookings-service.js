const BookingService = {
  getAllBookings(db) {
    return db
      .from('bookings')
      .select('*')
      .orderBy('datetime', 'asc')
  },

  insertBooking(db, booking) {
    return db
      .insert(booking)
      .into('bookings')
  },
}

module.exports = BookingService