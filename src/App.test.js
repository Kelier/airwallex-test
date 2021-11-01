import {render, screen} from '@testing-library/react';
import App from './App';

test('firstLaunch', () => {
    render(<App />);
    const firstLaunch = screen.getByText(/Be the first to know when we launch/i);
    expect(firstLaunch).toBeInTheDocument();
});
