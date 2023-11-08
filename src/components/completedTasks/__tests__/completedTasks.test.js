import React from "react";
import {render} from '@testing-library/react';
import CompletedTasks from "../index";
import { TasksContext } from '../../../utils/contexts/taskContext';

const tasks1 = [
    { id: 1, text: 'Tâche 1', completed: false },
    { id: 2, text: 'Tâche 2', completed: false },
];
test('le composant ne rend rien quand il n y a pas de tâches terminées', () =>{
    const { getByRole, queryAllByRole ,debug } = render(
        <TasksContext.Provider value={{ tasks : tasks1 }}>
          <CompletedTasks />
        </TasksContext.Provider>
      );
    const list = getByRole("list")
    const listItems = queryAllByRole("listitem");
    debug(listItems)
    expect(list).toBeInTheDocument();
    expect(listItems).toHaveLength(0); 
})
const tasks2 = [
    { id: 1, text: 'Tâche 1', completed: true },
    { id: 2, text: 'Tâche 2', completed: false },
];

test('les tâches terminées sont bien rendues', () => {
    const { getByText } = render(
        <TasksContext.Provider value={{ tasks: tasks2 }}>
            <CompletedTasks />
        </TasksContext.Provider>
    );
    expect(getByText('Tâche 1')).not.toBeNull();
});

const tasks3 = [
    { id: 1, text: 'Tâche 1', completed: true },
    { id: 2, text: 'Tâche 2', completed: false },
];

test('les tâches non terminées ne sont pas rendues', () => {
    const { getByText } = render(
        <TasksContext.Provider value={{ tasks: tasks3 }}>
            <CompletedTasks />
        </TasksContext.Provider>
    );
    expect(() => getByText('Tâche 2')).toThrow(); // Utilise getByText avec une vérification d'exception
});

test('le rendu du composant correspond à un instantané (snapshot) précédemment enregistré.', () => {
    const tasks = [
      { id: 1, text: 'Tâche 1', completed: true },
      { id: 2, text: 'Tâche 2', completed: false },
    ];
  
    const { asFragment } = render(
      <TasksContext.Provider value={{ tasks }}>
        <CompletedTasks />
      </TasksContext.Provider>
    );
  
    expect(asFragment()).toMatchSnapshot();
  });