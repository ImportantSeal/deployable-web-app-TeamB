import { render, screen, fireEvent } from '@testing-library/react';
import TaskList from './TaskList';

describe('TaskList Component', () => {
  const tasks = [
    { id: 1, title: 'Task 1', isCompleted: false },
    { id: 2, title: 'Task 2', isCompleted: false },
  ];

  it('should mark a task as completed when "Tehty" button is clicked', () => {
    const markTaskDoneMock = jest.fn();
    render(<TaskList tasks={tasks} markTaskDone={markTaskDoneMock} deleteTask={jest.fn()} />);

    const button = screen.getAllByText('Tehty')[0];
    fireEvent.click(button);

    expect(markTaskDoneMock).toHaveBeenCalledWith(1);
  });
});
