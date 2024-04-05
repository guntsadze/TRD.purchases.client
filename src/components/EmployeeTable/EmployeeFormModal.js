import React, { useState } from 'react';
import axios from 'axios';
import { Modal, TextField, Select, MenuItem, Button } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

function EmployeeFormModal({ fetchEmployees, departments, setErrorAlertOpen  }) {
    const [openModal, setOpenModal] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [personalNumber, setPersonalNumber] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('');
    
    const handleAddEmployee = async () => {
        if (!firstName.trim() || 
            !lastName.trim() || 
            !position.trim() || 
            !selectedDepartment.trim() || 
            !personalNumber.trim() || 
            !/^\d+$/.test(personalNumber)) 
            { 
                setErrorAlertOpen(true);
                return;
            }

        const newId = uuidv4();
        const newEmployee = { 
            id: newId, 
            firstName: firstName, 
            lastName: lastName, 
            position: position, 
            departmentId: selectedDepartment,
            personalNumber: personalNumber
        };
    
        try {
            await axios.post('http://localhost:5269/api/employees', newEmployee);
            setFirstName('');
            setLastName('');
            setPosition('');
            setSelectedDepartment('');
            setPersonalNumber('');
            handleCloseModal();
            fetchEmployees();
        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const handleOpenModal = () => {
        setOpenModal(true);
        setFirstName('');
        setLastName('');
        setPosition('');
        setSelectedDepartment('');
        setPersonalNumber('');
    };

    const handleCloseModal = () => {
        setOpenModal(false);
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
            თანამშრომლის დამატება
        </Button>
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            style={{
                backgroundColor: 'white',
                width: '50%',
                height:'60%',
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
                <TextField
                    style={{paddingBottom:"20px"}}
                    label="შეიყვანეთ პირადი ნომერი"
                    value={personalNumber}
                    onChange={(e) => setPersonalNumber(e.target.value)}
                    fullWidth
                    error={!(/^\d+$/.test(personalNumber)) && personalNumber !== ""}
                    helperText={!(/^\d+$/.test(personalNumber)) && personalNumber !== "" ? "პირადი ნომერი უნდა შედგებოდეს მხოლოდ ციფრებისგან" : ""}
                />
                <p style={{padding: '0', marginBottom:'4%', marginTop:'0'}}>
                    აირჩიეთ დეპარტამენტი
                </p>
                <Select
                    style={{paddingBottom:"20px", height:'3rem'}}
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                    fullWidth
                >
                    {departments.map(department => (
                        <MenuItem   key={department.id} 
                                    value={department.id}
                                    >
                            {department.depName}
                        </MenuItem>
                    ))}
                </Select>
                <Button 
                    style={{
                        float:'right',
                        width:'30%',
                        marginTop:'3%',
                    }}
                    onClick={handleAddEmployee} 
                    variant="contained" 
                    color="primary">
                    შენახვა
                </Button>
            </div>
        </Modal>
        </>
    );
}

export default EmployeeFormModal;
