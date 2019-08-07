const express = require('express');
const BookingService = require('./bookings-service');
const requireAuth = require('../auth/auth');
const bookingsRouter = express.Router();
const jsonBodyParser = express.json();

bookingsRouter
  .route('/')
  .get(async (req, res, next) => {
    try {
      const bookings = await BookingService.getAllBookings(req.app.get('db'))
      res.status(200).json(bookings)
    }
    catch(error) {
      res.status(400).json(error.message)
      next()
    }
  })
  .post(requireAuth, jsonBodyParser, async (req, res, next) => {
    const { name, email, city, state, zip, address, bookingtype, datetime } = req.body;
    let newBooking = { name, email, city, state, zip, address, bookingtype, datetime };

    // Ensure no fields are missing
    for (const [key, value] of Object.entries(newBooking))
      if (value == null)
        return res.status(400).json({
          error: `Missing '${key}' in request body`
      })

    try {
      await BookingService.insertBooking(req.app.get('db'), newBooking)
      res.status(201).json(newBooking)
    } catch (error) {
      res.status(400).json(error.message)
      next()
    }
  })

module.exports = bookingsRouter