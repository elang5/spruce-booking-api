const app = require('../src/app');
const knex = require('knex');
const BookingService = require('../src/bookings/bookings-service');
const helpers = require('./test-helpers')

describe('Bookings Endpoint', () => {
  let db;
  const testBookings = helpers.makeBookingsArray()

  before(`initiate knex instance`, () => {
    db = knex({
      client: 'mysql',
      connection: {
        host: `${process.env.MIGRATION_DB_HOST}`,
        user: `${process.env.MIGRATION_DB_USER}`,
        password: `${process.env.MIGRATION_DB_PASSWORD}`,
        database: `${process.env.MIGRATION_DB_NAME}`
      }
    });
    app.set('db', db);
  })

  after('disconnect from db', () => db.destroy());

  before('cleanup tables', () => helpers.cleanTables(db));

  afterEach('cleanup tables', () => helpers.cleanTables(db));

  context('Given there are no videos', () => {
    it('GET /api/bookings responds with 200 and an empty array', () => {
      return supertest(app)
        .get('/api/bookings')
        .expect(200, [])
    })
  })

  context('Given there are videos', () => {
    beforeEach('insert bookings', () => {
      helpers.seedBookings(db, testBookings)
    })
    
    it('GET /api/bookings responds with 200 and all bookings in the DB', async () => {
      const bookings = await BookingService.getAllBookings(db);
      return supertest(app)
        .get('/api/bookings')
        .expect(200, JSON.stringify(bookings))
    })  

    it('POST /api/booking posts a booking and responds with 201 and the new booking', () => {
      const newBooking = {
        name: 'Test',
        email: 'test@gmail.com',
        address: '2314 Anything St',
        city: 'St Louis',
        state: 'MI',
        zip: '89201',
        bookingtype: 'dogwalk',
        datetime: '2015-05-03 02:21:21'
      }
      return supertest(app)
        .post('/api/bookings')
        .set('Authorization', `Basic ${process.env.API_TOKEN}`)
        .send(newBooking)
        .expect(201, newBooking)
    })

    const requiredFields = ['name', 'email', 'city', 'state', 'zip', 'address', 'bookingtype', 'datetime']

    requiredFields.forEach(field => {
      const newBooking = {
        name: 'Test',
        email: 'test@gmail.com',
        address: '2314 Anything St',
        city: 'St Louis',
        state: 'MI',
        zip: '89201',
        bookingtype: 'dogwalk',
        datetime: '2015-05-03 02:21:21'
      }

      it(`Responds with 400 and an error message when the ${field} is missing`, () => {
        delete newBooking[field]
        
        return supertest(app)
          .post('/api/bookings')
          .set('Authorization', `Basic ${process.env.API_TOKEN}`)
          .send(newBooking)
          .expect(400, { error: `Missing '${field}' in request body` })
      })
    })
  })
})