// const router = require("express").Router()

// const Booking = require("../models/Booking")

// /* CREATE BOOKING */
// router.post("/create", async (req, res) => {
//   try {
//     const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
//     const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice })
//     await newBooking.save()
//     res.status(200).json(newBooking)
//   } catch (err) {
//     console.log(err)
//     res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
//   }
// })

// module.exports = router


// const router = require("express").Router();
// const Booking = require("../models/Booking");
// const User = require("../models/User");

// /* CREATE BOOKING */
// router.post("/create", async (req, res) => {
//   try {
//     const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;
//     const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice });
//     await newBooking.save();
//     res.status(200).json(newBooking);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: "Failed to create a new Booking!", error: err.message });
//   }
// });

// /* DELETE BOOKING */
// router.delete("/:bookingId", async (req, res) => {
//   try {
//     const { bookingId } = req.params;

//     // Find and delete the booking
//     const deletedBooking = await Booking.findByIdAndDelete(bookingId);
//     if (!deletedBooking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // Remove the booking from the user's trip list
//     const user = await User.findById(deletedBooking.customerId);
//     if (user) {
//       user.tripList = user.tripList.filter(
//         (trip) => trip._id.toString() !== bookingId
//       );
//       await user.save();
//     }

//     res.status(200).json({ message: "Booking removed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting booking", error: error.message });
//   }
// });

// module.exports = router;




const router = require("express").Router();
const Booking = require("../models/Booking");
const User = require("../models/User");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

    // Check for overlapping bookings
    const existingBookings = await Booking.find({
      listingId,
      $or: [
        { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { endDate: { $gte: new Date(startDate), $lte: new Date(endDate) } },
      ],
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ message: 'Property is already booked for these dates.' });
    }

    // If no overlaps, create the booking
    const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice });
    await newBooking.save();

    res.status(200).json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to create a new Booking!", error: err.message });
  }
});

/* DELETE BOOKING */
router.delete("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find and delete the booking
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Remove the booking from the user's trip list
    const user = await User.findById(deletedBooking.customerId);
    if (user) {
      user.tripList = user.tripList.filter(
        (trip) => trip._id.toString() !== bookingId
      );
      await user.save();
    }

    res.status(200).json({ message: "Booking removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
});

module.exports = router;