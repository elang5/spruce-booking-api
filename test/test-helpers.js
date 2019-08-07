function makeBookingsArray() {
  return [
    {
      id: 1,
      name: 'Test 1',
      email: 'test@gmail.com',
      address: '2314 Anything St',
      city: 'St Louis',
      state: 'MI',
      zip: '89201',
      bookingtype: 'dogwalk',
      datetime: '2015-05-03 02:21:21'
    },
    {
      id: 2,
      name: 'Test 2',
      email: 'test@gmail.com',
      address: '2314 Anything St',
      city: 'St Louis',
      state: 'MI',
      zip: '89201',
      bookingtype: 'dogwalk',
      datetime: '2015-05-03 02:21:21'
    },
    {
      id: 3,
      name: 'Test 3',
      email: 'test@gmail.com',
      address: '2314 Anything St',
      city: 'St Louis',
      state: 'MI',
      zip: '89201',
      bookingtype: 'dogwalk',
      datetime: '2015-05-03 02:21:21'
    }
  ]
}

function seedBookings(db, booking) {
  return db
    .insert(booking)
    .into('bookings')
    .then(() => {})
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE TABLE bookings`
  );
}

module.exports = {
  makeBookingsArray,
  seedBookings,
  cleanTables
}