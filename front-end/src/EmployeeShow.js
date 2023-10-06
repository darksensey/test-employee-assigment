import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, Paper, Grid } from '@mui/material';

import instance from './config/axios-config';

function EmployeeShow() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        name: '',
        salary: 0,
        total: 0,
    });

    const onBack = () => {
        navigate('/');
    };

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get(`/employee/${id}`);
            setEmployee(response.data);
        }
        fetchData();
    }, [id]);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Employee Details
            </Typography>
            <Paper elevation={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Name: {employee.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Salary: {employee.salary}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h6">Total: {employee.total}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <button onClick={onBack}>Back</button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default EmployeeShow;
