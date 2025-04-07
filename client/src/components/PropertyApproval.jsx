import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

const PropertyApproval = () => {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        // Fetch properties from backend
        const fetchProperties = async () => {
            const response = await fetch('/properties');  // Adjust the endpoint as necessary
            const data = await response.json();
            setProperties(data);
        };
        fetchProperties();
    }, []);

    const handleApprove = async (id) => {
        await fetch(`/properties/${id}/approve`, { method: 'PATCH' });
        setProperties(properties.filter(property => property._id !== id)); // Optionally refetch properties
    };

    const handleReject = async (id) => {
        await fetch(`/properties/${id}/reject`, { method: 'PATCH' });
        setProperties(properties.filter(property => property._id !== id)); // Optionally refetch properties
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Property Approval</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Property Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {properties.map(property => (
                            <TableRow key={property._id}>
                                <TableCell>{property.name}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleApprove(property._id)}>Approve</Button>
                                    <Button onClick={() => handleReject(property._id)}>Reject</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default PropertyApproval;