import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Card, CardContent, Typography, List, ListItem, ListItemText, Badge, Chip} from '@mui/material';

import instance from "./config/axios-config";

function EmployeeList() {
    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await instance.get('/employee');
            setEmployees(response.data);
        }
        fetchData();
    }, []);

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Employees
            </Typography>
            <List>
                {employees.length > 0 ? (
                    employees.map((employee) => (
                        <ListItem
                            key={employee.id}
                            button
                            onClick={() => navigate(`/employee/${employee.id}`)}
                        >
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {employee.name}
                                    </Typography>
                                    <Typography variant="body2" component="div">
                                        <Chip label={`Salary: ${employee.salary}`} />
                                        <Chip label={`Total: ${employee.total}`} />
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ListItem>
                    ))
                ) : (
                    <div>Empty list.</div>
                )}
            </List>
        </div>
    );
}

export default EmployeeList;
