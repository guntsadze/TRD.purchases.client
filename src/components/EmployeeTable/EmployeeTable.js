import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, TextField, Snackbar, Alert, AlertTitle, IconButton, MenuItem, Select, Modal, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { v4 as uuidv4 } from 'uuid';

function EmployeeTable() {
    const [data, setData] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [errorAlertOpen, setErrorAlertOpen] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);

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

    const handleAddEmployee = async () => {
        if (!firstName.trim() || !lastName.trim() || !position.trim() || !selectedDepartment.trim()) {
            setErrorAlertOpen(true);
            return;
        }
    
        const newId = uuidv4();
        const newEmployee = { id: newId, firstName: firstName, lastName: lastName, position: position, departmentId: selectedDepartment };
    
        try {
            await axios.post('http://localhost:5269/api/employees', newEmployee);
            setFirstName('');
            setLastName('');
            setPosition('');
            setSelectedDepartment('');
            handleCloseModal();
            fetchEmployees();
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

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

    const handleOpenModal = () => {
        setOpenModal(true);
        setFirstName('');
        setLastName('');
        setPosition('');
        setSelectedDepartment('');
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const columns = [
        // { field:'id', headerName: 'ID' , width: 100, editable:false},
        { field: 'firstName', headerName: 'სახელი', width: 150, editable: true },
        { field: 'lastName', headerName: 'გვარი', width: 150, editable: true },
        { field: 'position', headerName: 'პოზიცია', width: 150, editable: true },
        {
            field: 'departmentId',
            headerName: 'დეპარტამენტი',
            width: 200,
            renderCell: (params) => {
                const department = departments.find(dep => dep.id === params.value);
                return department ? department.depName : '';
            }
        },
        {
            field: 'edit',
            headerName: 'რედაქტირება',
            width: 110,
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
                    თანამშრომლის დამატება
                </Button>
            </div>
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                style={{
                    backgroundColor: 'white',
                    width: '30%',
                    height:'55%',
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
                    <h2>შეიყვანეთ ინფორმაცია</h2>
                    <TextField
                        style={{paddingBottom:"20px"}}
                        label="შეიყვანეთ სახელი"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        style={{paddingBottom:"20px"}}
                        label="შეიყვანეთ გვარი"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        style={{paddingBottom:"20px"}}
                        label="შეიყვანეთ პოზიცია"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        fullWidth
                    />
                    <p style={{padding: '0', marginBottom:'4%', marginTop:'0'}}>
                        აირჩიეთ დეპარტამენტი
                    </p>
                    <Select
                        style={{paddingBottom:"20px"}}
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        fullWidth
                    >
                        {departments.map(department => (
                            <MenuItem key={department.id} value={department.id}>{department.depName}</MenuItem>
                        ))}
                    </Select>
                    <Button 
                        style={{
                            float:'right',
                            width:'30%',
                            marginTop:'3%'
                        }}
                        onClick={handleAddEmployee} 
                        variant="contained" 
                        color="primary">
                        შენახვა
                    </Button>
                </div>
            </Modal>
            <Dialog open={deleteConfirmationOpen} onClose={handleDeleteCanceled}>
                <DialogTitle>თანამშრომლის წაშლა</DialogTitle>
                <DialogContent>
                    <Alert severity="warning">
                        <AlertTitle>შეტყობინება</AlertTitle>
                        დარწმუნებული ხართ რომ გსურთ თანამშრომლის წაშლა?
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
            />
            <Snackbar open={errorAlertOpen} autoHideDuration={6000} onClose={() => setErrorAlertOpen(false)}>
                <Alert severity="error" onClose={() => setErrorAlertOpen(false)}>
                    <AlertTitle>შეცდომა</AlertTitle>
                    გთხოვთ შეიყვანოთ სრული
                </Alert>
            </Snackbar>
        </div>
    );
}

export default EmployeeTable;