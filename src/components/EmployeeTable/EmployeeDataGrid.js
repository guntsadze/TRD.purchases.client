import React, { useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import {Alert, 
        AlertTitle, 
        Button, 
        Dialog, 
        DialogActions, 
        DialogContent, 
        DialogTitle, 
        IconButton, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function EmployeeDataGrid({ data, fetchEmployees, departments }) {
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    const handleRowEdit = async (newRow) => {
        try {
            await axios.put(`http://localhost:5269/api/employees/${newRow.id}`, newRow);
            fetchEmployees();
        } catch (error) {
            console.error('Error editing employee:', error);
        }
    };

    const handleRowDelete = (id) => {
        setDeleteItemId(id);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`http://localhost:5269/api/employees/${deleteItemId}`);
            setDeleteConfirmationOpen(false);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleDeleteCanceled = () => {
        setDeleteConfirmationOpen(false);
    };
    const columns = [
        { field: 'firstName', headerName: 'სახელი', width: 150, editable: true },
        { field: 'lastName', headerName: 'გვარი', width: 150, editable: true },
        { field: 'position', headerName: 'პოზიცია', width: 150, editable: true },
        { field: 'departmentId', headerName: 'დეპარტამენტი', width: 200,
            renderCell: (params) => {
                const department = departments.find(dep => dep.id === params.value);
                return department ? department.depName : '';
            }
        },
        { field: 'personalNumber', headerName: 'პირადი ნომერი', width: 200 },
        { field: 'edit', headerName: 'რედაქტირება', width: 110,
            renderCell: (params) => (
                <IconButton onClick={() => handleRowEdit(params.row)} color="primary" aria-label="edit">
                    <EditIcon />
                </IconButton>
            ),
        },
        { field: 'delete', headerName: 'წაშლა', width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleRowDelete(params.row.id)} color="secondary" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <>
        <Dialog open={deleteConfirmationOpen} 
                onClose={handleDeleteCanceled}>
            <DialogTitle>თანამშრომლის წაშლა</DialogTitle>
            <DialogContent>
                <Alert severity="warning">
                    <AlertTitle>შეტყობინება</AlertTitle>
                    დარწმუნებული ხართ რომ გსურთ თანამშრომლის წაშლა?
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteConfirmed} 
                        color="primary">
                        წაშლა
                </Button>
                <Button onClick={handleDeleteCanceled} 
                        color="primary" autoFocus>
                        გაუქმება
                </Button>
            </DialogActions>
        </Dialog>
        <DataGrid
            style={{
                width:'80vw',
                marginLeft:'2%',
            }}
            rows={data}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableSelectionOnClick
        />
        </>
    );
}

export default EmployeeDataGrid;
