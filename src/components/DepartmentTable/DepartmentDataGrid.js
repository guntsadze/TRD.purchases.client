import React, { useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Alert, AlertTitle, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function DepartmentDataGrid({ data, fetchDepartments}) {
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

    const handleRowEdit = async (newRow) => {
        try {
            await axios.put(`http://localhost:5269/api/departments/${newRow.id}`, newRow);
            fetchDepartments();
        } catch (error) {
            console.error('Error editing department:', error);
        }
    };

    const handleRowDelete = (id) => {
        setDeleteItemId(id);
        setDeleteConfirmationOpen(true);
    };

    const handleDeleteConfirmed = async () => {
        try {
            await axios.delete(`http://localhost:5269/api/departments/${deleteItemId}`);
            setDeleteConfirmationOpen(false);
            fetchDepartments();
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    const handleDeleteCanceled = () => {
        setDeleteConfirmationOpen(false);
    };
    const columns = [
        { field:'id', headerName: 'ID' , with: 100, editable:false},
        { field: 'depName', headerName: 'დეპარტამენტი', width: 200, editable: true },
        {
            field: 'edit',
            headerName: 'რედაქტირება',
            width: 150,
            renderCell: (params) => (
                <IconButton onClick={() => handleRowEdit(params.row)} color="primary" aria-label="edit">
                    <EditIcon />
                </IconButton>
            ),
        },
        {
            field: 'delete',
            headerName: 'წაშლა',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleRowDelete(params.row.id)} color="secondary" aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            ),
        },
    ];
    return (
        <>
        <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCanceled}>
            <DialogTitle>დეპარტამენტის წაშლა</DialogTitle>
            <DialogContent>
                <Alert severity="warning">
                    <AlertTitle>შეტყობინება</AlertTitle>
                    გსურთ ამ დეპარტამენტის წაშლა?
                </Alert>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDeleteConfirmed} color="primary">
                    წაშლა
                </Button>
                <Button onClick={handleDeleteCanceled} color="primary" autoFocus>
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
            // onSelectionModelChange={(newSelection) => {
            //     setNewDepartmentName('');
            // }}
            selectionModel={[]}
        />
        </>
    );
}

export default DepartmentDataGrid;
