import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { apiFunctions } from '../api';

const EditChecklistContainer = styled.div`
  background-color: #FFD166;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 auto;
`;

const EditChecklistHeader = styled.h1`
  color: #343a40;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
  display: block;
`;

const InputField = styled.input`
  margin-bottom: 15px;
  padding: 8px;
  border: 1px solid #000000;
  border-radius: 4px;
  width: 100%;
`;

const TasksContainer = styled.div`
  margin-bottom: 15px;
`;

const TaskInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const TaskInput = styled.input`
  flex-grow: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #080505;
  border-radius: 4px;
`;

const RemoveTaskButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c82333;
  }
`;

const AddTaskButton = styled.button`
  background-color: #28a745;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #218838;
  }
`;

const SaveChecklistButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const EditChecklistForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', description: '', tasks: [''] });

  useEffect(() => {
    const fetchChecklistDetails = async () => {
      try {
        const checklistDetails = await apiFunctions.getTasksByChecklistId(id);
        setFormData({
          title: checklistDetails.title || '',
          description: checklistDetails.description || '',
          tasks: checklistDetails.tasks ? checklistDetails.tasks.map((task) => task.title) : [''],
        });
      } catch (error) {
        console.error('Error fetching checklist details:', error);
      }
    };

    fetchChecklistDetails();
  }, [id]);

  const handleChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleAddTask = () => {
    setFormData((prevData) => ({ ...prevData, tasks: [...prevData.tasks, ''] }));
  };

  const handleRemoveTask = (index) => {
    setFormData((prevData) => {
      const updatedTasks = [...prevData.tasks];
      updatedTasks.splice(index, 1);
      return { ...prevData, tasks: updatedTasks };
    });
  };

  const handleSaveChecklist = async () => {
    try {
      await apiFunctions.updateChecklist(id, formData.title, formData.description, formData.tasks);
      navigate('/');
    } catch (error) {
      console.error('Error updating checklist:', error);
    }
  };

  return (
    <EditChecklistContainer>
      <EditChecklistHeader>Edit Checklist</EditChecklistHeader>
      <InputLabel>Title:</InputLabel>
      <InputField
        type="text"
        value={formData.title}
        onChange={(e) => handleChange('title', e.target.value)}
      />
      <InputLabel>Description:</InputLabel>
      <InputField
        type="text"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />
      <h2>Tasks:</h2>
      <TasksContainer>
        {formData.tasks.map((task, index) => (
          <TaskInputContainer key={index}>
            <TaskInput
              type="text"
              value={task}
              onChange={(e) => {
                const updatedTasks = [...formData.tasks];
                updatedTasks[index] = e.target.value;
                setFormData((prevData) => ({ ...prevData, tasks: updatedTasks }));
              }}
            />
            <RemoveTaskButton onClick={() => handleRemoveTask(index)}>
              Remove Task
            </RemoveTaskButton>
          </TaskInputContainer>
        ))}
      </TasksContainer>
      <AddTaskButton onClick={handleAddTask}>Add Task</AddTaskButton>
      <SaveChecklistButton onClick={handleSaveChecklist}>
        Save Checklist
      </SaveChecklistButton>
    </EditChecklistContainer>
  );
};

export default EditChecklistForm;
