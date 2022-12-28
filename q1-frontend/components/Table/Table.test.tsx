import Table from "./Table";
import { fireEvent, render } from '@testing-library/react';

describe('(Component) Table', () => {
  it('should be able to add a new element', () => {
    const { getByRole, getAllByTestId, getByTestId } = render(<Table />);
    const numRows = getAllByTestId('row').length;

    const alertInput = getByRole('textbox');
    fireEvent.input(alertInput, {target: {value: 'new Alert'}})
    fireEvent.submit(getByTestId('form'))
    expect(getAllByTestId('row').length).toEqual(numRows + 1);
  });

  it('should contain the new alert after being added', () => {
    const { getByRole, getAllByText, getByTestId } = render(<Table />);

    const alertInput = getByRole('textbox');
    fireEvent.input(alertInput, {target: {value: 'new Alert'}})
    fireEvent.submit(getByTestId('form'))
    expect(getAllByText('new Alert').length).toEqual(1);
  });
});
