import type { FormSubmission } from '../../types/Form.interfaces';
import { SubmissionCard as StyledSubmissionCard } from './SubmissionCard.styles';

type SubmissionCardProps = {
  isLatest: boolean;
  submission: FormSubmission;
};

export function SubmissionCard({ isLatest, submission }: SubmissionCardProps) {
  return (
    <StyledSubmissionCard $isLatest={isLatest}>
      <p>Name: {submission.name}</p>
      <p>Age: {submission.age}</p>
      <p>Email: {submission.email}</p>
      <p>Gender: {submission.gender}</p>
      <p>Terms accepted: {submission.terms ? 'Yes' : 'No'}</p>
      <p>Created at: {new Date(submission.createdAt).toLocaleString()}</p>
      <p>Source: {submission.source}</p>
      <p>Country: {submission.country}</p>
      <img
        src={submission.imageBase64}
        alt={`${submission.name}'s uploaded profile`}
      />
    </StyledSubmissionCard>
  );
}
