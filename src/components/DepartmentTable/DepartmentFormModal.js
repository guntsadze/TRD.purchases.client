import React, { useState } from 'react';
import axios from 'axios';
import { Modal, TextField, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

function DepartmentFormModal({ fetchDepartments, setErrorAlertOpen }) {
    const [openModal, setOpenModal] = useState(false);
    const [newDepartmentName, setNewDepartmentName] = useState('');

    const handleOpenModal = () => {
        setOpenModal(true);
        setNewDepartmentName('');
    };

    const handleCloseModal = () => {
        setOpenModal(false);
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


    return (
        <>
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
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            style={{
                backgroundColor: 'white',
                width: '30%',
                height:'25%',
                margin: 'auto',
                opacity: '0.95',
            }}>
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
        </>
    );
}

export default DepartmentFormModal;
