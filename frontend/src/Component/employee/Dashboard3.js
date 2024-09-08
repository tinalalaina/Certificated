
import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import EmployeeList from './EmployeeList';
import LeaveManagement from './LeaveManagement';

function Dashboard3() {
  const [employees] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <EmployeeList employees={employees} onSelectEmployee={handleSelectEmployee} />
        </Grid>
        <Grid item xs={8}>
          {selectedEmployee ? (
            <LeaveManagement employee={selectedEmployee} />
          ) : (
            <Typography variant="h6">Sélectionnez un employé</Typography>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard3