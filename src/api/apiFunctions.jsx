
import api from "./api";

export const prepareChecklistData = (title, description, tasks) => {
  
  return {
    title,
    description,
    todo: tasks
      ? tasks.map((task) => ({
          title: task || "", // Ajoutez une propriété title
          description: description || "",
        }))
      : [],
  };
};

// Fonction pour ajouter une checklist
export const addChecklist = async (title, description, todo) => {
  const checklistData = prepareChecklistData(title, description, todo);

  try {
    const response = await api.post("/checklist/add", checklistData);
    console.log("Response from addChecklist API:", response.data); // Affiche la réponse dans la console
    return response.data;
  } catch (error) {
    console.error("Error adding checklist:", error);
    throw error;
  }
};
// Fonction pour récupérer toutes les checklists
export const getChecklists = async () => {
  try {
    const response = await api.get("/checklists");
    console.log('Checklists:', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error("Error getting checklists:", error);
    throw error;
  }
};

export const getChecklistById = async (checklistId) => {
  try {
    const response = await api.get(`/checklist?id=${checklistId}`);
    console.log("Checklist data:", response.data); // Ajoutez ceci pour déboguer
    return response.data; 
  } catch (error) {
    console.error("Error getting checklist by ID:", error);
    throw error;
  }
};

export const getTasksByChecklistId = async (checklistId) => {
  try {
    const response = await api.get(`/checklist?id=${checklistId}`);
    return response.data; 
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};

// Fonction pour supprimer
export const deleteChecklist = async (checklistId) => {
  try {
    const response = await api.get(`/checklist/delete?id=${checklistId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur deleting checklist :", error);
    throw error;
  }
};

export const updateChecklist = async (id, title, description, tasks) => {
  const checklistData = {
    id, // Ajout de l'ID dans le corps de la requête
    ...prepareChecklistData(title, description, tasks)
  };

  try {
    const response = await api.post("/checklist/update", checklistData);
    console.log('Update Checklist Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating checklist:', error);
    throw error;
  }
};
export const addTask = async (title, description, todo) => {
  const checklistData = prepareChecklistData(title, description, todo);

  try {
    const response = await api.post("/checklist/add", checklistData);
    return response.data;
  } catch (error) {
    console.error("Error adding checklist:", error);
    throw error;
  }
};