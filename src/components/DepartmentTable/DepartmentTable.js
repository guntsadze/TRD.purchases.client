import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Snackbar, Alert, AlertTitle, IconButton, Modal, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';

function DepartmentTable() {
    const [data, setData] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [newDepartmentName, setNewDepartmentName] = useState('');
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

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

    const handleAddDepartment = async () => {
        if (!newDepartmentName.trim()) {
            setErrorAlertOpen(true);
            return;
        }
    
        const newId = uuidv4();
        const newDepartment = { id: newId, depName: newDepartmentName };
    
        try {
            await axios.post('http://localhost:5269/api/departments', newDepartment);
            setNewDepartmentName('');
            handleCloseModal();
            fetchDepartments();
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };


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

    const handleOpenModal = () => {
        setOpenModal(true);
        setNewDepartmentName('');
    };

    const handleCloseModal = () => {
        setOpenModal(false);
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
        <div style={{ height: 400, width: '100%' }}>
            <div>
                <Button 
                    style={{
                        marginTop:'1%',
                        marginBottom:'1%',
                        marginLeft:'1%'
                    }}
                    onClick={handleOpenModal} 
                    variant="contained" 
                    color="primary">
                    დეპარტამენტის დამატება
                </Button>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                style={{
                    backgroundColor: 'white',
                    width: '30%',
                    height:'25%',
                    margin: 'auto',
                    opacity: '0.95',
                }}
            >
                <div 
                    style={{
                        backgroundColor: 'white',
                        width:'100%',
                        height:'100%',
                        padding: '20px',
                        borderRadius: '20px',
                        border:"1px solid black"
                    }}
                    className="modal-content">
                    <h2>დეპარტამენტის სახელი</h2>
                    <TextField
                        style={{paddingBottom:"20px"}}
                        label="შეიყვანეთ დეპარტამენტის სახელი"
                        value={newDepartmentName}
                        onChange={(e) => setNewDepartmentName(e.target.value)}
                        fullWidth
                    />
                    <Button 
                        style={{
                            float:'right',
                            width:'30%'
                        }}
                        onClick={handleAddDepartment} 
                        variant="contained" 
                        color="primary">
                        შენახვა
                    </Button>
                </div>
            </Modal>
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
                onSelectionModelChange={(newSelection) => {
                    setNewDepartmentName('');
                }}
                selectionModel={[]}
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
