import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box, CircularProgress } from '@mui/material';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
function Dashboard1() {
  const [email, setFirstName] = useState('');
  const [name, setLastName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerateDiploma = () => {
    setLoading(true);
    const templatePath = process.env.PUBLIC_URL + '/template.docx';

    fetch(templatePath)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        const zip = new PizZip(data);
        const doc = new Docxtemplater(zip);
     const today = format(new Date(), 'dd MMMM yyyy', { locale: fr });
        doc.setData({
          email,
          name,
          date: today
        });

        try {
          doc.render();
        } catch (error) {
          console.error(error);
          setLoading(false);
        }

        const blob = doc.getZip().generate({
          type: 'blob',
          mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(blob, 'diploma.docx');
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
        Diplôme :
        </Typography>
        <TextField
          label="Prénom"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Nom"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setLastName(e.target.value)}
        />
        
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateDiploma}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Générer le Diplôme'}
        </Button>
      </Box>
    </Container>
  );
};
export default Dashboard1