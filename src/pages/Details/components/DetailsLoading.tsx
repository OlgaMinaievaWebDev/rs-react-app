import { Loader } from '../../../components/Loader';
import { StyledPanel } from '../Details.styles';

export function DetailsLoading() {
  return (
    <StyledPanel role="status" aria-label="Loading character details">
      <Loader />
      <p>Loading...</p>
    </StyledPanel>
  );
}
