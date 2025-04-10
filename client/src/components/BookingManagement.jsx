import React, { useEffect, useState } from 'react';
import '../styles/BookingManagement.scss';
import {
    Container, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Button, TextField, Dialog,
    DialogActions, DialogContent, DialogTitle
} from "@mui/material";
import axios from "axios";


const BookingManagement = () => {
    const [bookings, setBookings] = useState([]);
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ startDate: "", endDate: "" });
    const [editBooking, setEditBooking] = useState(null); 
    const token = localStorage.getItem("token");


    useEffect(() => {
        // Fetch bookings from backend
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:3001/bookings');  
                const data = await response.json();
                setBookings(data); // Set the bookings data to state
            } catch (error) {
                console.error("Error fetching bookings:", error);
            }
        };

        fetchBookings();
    }, []);

    const handleUpdateBooking = async () => {
        if (
            formData.startDate === editBooking.startDate &&
            formData.endDate === editBooking.endDate
        ) {
            alert("No changes detected.");
            return;
        }

        try {
            const response = await axios.patch(`http://localhost:3001/bookings/${editBooking._id}/update`, formData, {
                headers: { Authorization: `Bearer ${token}`}
            });
            setBookings(bookings.map(b => (b._id === editBooking._id ? response.data : b)));
            setOpen(false);
        } catch (error) {
            console.error("Error updating booking:", error.response?.data || error.message);
        }
    };

    
    return (
        <Container>
            <Typography variant="h4" gutterBottom>Booking Management</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Property</TableCell>
                            <TableCell>Check-in</TableCell>
                            <TableCell>Check-out</TableCell>
                            <TableCell>Total Price</TableCell> {/* Column for Total Price */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bookings.map(booking => (
                            <TableRow key={booking._id}>
                                <TableCell>{booking.listingId?.title}</TableCell>    {/* Display Property Title */}
                                <TableCell>{booking.startDate}</TableCell>  {/* Display Check-in Date */}
                                <TableCell>{booking.endDate}</TableCell>    {/* Display Check-out Date */}
                                <TableCell>{booking.totalPrice}</TableCell>  {/* Display Total Price */}
                                <TableCell><Button onClick={()=>{
                                    setEditBooking(booking)
                                    setOpen(true)
                                }}>Edit</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle>Edit Booking</DialogTitle>
                            <DialogContent>
                                <TextField
                                    fullWidth label="Start Date"
                                    value={formData.startDate}
                                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                    margin="dense"
                                />
                                <TextField
                                    fullWidth label="End Date"
                                    value={formData.endDate}
                                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                    margin="dense"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpen(false)}>Cancel</Button>
                                <Button color="primary" variant="contained" onClick={handleUpdateBooking}>Save</Button>
                            </DialogActions>
                        </Dialog>
        </Container>
    );
};

export default BookingManagement;