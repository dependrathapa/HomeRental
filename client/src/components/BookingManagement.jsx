import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Fetch bookings from backend
        const fetchBookings = async () => {
            const response = await fetch('/bookings');  // Adjust the endpoint as necessary
            const data = await response.json();
            setBookings(data);
        };
        fetchBookings();
    }, []);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Booking Management</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>User</TableCell>
                            <TableCell>Property</TableCell>
                            <TableCell>Check-in</TableCell>
                            <TableCell>Check-out</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map(booking => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.user.username}</TableCell>
                                <TableCell>{booking.property.name}</TableCell>
                                <TableCell>{booking.checkinDate}</TableCell>
                                <TableCell>{booking.checkoutDate}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default BookingManagement;



