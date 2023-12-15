import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';
import Checklist from './Checklist';
import { apiFunctions } from '../api';
import { updateChecklist } from '../api/apiFunctions';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #26547C;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  color: #000000;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 768px) {
    padding: 40px;
  }
`;

const DashboardHeader = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  color: #ffffff;

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const AddChecklistLink = styled(Link)`
  display: inline-block;
  background-color: #FFD166;
  color: #000000;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 20px;

  &:hover {
    background-color: #EF476F;
  }
`;

const NoChecklistsMessage = styled.p`
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
`;

const Dashboard = () => {
  const [checklists, setChecklists] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    loadChecklists();
  }, []);

  const loadChecklists = async () => {
    try {
      const fetchedChecklists = await apiFunctions.getChecklists();
      console.log('Fetched Checklists:', fetchedChecklists);
      setChecklists(fetchedChecklists);
    } catch (error) {
      console.error('Error loading checklists:', error);
    }
  };

  const goToChecklist = (checklistId) => {
    navigate(`/checklist/${checklistId}`);
  };

  const handleDeleteChecklist = async (checklistId) => {
    try {
      await apiFunctions.deleteChecklist(checklistId);
      loadChecklists();
    } catch (error) {
      console.error('Error deleting checklist:', error);
    }
  };

  const handleUpdateChecklist = (checklist) => {
    updateChecklist(checklist);
    navigate(`/edit-checklist/${checklist.id}`);
  };
  
  return (
    <DashboardContainer>
      <DashboardHeader>Dashboard</DashboardHeader>
      <AddChecklistLink to="/add-checklist">
        <FaPlus /> Add Checklist
      </AddChecklistLink>
      {checklists.length > 0 ? (
        checklists.map((checklist) => (
          <div key={checklist.id} onClick={() => goToChecklist(checklist.id)}>
            <Checklist
              checklist={checklist}
              deleteChecklist={handleDeleteChecklist}
              updateChecklist={() => handleUpdateChecklist(checklist)}
            />
          </div>
        ))
      ) : (
        <NoChecklistsMessage>No checklists available.</NoChecklistsMessage>
      )}
    </DashboardContainer>
  );
};


export default Dashboard;
