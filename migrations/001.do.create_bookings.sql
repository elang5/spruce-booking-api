CREATE TABLE bookings (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  zip VARCHAR(5) NOT NULL,
  bookingtype ENUM('dogwalk', 'housekeeping') NOT NULL,
  datetime DATETIME NOT NULL
);