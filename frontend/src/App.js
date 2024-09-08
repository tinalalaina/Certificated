import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App2 from './Component/Ensemble/App2';
import Premier from './Component/Ensemble/Premier';
import Ensemblelogin2 from './Component/Ensemble/Ensemblelogin2';
import Dashboardcrud2 from './Component/Ensemble/Dashboardcrud2';
import Dashboard12 from './Component/Ensemble/Dashboard12';
import ProjectList2 from './Component/Ensemble/ProjectList2';
import Ceditproducts2 from './Component/Ensemble/Ceditproducts2';
import ProtectedRoute from './Component/5000b/ProtectedRoute';
import Second_for_count from './Component/Ensemble/Second_for_count';
import Register from './Component/5000b/register/Register';
import './Style.css';
import Utilisateur from './Component/Ensemble/Utilisateur/Utilisateur';
import ProjectList22 from './Component/Ensemble/ProjectList22';
import Utilisateur2 from './Component/Ensemble/Utilisateur/Utilisateur2';
import Generateur from './Component/Ensemble/GenerateurDp/Generateur';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Premier />} />
      <Route path="/Crud" element={<ProtectedRoute><Dashboardcrud2 /></ProtectedRoute>} />
      <Route path="/listeprojetenregistrer" element={<ProtectedRoute><ProjectList22 /></ProtectedRoute>} />
      <Route path="/listeutilisateur" element={<Utilisateur />} />
      <Route path="/login" element={<Ensemblelogin2 />} />
      <Route path="/register_user" element={<Register />} />
      
      <Route path="/listeutilisateur2" element={<ProtectedRoute allowedRoles={['admin']}><Utilisateur2 /></ProtectedRoute>} />
      <Route path="/second_for_count" element={<ProtectedRoute allowedRoles={['admin']}><Second_for_count /></ProtectedRoute>} />
      <Route path="/Welcome" element={<ProtectedRoute><App2 /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin']} ><Dashboard12 /></ProtectedRoute>} />
      <Route path="/List" element={<ProtectedRoute allowedRoles={['admin']}><ProjectList2 /></ProtectedRoute>} />
      <Route path="/editus/:id" element={<ProtectedRoute allowedRoles={['admin']}><Ceditproducts2 /></ProtectedRoute>} />
      <Route path="/Generateur" element={<ProtectedRoute allowedRoles={['admin']}><Generateur /></ProtectedRoute>} />
      <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
    </Routes>
  );
}

export default App;