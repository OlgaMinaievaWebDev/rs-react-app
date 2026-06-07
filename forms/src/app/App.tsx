import { useRef, useState } from 'react';

import { Modal } from '../components/Modal';
import { HookForm } from '../forms/HookForm/HookForm';
import { UncontrolledForm } from '../forms/UncontrolledForm/UncontrolledForm';
import { useFormStore } from '../store/useFormStore';
import {
  ActionButton,
  Actions,
  Page,
  PageHeader,
  PageTitle,
  SubmissionCard,
  SubmissionsSection,
} from './App.styles';

type ActiveForm = 'uncontrolled' | 'hook-form' | null;

function App() {
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const submissions = useFormStore((state) => state.submissions);

  const handleCloseModal = () => {
    setActiveForm(null);
    lastTriggerRef.current?.focus();
  };

  return (
    <Page>
      <PageHeader>
        <PageTitle>Forms</PageTitle>
        <Actions>
          <ActionButton
            onClick={(event) => {
              lastTriggerRef.current = event.currentTarget;
              setActiveForm('uncontrolled');
            }}
          >
            Open Uncontrolled Form
          </ActionButton>
          <ActionButton
            onClick={(event) => {
              lastTriggerRef.current = event.currentTarget;
              setActiveForm('hook-form');
            }}
          >
            Open React Hook Form
          </ActionButton>
        </Actions>
      </PageHeader>
      <SubmissionsSection>
        <h2>Submissions</h2>
        {submissions.length === 0 && <p>There are no submissions yet</p>}
        {submissions.map((item, index) => {
          const isLatest = index === 0;

          return (
            <SubmissionCard
              key={item.id}
              $isLatest={isLatest}
              className={isLatest ? 'submission latest' : 'submission'}
            >
              <p>Name: {item.name}</p>
              <p>Age: {item.age}</p>
              <p>Email: {item.email}</p>
              <p>Gender: {item.gender}</p>
              <p>Terms accepted: {item.terms ? 'Yes' : 'No'}</p>
              <p>Created at: {new Date(item.createdAt).toLocaleString()}</p>
              <p>Source: {item.source}</p>
              <p>Country: {item.country}</p>
              <img
                src={item.imageBase64}
                alt={`${item.name}'s uploaded profile`}
              />
            </SubmissionCard>
          );
        })}
      </SubmissionsSection>
      {activeForm && (
        <Modal
          title={
            activeForm === 'uncontrolled'
              ? 'Uncontrolled Form'
              : 'React Hook Form'
          }
          onClose={handleCloseModal}
        >
          {activeForm === 'uncontrolled' ? (
            <UncontrolledForm onSuccess={handleCloseModal} />
          ) : (
            <HookForm onSuccess={handleCloseModal} />
          )}
        </Modal>
      )}
    </Page>
  );
}

export default App;
