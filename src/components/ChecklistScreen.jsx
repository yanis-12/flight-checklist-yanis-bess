import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getChecklistById } from '../api/apiFunctions';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';

const ChecklistContainer = styled.div`
  
  background-color: #FFD166;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin: 10px;
  padding: 15px;
  box-shadow: 0 0 10px rgb(252, 3, 3);
  width: 250px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05); /* Effet de zoom au survol */
  }
`;

const ChecklistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const Task = styled.li`
  background-color: #ffffff;
  margin: 8px 0;
  padding: 12px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f8d7da;
  }

  &.completed {
    text-decoration: line-through;
    opacity: 0.6;
  }
`;


const ChecklistScreen = () => {
  const [checklist, setChecklist] = useState(null);
  const { checklistId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChecklistData = async () => {
      try {
        const data = await getChecklistById(checklistId);
        console.log('Checklist Data:', data); // Cela vous montre ce que vous avez reçu
        setChecklist(data);
      } catch (error) {
        console.error('Error fetching checklist data:', error);
      }
    };

    fetchChecklistData();
  }, [checklistId]);

  const handleTaskStatusChange = (taskId, done) => {
    // Mettez à jour localement l'état de la tâche sans faire d'appel au serveur
    const updatedChecklist = { ...checklist };
    const updatedTasks = updatedChecklist.tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, done: !done };
      }
      return task;
    });

    updatedChecklist.tasks = updatedTasks;
    setChecklist(updatedChecklist);
  };

  console.log('Render Checklist:', checklist); // Ajout d'un log pour vérifier l'état de la checklist

  return (
    <ChecklistContainer>
      <ChecklistHeader>{checklist?.title}</ChecklistHeader>
      <p>{checklist?.description}</p>
      <ul>
        {checklist?.tasks?.map((task) => (
          <Task
            key={task.id}
            onClick={() => handleTaskStatusChange(task.id, task.done)}
          >
            {task.done ? (
              <FaCheckSquare size="1.5em" />
            ) : (
              <FaSquare size="1.5em" />
            )}
            <span style={{ marginLeft: '10px' }}>{task.title}</span>
          </Task>
        ))}
      </ul>
      <button onClick={() => navigate('/')}>Retour au Dashboard</button>
    </ChecklistContainer>
  );
};

export default ChecklistScreen;
