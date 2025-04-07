// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");

// const User = require("../models/User");

// // Configuration multer for file uplaod
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/uploads/") // Store uploaded files in the 'uploads' folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname) //Use the original file name
//     }
// })

// const upload = multer({ storage })

// // User registration 
// router.post("/register", upload.single('profileImage'), async (req, res) => {
//     try {
//         // Take all information from the form
//         const { firstName, lastName, email, password } = req.body

//         // The uploaded file is available as req.file
//         const profileImage = req.file

//         if (!profileImage) {
//             return res.status(400).send("No file uploaded")
//         }

//         /* path to the uploaded profile photo */
//         const profileImagePath = profileImage.path

//         /* check if user exists */
//         const existingUser = await User.findOne({ email })
//         if (existingUser) {
//             return res.status(409).json({ message: "User already exists!" })
//         }

//         /* Hash the password */
//         const salt = await bcrypt.genSalt()
//         const hashedPassword = await bcrypt.hash(password, salt)

//         /* Create a new User  */
//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             profileImagePath,
//         });

//         /* Save the new User */
//         await newUser.save()

//         /* Send a successful message */
//         res.status(200).json({ message: "User registered successfully!", user: newUser })
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ message: "Registration failed!", error: err.message })
//     }
// })

// /* USER LOGIN*/
// router.post("/login", async (req, res) => {
//     try {
//         /* Take the infomation from the form */
//         const { email, password } = req.body

//         /* Check if user exists */
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(409).json({ message: "User doesn't exist!" });
//         }

//         /* Compare the password with the hashed password */
//         const isMatch = await bcrypt.compare(password, user.password)
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid Credentials!" })
//         }

//         /* Generate JWT token */
//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
//         delete user.password

//         res.status(200).json({ token, user })

//     } catch (err) {
//         console.log(err)
//         res.status(500).json({ error: err.message })
//     }
// })

// module.exports = router

//try for admin role
// const router = require("express").Router();
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const User = require("../models/User");

// // Middleware to check admin access
// const checkAdmin = (req, res, next) => {
//     if (req.user.role !== 'admin') {
//         return res.status(403).send('Access denied.');
//     }
//     next();
// };

// // Configuration for multer file upload
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname); // Use the original file name
//     }
// });

// const upload = multer({ storage });

// // User registration 
// router.post("/register", upload.single('profileImage'), async (req, res) => {
//     try {
//         const { firstName, lastName, email, password } = req.body;
//         const profileImage = req.file;

//         if (!profileImage) {
//             return res.status(400).send("No file uploaded");
//         }

//         const profileImagePath = profileImage.path;

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: "User already exists!" });
//         }

//         const salt = await bcrypt.genSalt();
//         const hashedPassword = await bcrypt.hash(password, salt);

//         const newUser = new User({
//             firstName,
//             lastName,
//             email,
//             password: hashedPassword,
//             profileImagePath,
//             role: 'user', // Default role
//         });

//         await newUser.save();
//         res.status(200).json({ message: "User registered successfully!", user: newUser });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: "Registration failed!", error: err.message });
//     }
// });

// /* USER LOGIN */
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(409).json({ message: "User doesn't exist!" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: "Invalid Credentials!" });
//         }

//         // Generate JWT token including the user's role
//         const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
//         delete user.password; // Remove password from user object before sending

//         res.status(200).json({ token, user });
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: err.message });
//     }
// });

// // Export the router
// module.exports = router;

//try2
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");

// Configuration for multer file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/"); // Store uploaded files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage });

// User registration 
router.post("/register", upload.single('profileImage'), async (req, res) => {
    try {
        // Take all information from the form
        const { firstName, lastName, email, password, role } = req.body; // Added role

        // The uploaded file is available as req.file
        const profileImage = req.file;

        if (!profileImage) {
            return res.status(400).send("No file uploaded");
        }

        /* Path to the uploaded profile photo */
        const profileImagePath = profileImage.path;

        /* Check if user exists */
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists!" });
        }

        /* Hash the password */
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        /* Create a new User */
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath,
            role: role === 'admin' ? 'admin' : 'user', // Set role based on input
        });

        /* Save the new User */
        await newUser.save();

        /* Send a successful message */
        res.status(200).json({ message: "User registered successfully!", user: newUser });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration failed!", error: err.message });
    }
});

/* USER LOGIN */
router.post("/login", async (req, res) => {
    try {
        /* Take the information from the form */
        const { email, password, role } = req.body; // Include role in login request

        /* Check if user exists */
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "User doesn't exist!" });
        }

        /* Compare the password with the hashed password */
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        /* Validate the role if provided */
        if (role && user.role !== role) {
            return res.status(403).json({ message: "Unauthorized role for this account!" });
        }

        /* Generate JWT token */
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET); // Include role in token
        delete user.password;

        console.log("token:: ",token);

        res.status(200).json({ token, user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;