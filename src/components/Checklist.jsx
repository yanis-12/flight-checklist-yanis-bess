import React from 'react';
import styled from 'styled-components';
import { FaTrash,FaEdit,  FaCheckSquare, FaRegSquare } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
    transform: scale(1.05); 
    background-color: #EF476F;
  }
`;

const ChecklistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ChecklistTitle = styled.h2`
  color: #343a40;
  font-size: 1.2rem;
  margin: 0;
`;

const TaskList = styled.ul`
  padding: 0;
  list-style-type: none;
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


const CheckboxIcon = styled.span`
  margin-right: 8px;
`;

const TaskButton = styled.button`
  background-color: #000000;
  color: #ffffff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;


const StatusText = styled.p`
  margin-top: 10px;
  color: #ffffff;
`;
const Checklist = ({ checklist, deleteChecklist, updateChecklist }) => {
  const navigate =useNavigate();
  

  const toggleTaskStatus = (taskId) => {
    const updatedTasks = (checklist.tasks || []).map((task) =>
      task.id === taskId ? { ...task, status: task.status === 0 ? 1 : 0 } : task
    );
    const completedTasks = updatedTasks.filter((task) => task.status === 1).length;
    updateChecklist({
      ...checklist,
      tasks: updatedTasks,
      status: completedTasks === updatedTasks.length ? 2 : 1,
    });
  };

  const removeTask = (taskId) => {
    const updatedTasks = (checklist.tasks || []).filter((task) => task.id !== taskId);
    const completedTasks = updatedTasks.filter((task) => task.status === 1).length;
    updateChecklist({
      ...checklist,
      tasks: updatedTasks,
      status: completedTasks === updatedTasks.length ? 2 : 1,
    });
  };

  const handleTitleClick = () => {
    navigate(`/checklist/${checklist.id}`);
  };

  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Empêche la propagation de l'événement
    deleteChecklist(checklist.id);
  };

  const handleUpdateClick = (event) => {
    event.stopPropagation(); // Empêche la propagation de l'événement
    navigate(`/edit-checklist/${checklist.id}`);
  };

  

  return (
    <ChecklistContainer>
      <ChecklistHeader onClick={handleTitleClick}>
        <ChecklistTitle>{checklist.title}</ChecklistTitle>
        <p>{checklist.description}</p>
        <div>
          <TaskButton onClick={handleDeleteClick}>
            <FaTrash />
          </TaskButton>
          <TaskButton onClick={handleUpdateClick}>
            <FaEdit />
          </TaskButton>
        </div>
      </ChecklistHeader>
      <TaskList>
        {(checklist.tasks || []).map((task) => (
          <Task key={task.id} className={task.status === 1 ? 'completed' : ''}>
            <CheckboxIcon onClick={() => toggleTaskStatus(task.id)}>
              {task.status === 1 ? <FaCheckSquare /> : <FaRegSquare />}
            </CheckboxIcon>
            <span>{task.title}</span>
            <TaskButton onClick={() => removeTask(task.id)}>
              <FaTrash />
            </TaskButton>
          </Task>
        ))}
      </TaskList>
      <StatusText>
        Status: {checklist.status === 0 ? 'Empty' : checklist.status === 1 ? 'In Progress' : 'Completed'}
      </StatusText>
    </ChecklistContainer>
  );
};

export default Checklist;