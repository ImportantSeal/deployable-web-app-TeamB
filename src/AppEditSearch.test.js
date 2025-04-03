import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('should add a new task', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
  const addButton = screen.getByText('Lisää');

  fireEvent.change(input, { target: { value: 'Test Task' } });
  fireEvent.click(addButton);

  const task = await screen.findByText('Test Task');
  expect(task).toBeInTheDocument();
});

test('should edit a task', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
  const addButton = screen.getByText('Lisää');

  fireEvent.change(input, { target: { value: 'Test Task' } });
  fireEvent.click(addButton);

  const editButton = await screen.findByText('Muokkaa');
  fireEvent.click(editButton);

  const editInput = screen.getByDisplayValue('Test Task');
  fireEvent.change(editInput, { target: { value: 'Edited Task' } });

  const saveButton = screen.getByText('Tallenna');
  fireEvent.click(saveButton);

  const updatedTask = screen.getByText('Edited Task');
  expect(updatedTask).toBeInTheDocument();
});

test('should filter tasks based on search term', async () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
  const addButton = screen.getByText('Lisää');

  fireEvent.change(input, { target: { value: 'First Task' } });
  fireEvent.click(addButton);

  fireEvent.change(input, { target: { value: 'Second Task' } });
  fireEvent.click(addButton);

  const searchInput = screen.getByPlaceholderText('Hae tehtäviä...');
  fireEvent.change(searchInput, { target: { value: 'First' } });

  const firstTask = await screen.findByText('First Task');
  expect(firstTask).toBeInTheDocument();

  const secondTask = screen.queryByText('Second Task');
  expect(secondTask).toBeNull();
});
