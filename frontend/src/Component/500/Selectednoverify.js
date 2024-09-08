import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItem, ListItemText, Checkbox, Button, Typography, CircularProgress } from '@mui/material';
import { saveAs } from 'file-saver';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

function Selectednoverify() {
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get('http://localhost/dashboardmistral1/selected_projects_noverified.php')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Aucune donnée disponible. Ajouter pour voir les données:', response.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
            });
    }, []);

    const handleToggle = (value) => () => {
        const currentIndex = selectedItems.indexOf(value);
        const newSelectedItems = [...selectedItems];

        if (currentIndex === -1) {
            newSelectedItems.push(value);
        } else {
            newSelectedItems.splice(currentIndex, 1);
        }

        setSelectedItems(newSelectedItems);
    };


    const handleDownload = async () => {
        setLoading(true);
        await generateDocx(selectedItems);
        setLoading(false);
    };

    const generateDocx = async (items) => {
        const response = await axios.get('/template2.docx', { responseType: 'arraybuffer' });
        const zip = new PizZip(response.data);
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        });

        const data = items.map(item => ({
            name: item.ptitle,
            prenom: item.pprenom,
            numero: item.pnumero
        }));

        const today = format(new Date(), 'dd MMMM yyyy', { locale: fr });

        doc.setData({
            items: data,
            date: today,
        });

        try {
            doc.render();
        } catch (error) {
            console.error(error);
        }

        const blob = doc.getZip().generate({
            type: 'blob',
            mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        });

        saveAs(blob, 'selected_items.docx');
    };

    return (
        <div>
            <Typography variant="h4">Liste Anomalie</Typography>
            {Array.isArray(data) ? (
                data.length === 0 ? (
                    <Typography variant="body1">Aucune donnée disponible. Ajouter pour voir les données</Typography>
                ) : (
                    <List>
                        {data.map((item) => {
                            const labelId = `checkbox-list-label-${item.id}`;

                            return (
                                <ListItem key={item.id} role={undefined} dense button onClick={handleToggle(item)}>
                                    <ListItemText id={labelId} primary={`${item.ptitle} - ${item.pprenom}- ${item.pnumero}`} />
                                    <Checkbox
                                        icon={<span style={{ fontSize: 24 }}>&#x2610;</span>}
                                        checkedIcon={<span style={{ fontSize: 24 }}>&#x2612;</span>}
                                        edge="start"
                                        checked={selectedItems.indexOf(item) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItem>
                            );
                        })}
                    </List>
                )
            ) : (
                <Typography variant="body1">Erreur: Les données ne sont pas un tableau.</Typography>
            )}
            <Button variant="contained" color="secondary" onClick={handleDownload} disabled={loading}>
                Download Selected
            </Button>
            {loading && <CircularProgress />}
        </div>
    );
};

export default Selectednoverify;