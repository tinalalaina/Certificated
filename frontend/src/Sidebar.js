import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import { AccountTree, AddBusiness,  DownloadForOffline,  LibraryBooksTwoTone, ListAltOutlined, ListAltTwoTone } from '@mui/icons-material';

const Sidebar = ({ toggleSidebar }) => {
  const role = localStorage.getItem('role');

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      <List>
        <ListItem button onClick={toggleSidebar}>
          <ListItemIcon>
            <ChevronLeftIcon />
          </ListItemIcon>
          <ListItemText primary="Cacher" />
        </ListItem>  
        <ListItem button component={Link} to="/Crud">
          <ListItemIcon>
            <AddBusiness />
          </ListItemIcon>
          <ListItemText primary="AJOUTER UN DEMANDE" />
        </ListItem>
        <ListItem button component={Link} to="/listeprojetenregistrer">
          <ListItemIcon>
            <LibraryBooksTwoTone />
          </ListItemIcon>
          <ListItemText primary="Liste enregistrer" />
        </ListItem>
        <ListItem button component={Link} to="/listeutilisateur">
          <ListItemIcon>
            <AccountTree />
          </ListItemIcon>
          <ListItemText primary="Liste utilisateur" />
        </ListItem>
       
        <br/>
         {role !== 'user' && (
        <ListItem>
          <ListItemIcon>
           
          </ListItemIcon>
          <ListItemText primary="ADMINISTRATEUR" />
        </ListItem>
        )}
        <br/>
        {role !== 'user' && (
        <ListItem button component={Link} to="/second_for_count">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        )}
        {role !== 'user' && (
          <ListItem button component={Link} to="/List">
            <ListItemIcon>
              <ListAltOutlined />
            </ListItemIcon>
            <ListItemText primary="Modification et suppressions de Donné" />
          </ListItem>
        )}
         {role !== 'user' && (
          <ListItem button component={Link} to="/settings">
            <ListItemIcon>
              <ListAltTwoTone />
            </ListItemIcon>
            <ListItemText primary="Liste vérifié et anomalie" />
          </ListItem>
          )} 
       {role !== 'user' && (
      <ListItem button component={Link} to="/listeutilisateur2">
        <ListItemIcon>
          <AccountTree />
        </ListItemIcon>
        <ListItemText primary="Gestion des utilisateurs" />
      </ListItem>
        )} 
        {role !== 'user' && (
      <ListItem button component={Link} to="/Generateur">
        <ListItemIcon>
          <DownloadForOffline />
        </ListItemIcon>
        <ListItemText primary="Générateur de diplôme rapide" />
      </ListItem>
        )} 
      </List>
    </Drawer>
  );
};

export default Sidebar;