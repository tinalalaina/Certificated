import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';

const DiplomeForm = ({ onSubmit }) => {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [mention, setMention] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nom, prenom, mention });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Remplir les informations du diplôme
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mention"
          value={mention}
          onChange={(e) => setMention(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Générer le diplôme
        </Button>
      </form>
    </Container>
  );
};

export default DiplomeForm;