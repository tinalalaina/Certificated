import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';

const LeaveManagement = ({ employee }) => {
  const [leaveDate, setLeaveDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour soumettre le congé
    console.log(`Congé soumis pour ${employee.name} le ${leaveDate}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Gestion des congés pour {employee.name}</Typography>
      <TextField
        label="Date de congé"
        type="date"
        value={leaveDate}
        onChange={(e) => setLeaveDate(e.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" variant="contained" color="primary">
        Soumettre
      </Button>
    </form>
  );
};

export default LeaveManagement;