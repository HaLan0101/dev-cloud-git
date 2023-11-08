import React from 'react';
import { renderHook, render, fireEvent, screen } from '@testing-library/react';
import useTasks from "../index";
import TodoList from '../../../../components/todoList';
import { TasksContext } from '../../../contexts/taskContext';

test('le chargement des tâches depuis le local storage.', () => {
    // Simuler le stockage local avec des tâches
    const tasksInLocalStorage = [{ id: 1, text: 'Tâche 1', completed: false }];
    localStorage.setItem('tasks', JSON.stringify(tasksInLocalStorage));
  
    // Rendre un composant de test qui utilise le hook useTasks
    const { result } = renderHook(() => useTasks());
    // Vérifier que les tâches sont correctement chargées depuis le local storage
    expect(result.current.tasks).toEqual(tasksInLocalStorage);

    // Effacer le local storage après le test
    localStorage.clear();
});
// test('Ajout d\'une nouvelle tâche', () => {
//     const { result } = renderHook(() => useTasks());
  
//     // const Wrapper = ({ children }) => (
//     //   <TasksContext.Provider value={result.current}>
//     //     {children}
//     //   </TasksContext.Provider>
//     // );
  
//     // const { getByTestId, getByText } = render(<TodoList />, { wrapper: Wrapper });
  
//     result.current.addTask("Nouvelle tâche")
//     result.current.addTask("2eme tâche")
//     // // Sélectionner l'input pour ajouter une nouvelle tâche par son attribut data-testid
//     // const inputElement = getByTestId('input-task');
  
//     // // Saisir du texte dans l'input
//     // fireEvent.change(inputElement, { target: { value: 'Nouvelle tâche' } });
  
//     // // Sélectionner le bouton "Add" et le cliquer
//     // const addButton = getByText('Add');
//     // fireEvent.click(addButton);
  
//     // Vérifier que la tâche a été ajoutée avec succès
//     expect(result.current.tasks).toHaveLength(1);
//     expect(result.current.tasks[0].text).toBe('Nouvelle tâche');
//     expect(result.current.tasks[0].completed).toBe(false);
// });
