import React, { useState } from "react";

const ToDoList = () => {
  // État pour suivre les tâches, la nouvelle tâche, l'indice de la tâche en cours de modification, et le texte modifié.
  const [tasks, setTasks] = useState(["First task", "second one", "third one"]);
  const [newTask, setNewTask] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editedTask, setEditedTask] = useState("");

  // Gère la modification du texte dans le champ d'entrée pour une nouvelle tâche.
  function handleInputChange(event: any) {
    setNewTask(event.target.value);
  }

  // Ajoute une nouvelle tâche à la liste si le champ d'entrée n'est pas vide.
  function addTask() {
    if (newTask.trim() !== "") {
      setTasks((t) => [...t, newTask]);
      setNewTask("");
    }
  }

  // Supprime une tâche de la liste en fonction de son indice.
  function deleteTask(index: any) {
    const updatedList = tasks.filter(
      (_, currentIndex) => currentIndex !== index
    );
    setTasks(updatedList);
  }

  // Déplace une tâche vers le haut dans la liste.
  function moveTaskUp(index: any) {
    if (index > 0) {
      const updatedList = [...tasks];
      [updatedList[index], updatedList[index - 1]] = [
        updatedList[index - 1],
        updatedList[index],
      ];
      setTasks(updatedList);
    }
  }

  // Déplace une tâche vers le bas dans la liste.
  function moveTaskDown(index: any) {
    if (index < tasks.length - 1) {
      const updatedList = [...tasks];
      [updatedList[index], updatedList[index + 1]] = [
        updatedList[index + 1],
        updatedList[index],
      ];
      setTasks(updatedList);
    }
  }

  // Commence la modification d'une tâche, définissant l'indice de la tâche et le texte modifié.
  function startEditing(index: number) {
    setIsEditing(index);
    setEditedTask(tasks[index]);
  }

  // Gère la modification du texte dans le champ d'entrée pour une tâche en cours de modification.
  function handleEditChange(event: any) {
    setEditedTask(event.target.value);
  }

  // Sauvegarde les modifications apportées à une tâche et réinitialise le mode édition.
  function saveEdit(index: number) {
    const updatedList = [...tasks];
    updatedList[index] = editedTask;
    setTasks(updatedList);
    setIsEditing(null);
  }

  // Annule la modification en cours et réinitialise le mode édition.
  function cancelEdit() {
    setIsEditing(null);
    setEditedTask("");
  }

  return (
    <div>
      <h1>To-do list</h1>
      <div>
        {/* Champ d'entrée pour une nouvelle tâche */}
        <input
          type="text"
          value={newTask}
          className="to-do-list"
          placeholder="Enter text..."
          onChange={handleInputChange}
        />
        <button onClick={addTask} className="add-button">
          Add task
        </button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <li key={index}>
            {isEditing === index ? (
              <>
                {/* Champ d'entrée pour modifier une tâche existante */}
                <input
                  type="text"
                  value={editedTask}
                  onChange={handleEditChange}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {/* Affiche le texte de la tâche et les boutons pour modifier, supprimer et déplacer */}
                <span className="text">{task}</span>
                <button
                  className="edit-button"
                  onClick={() => startEditing(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  Delete
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskUp(index)}
                >
                  ☝️
                </button>
                <button
                  className="move-button"
                  onClick={() => moveTaskDown(index)}
                >
                  👇
                </button>
              </>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ToDoList;
