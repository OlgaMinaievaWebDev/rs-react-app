import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledResultsSection = styled.section`
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px;
`;

export const StyledResultCard = styled(Link)`
  display: block;
  padding: 16px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  margin-bottom: 12px;
  text-decoration: none;
  color: inherit;

  h3,
  p {
    margin: 0;
  }

  h3 {
    margin-bottom: 8px;
  }
`;
