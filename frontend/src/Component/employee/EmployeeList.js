import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const EmployeeList = ({ employees, onSelectEmployee }) => {
  return (
    <List>
      {employees.map((employee) => (
        <ListItem button key={employee.id} onClick={() => onSelectEmployee(employee)}>
          <ListItemText primary={employee.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default EmployeeList;