import { useRef, useState } from 'react';

import { Modal } from '../../components/Modal';
import { SubmissionCard } from '../../components/SubmissionCard';
import { HookForm } from '../../forms/HookForm/HookForm';
import { UncontrolledForm } from '../../forms/UncontrolledForm/UncontrolledForm';
import { useFormStore } from '../../store/useFormStore';
import {
  ActionButton,
  Actions,
  Page,
  PageHeader,
  PageTitle,
  SubmissionsSection,
} from './HomePage.styles';

type ActiveForm = 'uncontrolled' | 'hook-form' | null;

export function HomePage() {
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
              submission={item}
              isLatest={isLatest}
            />
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
