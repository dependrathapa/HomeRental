const router = require("express").Router();
const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

    // Normalize dates to prevent time-related conflicts
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);
    newStart.setHours(0, 0, 0, 0);
    newEnd.setHours(23, 59, 59, 999);

    // Check for any overlapping bookings for the same listing
    const existingBookings = await Booking.find({
      listingId,
      startDate: { $lte: newEnd },
      endDate: { $gte: newStart }
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ message: 'Property is already booked for these dates.' });
    }

    // Create the booking
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate: newStart,
      endDate: newEnd,
      totalPrice
    });

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

/* GET ALL BOOKINGS */
router.get("/", async (req, res) => {
  try {
    // Fetch all bookings and populate the customer, host, and listing details
    const bookings = await Booking.find()
      .populate("customerId", "username") // Populate customerId with username
      .populate("hostId", "username") // Populate hostId with username
      .populate("listingId", "title") // Populate listingId with title
      .exec();

    res.status(200).json(bookings);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Failed to fetch bookings!", error: err.message });
  }
});

/* UPDATE BOOKING STATUS */
router.patch("/:bookingId/status", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status field is required" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
});

router.patch("/:bookingId/update", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { startDate,endDate} = req.body;
    console.log(req.body)
    if (!startDate  || !endDate) {
      return res.status(400).json({ message: "Status field is required" });
    }
//TODO: fix if not working
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { startDate, endDate},
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update booking status", error: error.message });
  }
});

module.exports = router;



// const router = require("express").Router();
// const Booking = require("../models/Booking");
// const User = require("../models/User");
// const Listing = require("../models/Listing");

// /* CREATE BOOKING */
// router.post("/create", async (req, res) => {
//   try {
//     const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;

//     // Normalize dates to prevent time-related conflicts
//     const newStart = new Date(startDate);
//     const newEnd = new Date(endDate);
//     newStart.setHours(0, 0, 0, 0);
//     newEnd.setHours(23, 59, 59, 999);

//     // Check for any overlapping bookings for the same listing
//     const existingBookings = await Booking.find({
//       listingId,
//       startDate: { $lte: newEnd },
//       endDate: { $gte: newStart },
//     });

//     if (existingBookings.length > 0) {
//       return res.status(400).json({ message: "Property is already booked for these dates." });
//     }

//     // Create the booking
//     const newBooking = new Booking({
//       customerId,
//       hostId,
//       listingId,
//       startDate: newStart,
//       endDate: newEnd,
//       totalPrice,
//     });

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

// /* GET ALL BOOKINGS */
// router.get("/", async (req, res) => {
//   try {
//     // Fetch all bookings and populate the customer, host, and listing details
//     const bookings = await Booking.find()
//       .populate("customerId", "username") // Populate customerId with username
//       .populate("hostId", "username") // Populate hostId with username
//       .populate("listingId", "title") // Populate listingId with title
//       .exec();

//     res.status(200).json(bookings);
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ message: "Failed to fetch bookings!", error: err.message });
//   }
// });

// /* UPDATE BOOKING STATUS */
// router.patch("/:bookingId/status", async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { status } = req.body;

//     // Validate the status field
//     const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
//     if (!status || !validStatuses.includes(status)) {
//       return res.status(400).json({ message: "Invalid status value. Valid statuses are 'pending', 'confirmed', 'cancelled', and 'completed'." });
//     }

//     // Update the booking status
//     const updatedBooking = await Booking.findByIdAndUpdate(
//       bookingId,
//       { status },
//       { new: true }
//     );

//     if (!updatedBooking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // Respond with updated booking
//     res.status(200).json(updatedBooking);
//   } catch (error) {
//     console.error("Error updating status:", error);
//     res.status(500).json({
//       message: "Failed to update booking status",
//       error: error.message,
//     });
//   }
// });

// module.exports = router;

