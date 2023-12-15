import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import EditChecklistForm from './components/EditChecklistForm';
import Header from './Header'; // Importer le composant Header
import Dashboard from './components/Dashboard';
import AddChecklistForm from './components/AddChecklistForm';
import ChecklistScreen from './components/ChecklistScreen';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
`;

const App = () => {
  return (
    <Router>
      <AppContainer>
        <Header logoSrc="" title="Fly Checklist" />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/edit-checklist/:id" element={<EditChecklistForm />} />
          <Route path="/add-checklist" element={<AddChecklistForm />} />
          <Route path="/checklist/:checklistId" element={<ChecklistScreen />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
