// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

// const PropertyApproval = () => {
//     const [properties, setProperties] = useState([]);

//     useEffect(() => {
//         // Fetch properties from backend
//         const fetchProperties = async () => {
//             const response = await fetch('/properties');  // Adjust the endpoint as necessary
//             const data = await response.json();
//             setProperties(data);
//         };
//         fetchProperties();
//     }, []);

//     const handleApprove = async (id) => {
//         await fetch(`/properties/${id}/approve`, { method: 'PATCH' });
//         setProperties(properties.filter(property => property._id !== id)); // Optionally refetch properties
//     };

//     const handleReject = async (id) => {
//         await fetch(`/properties/${id}/reject`, { method: 'PATCH' });
//         setProperties(properties.filter(property => property._id !== id)); // Optionally refetch properties
//     };

//     return (
//         <Container>
//             <Typography variant="h4" gutterBottom>Property Approval</Typography>
//             <TableContainer>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Property Name</TableCell>
//                             <TableCell>Actions</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {properties.map(property => (
//                             <TableRow key={property._id}>
//                                 <TableCell>{property.name}</TableCell>
//                                 <TableCell>
//                                     <Button onClick={() => handleApprove(property._id)}>Approve</Button>
//                                     <Button onClick={() => handleReject(property._id)}>Reject</Button>
//                                 </TableCell>
//                             </TableRow>
//                         ))}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </Container>
//     );
// };

// export default PropertyApproval;

import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, CircularProgress, Snackbar } from '@mui/material';
import { Alert } from '@mui/material'; // Correct import for Alert

const PropertyApproval = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch('http://localhost:3001/properties');
                if (!response.ok) {
                    throw new Error('Failed to fetch properties');
                }
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/properties/${id}/approve`, {
                headers:{
                    'Authorization': `Bearer ${token}`,
                },
                method: 'PATCH',
            });

            if (response.ok) {
                setProperties(properties.map(property =>
                    property._id === id ? { ...property, approved: true } : property
                ));
                setFeedbackMessage('Property approved successfully!');
            } else {
                setFeedbackMessage('Failed to approve the property');
            }
        } catch (error) {
            console.error('Error approving property:', error);
            setFeedbackMessage('Error occurred while approving the property');
        } finally {
            setOpenSnackbar(true);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/properties/${id}/reject`, {
                headers:{
                    'Authorization': `Bearer ${token}`,
                },
                method: 'PATCH',
            });

            if (response.ok) {
                setProperties(properties.map(property =>
                    property._id === id ? { ...property, approved: false } : property
                ));
                setFeedbackMessage('Property rejected successfully!');
            } else {
                setFeedbackMessage('Failed to reject the property');
            }
        } catch (error) {
            console.error('Error rejecting property:', error);
            setFeedbackMessage('Error occurred while rejecting the property');
        } finally {
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>Property Approval</Typography>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container>
                <Typography variant="h4" gutterBottom>Error</Typography>
                <Typography variant="body1">{error}</Typography>
            </Container>
        );
    }

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
                        {properties.map((property) => (
                            <TableRow key={property._id}>
                                <TableCell>{property.title}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() => handleApprove(property._id)}
                                        variant="contained"
                                        color={property.approved ? 'success' : 'primary'}
                                        style={{ marginRight: 8 }}
                                        disabled={property.approved === true} // Disable if already approved
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        onClick={() => handleReject(property._id)}
                                        variant="contained"
                                        color={property.approved === false ? 'error' : 'secondary'}
                                        disabled={property.approved === true} // Disable if already approved
                                    >
                                        Reject
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Snackbar for feedback */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {feedbackMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default PropertyApproval;
