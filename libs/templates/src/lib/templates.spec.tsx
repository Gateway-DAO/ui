import { render } from '@testing-library/react';

import Templates from './templates';

describe('Templates', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Templates />);
    expect(baseElement).toBeTruthy();
  });
});
