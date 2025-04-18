const router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/Listing");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Middleware: Admin Token Verification
const verifyAdmin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No or malformed token provided" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded:: ", decoded);

        const user = await User.findById(decoded.id);
        console.log("user::", user);
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        req.admin = user;
        next();
    } catch (error) {
        console.error("Auth Error:", error.message);
        res.status(403).json({ message: "Invalid token", error: error.message });
    }
};

/* Configuration Multer for File Upload */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    },
});

const upload = multer({ storage });

/* Middleware to log incoming requests */
router.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.path}`);
    next();
});

/* CREATE LISTING */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        } = req.body;

        const listingPhotos = req.files;

        if (!listingPhotos) {
            return res.status(400).send("No file uploaded.");
        }

        const listingPhotoPaths = listingPhotos.map((file) => file.path);

        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        });

        await newListing.save();

        res.status(200).json(newListing);
    } catch (err) {
        res.status(409).json({ message: "Failed to create Listing", error: err.message });
        console.error(err);
    }
});

/* GET LISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
    const qCategory = req.query.category;

    try {
        let listings;
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator");
        } else {
            listings = await Listing.find().populate("creator");
        }

        res.status(200).json(listings);
    } catch (err) {
        res.status(404).json({ message: "Failed to fetch listings", error: err.message });
        console.error(err);
    }
});

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
    const { search } = req.params;

    try {
        let listings = [];

        if (search === "all") {
            listings = await Listing.find().populate("creator");
        } else {
            listings = await Listing.find({
                $or: [
                    { category: { $regex: search, $options: "i" } },
                    { title: { $regex: search, $options: "i" } },
                ],
            }).populate("creator");
        }

        res.status(200).json(listings);
    } catch (err) {
        res.status(404).json({ message: "Failed to fetch listings", error: err.message });
        console.error(err);
    }
});

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params;
        const listing = await Listing.findById(listingId).populate("creator");
        res.status(202).json(listing);
    } catch (err) {
        res.status(404).json({ message: "Listing cannot be found!", error: err.message });
    }
});

/* APPROVE LISTING */
router.patch('/:id/approve', verifyAdmin, async (req, res) => {
    console.log('testing')
    try {
        const { id } = req.params;
        const listing = await Listing.findByIdAndUpdate(id, { approved: true }, { new: true });
        res.status(200).json({ message: "Listing approved", listing });
    } catch (err) {
        res.status(500).json({ message: "Failed to approve listing", error: err.message });
    }
});

/* REJECT LISTING */
router.patch('/:id/reject', verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const listing = await Listing.findByIdAndUpdate(id, { approved: false }, { new: true });
        res.status(200).json({ message: "Listing rejected", listing });
    } catch (err) {
        res.status(500).json({ message: "Failed to reject listing", error: err.message });
    }
});

/* DELETE LISTING (Admin Only) */
router.delete("/properties/:id", verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedListing = await Listing.findByIdAndDelete(id);
        res.status(200).json({ message: "Listing deleted", deletedListing });
    } catch (err) {
        res.status(500).json({ message: "Failed to delete listing", error: err.message });
    }
});

module.exports = router;
