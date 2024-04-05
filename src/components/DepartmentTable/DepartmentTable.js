import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Snackbar, Alert, AlertTitle} from '@mui/material';
import DepartmentFormModal from './DepartmentFormModal';
import DepartmentDataGrid from './DepartmentDataGrid';

function DepartmentTable() {
    const [data, setData] = useState([]);
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5269/api/departments');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    return (
        <div style={{ height: 400, width: '100%' }}>

            <DepartmentFormModal 
                fetchDepartments={fetchDepartments}
                setErrorAlertOpen={setErrorAlertOpen}/>

            <DepartmentDataGrid
                fetchDepartments={fetchDepartments}
                data={data}
            />
            
            <Snackbar open={errorAlertOpen} autoHideDuration={6000} onClose={() => setErrorAlertOpen(false)}>
                <Alert severity="error" onClose={() => setErrorAlertOpen(false)}>
                    <AlertTitle>შეცდომა</AlertTitle>
                    გთხოვთ შეიყვანოთ დეპარტამენტის სახელი
                </Alert>
            </Snackbar>
        </div>
    );
}

export default DepartmentTable;
