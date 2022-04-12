import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface TemplatesProps {}

const StyledTemplates = styled.div`
  color: pink;
`;

export function Templates(props: TemplatesProps) {
  return (
    <StyledTemplates>
      <h1>Welcome to Templates!</h1>
    </StyledTemplates>
  );
}

export default Templates;
