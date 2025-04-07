// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Typography, Grid, Card, CardContent } from '@mui/material';
// import '../styles/AdminDashboard.scss';

// const AdminDashboard = () => {
//     const [backgroundImage, setBackgroundImage] = useState("");

//     useEffect(() => {
//         // Fetch a random background image from Unsplash or any preferred source
//         const fetchBackground = async () => {
//             try {
//                 const response = await fetch("https://source.unsplash.com/1600x900/?real-estate,office");
//                 setBackgroundImage(response.url);
//             } catch (error) {
//                 console.error("Error fetching background image:", error);
//             }
//         };

//         fetchBackground();
//     }, []);

//     return (
//         <Container style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             <Typography variant="h4" gutterBottom>
//                 Admin Dashboard
//             </Typography>
//             <Grid container spacing={2}>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card className="dashboard-card user-management">
//                         <CardContent>
//                             <Typography variant="h5">User Management</Typography>
//                             <Link to="/admin/users">Manage Users</Link>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card className="dashboard-card property-management">
//                         <CardContent>
//                             <Typography variant="h5">Property Management</Typography>
//                             <Link to="/admin/properties">Approve Properties</Link>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card className="dashboard-card booking-management">
//                         <CardContent>
//                             <Typography variant="h5">Booking Management</Typography>
//                             <Link to="/admin/bookings">Manage Bookings</Link>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//                 <Grid item xs={12} sm={6} md={4}>
//                     <Card className="dashboard-card analytics-reports">
//                         <CardContent>
//                             <Typography variant="h5">Analytics & Reports</Typography>
//                             <Link to="/admin/analytics">View Reports</Link>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// };

// export default AdminDashboard;


// try
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Container, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
// import '../styles/AdminDashboard.scss';

// const AdminDashboard = () => {
//     const [backgroundImage, setBackgroundImage] = useState("");
//     const [stats, setStats] = useState({
//         totalUsers: 0,
//         totalProperties: 0,
//         approvedProperties: 0,
//         rejectedProperties: 0,
//         totalBookings: 0,
//     });
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Fetch a random background image from Unsplash or any preferred source
//         const fetchBackground = async () => {
//             try {
//                 const response = await fetch("https://source.unsplash.com/1600x900/?real-estate,office");
//                 setBackgroundImage(response.url);
//             } catch (error) {
//                 console.error("Error fetching background image:", error);
//             }
//         };

//         // Fetch stats data for the dashboard
//         const fetchStats = async () => {
//             setLoading(true);
//             try {
//                 const [userRes, propertyRes, bookingRes] = await Promise.all([
//                     fetch('/api/users/count'),  // Endpoint to fetch total users
//                     fetch('/api/listings/stats'), // Endpoint to fetch stats about listings
//                     fetch('/api/bookings/count') // Endpoint to fetch total bookings
//                 ]);

//                 const userData = await userRes.json();
//                 const propertyData = await propertyRes.json();
//                 const bookingData = await bookingRes.json();

//                 setStats({
//                     totalUsers: userData.count,
//                     totalProperties: propertyData.total,
//                     approvedProperties: propertyData.approved,
//                     rejectedProperties: propertyData.rejected,
//                     totalBookings: bookingData.count,
//                 });
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching stats:", error);
//                 setLoading(false);
//             }
//         };

//         fetchBackground();
//         fetchStats();
//     }, []);

//     return (
//         <Container style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
//             <Typography variant="h4" gutterBottom>
//                 Admin Dashboard
//             </Typography>

//             {loading ? (
//                 <CircularProgress />
//             ) : (
//                 <Grid container spacing={2}>
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card className="dashboard-card user-management">
//                             <CardContent>
//                                 <Typography variant="h5">User Management</Typography>
//                                 <Typography variant="body1">Total Users: {stats.totalUsers}</Typography>
//                                 <Link to="/admin/users">Manage Users</Link>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card className="dashboard-card property-management">
//                             <CardContent>
//                                 <Typography variant="h5">Property Management</Typography>
//                                 <Typography variant="body1">Total Properties: {stats.totalProperties}</Typography>
//                                 <Typography variant="body1">Approved: {stats.approvedProperties}</Typography>
//                                 <Typography variant="body1">Rejected: {stats.rejectedProperties}</Typography>
//                                 <Link to="/admin/properties">Approve Properties</Link>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card className="dashboard-card booking-management">
//                             <CardContent>
//                                 <Typography variant="h5">Booking Management</Typography>
//                                 <Typography variant="body1">Total Bookings: {stats.totalBookings}</Typography>
//                                 <Link to="/admin/bookings">Manage Bookings</Link>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                     <Grid item xs={12} sm={6} md={4}>
//                         <Card className="dashboard-card analytics-reports">
//                             <CardContent>
//                                 <Typography variant="h5">Analytics & Reports</Typography>
//                                 <Link to="/admin/analytics">View Reports</Link>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 </Grid>
//             )}
//         </Container>
//     );
// };

// export default AdminDashboard;




//final try 
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CircularProgress } from '@mui/material';
import axios from 'axios';
import '../styles/AdminDashboard.scss';

const AdminDashboard = () => {
    const [backgroundImage, setBackgroundImage] = useState("");
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalProperties: 0,
        approvedProperties: 0,
        rejectedProperties: 0,
        totalBookings: 0,
    });
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("token");  // Retrieve token from localStorage or wherever you store it

    // Fetch a random background image from Unsplash or any preferred source
    const fetchBackground = async () => {
        try {
            const response = await fetch("https://source.unsplash.com/1600x900/?real-estate,office");
            setBackgroundImage(response.url);
        } catch (error) {
            console.error("Error fetching background image:", error);
        }
    };

    // Fetch stats data for the dashboard
    const fetchStats = async () => {
        setLoading(true);
        try {
            const [userRes, propertyRes, bookingRes] = await Promise.all([
                axios.get('/api/users/count', { headers: { Authorization: `Bearer ${token}` } }),  // Endpoint to fetch total users
                axios.get('/api/listings/stats', { headers: { Authorization: `Bearer ${token}` } }), // Endpoint to fetch stats about listings
                axios.get('/api/bookings/count', { headers: { Authorization: `Bearer ${token}` } }) // Endpoint to fetch total bookings
            ]);

            const userData = userRes.data;
            const propertyData = propertyRes.data;
            const bookingData = bookingRes.data;

            setStats({
                totalUsers: userData.count,
                totalProperties: propertyData.total,
                approvedProperties: propertyData.approved,
                rejectedProperties: propertyData.rejected,
                totalBookings: bookingData.count,
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching stats:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBackground();
        fetchStats();
    }, [token]);

    return (
        <Container style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <Typography variant="h4" gutterBottom>
                Admin Dashboard
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="dashboard-card user-management">
                            <CardContent>
                                <Typography variant="h5">User Management</Typography>
                                <Typography variant="body1">Total Users: {stats.totalUsers}</Typography>
                                <Link to="/admin/users">Manage Users</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="dashboard-card property-management">
                            <CardContent>
                                <Typography variant="h5">Property Management</Typography>
                                <Typography variant="body1">Total Properties: {stats.totalProperties}</Typography>
                                <Typography variant="body1">Approved: {stats.approvedProperties}</Typography>
                                <Typography variant="body1">Rejected: {stats.rejectedProperties}</Typography>
                                <Link to="/admin/properties">Approve Properties</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="dashboard-card booking-management">
                            <CardContent>
                                <Typography variant="h5">Booking Management</Typography>
                                <Typography variant="body1">Total Bookings: {stats.totalBookings}</Typography>
                                <Link to="/admin/bookings">Manage Bookings</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className="dashboard-card analytics-reports">
                            <CardContent>
                                <Typography variant="h5">Analytics & Reports</Typography>
                                <Link to="/admin/analytics">View Reports</Link>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default AdminDashboard;
