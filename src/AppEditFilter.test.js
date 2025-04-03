import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render the filter dropdown', () => {
    render(<App />);
    expect(screen.getByLabelText('Suodatus:')).toBeInTheDocument();
  });

  it('should filter tasks by title', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Kirjoita uusi tehtävä...'), { target: { value: 'Task 1' } });
    fireEvent.click(screen.getByText('Lisää'));
    fireEvent.change(screen.getByPlaceholderText('Kirjoita uusi tehtävä...'), { target: { value: 'Task 2' } });
    fireEvent.click(screen.getByText('Lisää'));
    fireEvent.change(screen.getByLabelText('Suodatus:'), { target: { value: 'title' } });
    const taskList = screen.getAllByRole('listitem');
    expect(taskList[0]).toHaveTextContent('Task 1');
    expect(taskList[1]).toHaveTextContent('Task 2');
  });

  it('should filter tasks by status', async () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Kirjoita uusi tehtävä...'), { target: { value: 'Task 1' } });
    fireEvent.click(screen.getByText('Lisää'));
    fireEvent.change(screen.getByPlaceholderText('Kirjoita uusi tehtävä...'), { target: { value: 'Task 2' } });
    fireEvent.click(screen.getByText('Lisää'));
    fireEvent.click(screen.getAllByText('Tehty')[0]);
    fireEvent.change(screen.getByLabelText('Suodatus:'), { target: { value: 'status' } });
    await waitFor(() => {
      const taskList = screen.getAllByRole('listitem');
      expect(taskList[0]).toHaveTextContent('Task 1');
      expect(taskList[1]).toHaveTextContent('Task 2');
    });
  });

  it('should filter tasks by date', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Kirjoita uusi tehtävä...'), { target: { value: 'Task 1' } });
    fireEvent.click(screen.getByText('Lisää'));
    fireEvent.change(screen.getByPlaceholderText('Kirjoita uusi tehtävä...'), { target: { value: 'Task 2' } });
    fireEvent.click(screen.getByText('Lisää'));
    fireEvent.change(screen.getByLabelText('Suodatus:'), { target: { value: 'date' } });
    const taskList = screen.getAllByRole('listitem');
    expect(taskList[0]).toHaveTextContent('Task 2');
    expect(taskList[1]).toHaveTextContent('Task 1');
  });
});
