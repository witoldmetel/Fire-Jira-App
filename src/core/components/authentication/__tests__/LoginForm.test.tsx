import { render, screen } from 'src/utils/test-utils';
import { LoginForm } from '../LoginForm';

describe.skip('<LoginForm>', () => {
  test('get user sucessfully', () => {
    render(<LoginForm />);

    screen.getByRole('');
  });
});
