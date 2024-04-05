import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Snackbar, 
        Alert, 
        AlertTitle, } from '@mui/material';
import EmployeeFormModal from './EmployeeFormModal';
import EmployeeDataGrid from './EmployeeDataGrid';

function EmployeeTable() {
    const [data, setData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5269/api/employees');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    }; 

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5269/api/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };



    return (
        <div style={{ height: 400, width: '100%' }}>

            <EmployeeFormModal
                fetchEmployees={fetchEmployees}
                departments={departments}
                setErrorAlertOpen={setErrorAlertOpen}
            />

            <EmployeeDataGrid
                data={data}
                fetchEmployees={fetchEmployees}
                departments={departments}
                setErrorAlertOpen={setErrorAlertOpen}
            />


            <Snackbar   open={errorAlertOpen} 
                        autoHideDuration={6000} 
                        onClose={() => setErrorAlertOpen(false)
                        }>
                <Alert  severity="error" 
                        onClose={() => setErrorAlertOpen(false)}>
                        <AlertTitle>შეცდომა</AlertTitle>
                        გთხოვთ შეიყვანოთ სრული ინფორმაცია
                </Alert>
            </Snackbar>
        </div>
    );
}

export default EmployeeTable;