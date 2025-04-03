import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import TaskItem from './TaskItem';

describe('App Component', () => {
  test('renders app with header, form, and empty task list', () => {
    render(<App />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Kirjoita uusi tehtävä...')).toBeInTheDocument();
    expect(screen.getByText('Lisää')).toBeInTheDocument();
  });

  test('allows adding a new task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
    const addButton = screen.getByText('Lisää');

    await userEvent.type(input, 'Test Task');
    fireEvent.click(addButton);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('allows marking a task as completed', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
    const addButton = screen.getByText('Lisää');

    await userEvent.type(input, 'Test Task');
    fireEvent.click(addButton);

    const doneButton = screen.getByText('Tehty');
    fireEvent.click(doneButton);

    const taskItem = screen.getByText('Test Task').closest('li');
    expect(taskItem).toHaveClass('completed');
  });

  test('allows deleting a task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
    const addButton = screen.getByText('Lisää');

    await userEvent.type(input, 'Test Task');
    fireEvent.click(addButton);

    const deleteButton = screen.getByText('Poista');
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
  });
<<<<<<< HEAD
});

describe('TaskForm Component', () => {
  test('renders form with input and button', () => {
    const mockAddTask = jest.fn();
    render(<TaskForm addTask={mockAddTask} />);

    expect(screen.getByPlaceholderText('Kirjoita uusi tehtävä...')).toBeInTheDocument();
    expect(screen.getByText('Lisää')).toBeInTheDocument();
  });

  test('calls addTask when form is submitted', async () => {
    const mockAddTask = jest.fn();
    render(<TaskForm addTask={mockAddTask} />);

    const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
    const addButton = screen.getByText('Lisää');

    await userEvent.type(input, 'New Task');
    fireEvent.click(addButton);

    expect(mockAddTask).toHaveBeenCalledWith('New Task');
  });

  test('clears input after form submission', async () => {
    const mockAddTask = jest.fn();
    render(<TaskForm addTask={mockAddTask} />);

    const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
    const addButton = screen.getByText('Lisää');

    await userEvent.type(input, 'New Task');
    fireEvent.click(addButton);

    expect(input.value).toBe('');
  });
});

describe('TaskList Component', () => {
  test('renders empty list when no tasks', () => {
    render(<TaskList tasks={[]} markTaskDone={jest.fn()} deleteTask={jest.fn()} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('renders tasks correctly', () => {
    const tasks = [
      { id: 1, title: 'Task 1', isCompleted: false },
      { id: 2, title: 'Task 2', isCompleted: true }
    ];

    render(<TaskList tasks={tasks} markTaskDone={jest.fn()} deleteTask={jest.fn()} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});

describe('TaskItem Component', () => {
  test('renders task with correct styling based on completion status', () => {
    const task = { id: 1, title: 'Test Task', isCompleted: false };
    render(<TaskItem task={task} markTaskDone={jest.fn()} deleteTask={jest.fn()} />);

    const taskItem = screen.getByText('Test Task').closest('li');
    expect(taskItem).not.toHaveClass('completed');

    const doneButton = screen.getByText('Tehty');
    expect(doneButton).toHaveStyle({ backgroundColor: 'red' });
  });

  test('renders completed task with correct styling', () => {
    const task = { id: 1, title: 'Test Task', isCompleted: true };
    render(<TaskItem task={task} markTaskDone={jest.fn()} deleteTask={jest.fn()} />);

    const taskItem = screen.getByText('Test Task').closest('li');
    expect(taskItem).toHaveClass('completed');

    const doneButton = screen.getByText('Tehty');
    expect(doneButton).toHaveStyle({ backgroundColor: 'green' });
  });

  test('calls markTaskDone when done button is clicked', () => {
    const task = { id: 1, title: 'Test Task', isCompleted: false };
    const mockMarkTaskDone = jest.fn();
    render(<TaskItem task={task} markTaskDone={mockMarkTaskDone} deleteTask={jest.fn()} />);

    const doneButton = screen.getByText('Tehty');
    fireEvent.click(doneButton);

    expect(mockMarkTaskDone).toHaveBeenCalledWith(1);
  });

  test('calls deleteTask when delete button is clicked', () => {
    const task = { id: 1, title: 'Test Task', isCompleted: false };
    const mockDeleteTask = jest.fn();
    render(<TaskItem task={task} markTaskDone={jest.fn()} deleteTask={mockDeleteTask} />);

    const deleteButton = screen.getByText('Poista');
    fireEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });
=======
>>>>>>> feature/delete-task
});

describe('TaskForm Component', () => {
  test('renders form with input and button', () => {
    const mockAddTask = jest.fn();
    render(<TaskForm addTask={mockAddTask} />);

    expect(screen.getByPlaceholderText('Kirjoita uusi tehtävä...')).toBeInTheDocument();
    expect(screen.getByText('Lisää')).toBeInTheDocument();
  });

  test('calls addTask when form is submitted', async () => {
    const mockAddTask = jest.fn();
    render(<TaskForm addTask={mockAddTask} />);

    const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
    const addButton = screen.getByText('Lisää');

    await userEvent.type(input, 'New Task');
    fireEvent.click(addButton);

    expect(mockAddTask).toHaveBeenCalledWith('New Task');
  });

  test('clears input after form submission', async () => {
    const mockAddTask = jest.fn();
    render(<TaskForm addTask={mockAddTask} />);

    const input = screen.getByPlaceholderText('Kirjoita uusi tehtävä...');
    const addButton = screen.getByText('Lisää');

    await userEvent.type(input, 'New Task');
    fireEvent.click(addButton);

    expect(input.value).toBe('');
  });
});

describe('TaskList Component', () => {
  test('renders empty list when no tasks', () => {
    render(<TaskList tasks={[]} markTaskDone={jest.fn()} deleteTask={jest.fn()} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });

  test('renders tasks correctly', () => {
    const tasks = [
      { id: 1, title: 'Task 1', isCompleted: false },
      { id: 2, title: 'Task 2', isCompleted: true }
    ];

    render(<TaskList tasks={tasks} markTaskDone={jest.fn()} deleteTask={jest.fn()} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });
});

describe('TaskItem Component', () => {
  test('renders task with correct styling based on completion status', () => {
    const task = { id: 1, title: 'Test Task', isCompleted: false };
    render(<TaskItem task={task} markTaskDone={jest.fn()} deleteTask={jest.fn()} />);

    const taskItem = screen.getByText('Test Task').closest('li');
    expect(taskItem).not.toHaveClass('completed');

    const doneButton = screen.getByText('Tehty');
    expect(doneButton).toHaveStyle({ backgroundColor: 'red' });
  });

  test('renders completed task with correct styling', () => {
    const task = { id: 1, title: 'Test Task', isCompleted: true };
    render(<TaskItem task={task} markTaskDone={jest.fn()} deleteTask={jest.fn()} />);

    const taskItem = screen.getByText('Test Task').closest('li');
    expect(taskItem).toHaveClass('completed');

    const doneButton = screen.getByText('Tehty');
    expect(doneButton).toHaveStyle({ backgroundColor: 'green' });
  });

  test('calls markTaskDone when done button is clicked', () => {
    const task = { id: 1, title: 'Test Task', isCompleted: false };
    const mockMarkTaskDone = jest.fn();
    render(<TaskItem task={task} markTaskDone={mockMarkTaskDone} deleteTask={jest.fn()} />);

    const doneButton = screen.getByText('Tehty');
    fireEvent.click(doneButton);

    expect(mockMarkTaskDone).toHaveBeenCalledWith(1);
  });

  test('calls deleteTask when delete button is clicked', () => {
    const task = { id: 1, title: 'Test Task', isCompleted: false };
    const mockDeleteTask = jest.fn();
    render(<TaskItem task={task} markTaskDone={jest.fn()} deleteTask={mockDeleteTask} />);

    const deleteButton = screen.getByText('Poista');
    fireEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith(1);
  });
});