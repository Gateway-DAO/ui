import { render } from '@testing-library/react';

import MotionComponents from './motion-components';

describe('MotionComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MotionComponents />);
    expect(baseElement).toBeTruthy();
  });
});
