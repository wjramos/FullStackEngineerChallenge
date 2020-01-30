import React, {useCallback, useState} from 'react';
import styled from "@emotion/styled";

import fetchWithRetry from "../../utils/fetchWithRetry";
import { EMPLOYEE_ENDPOINT } from "../../constants/endpoints";
import Button from "../Button";
import AnimatedList from "../AnimatedList";
import Input from "../Input";
import Card from "../Card";
import Loader from "../Loader";
import {Link} from "../Typography";
import {FlexRow} from "../layout";

const CreateEmployeeWrapper = styled(Card)`
  max-width: 500px;
`;

const FormButton = styled(Button)`
`;

const EMPLOYEE_FIELDS = [
  {
    name: 'firstName',
    label: 'First Name',
    placeholder: 'First name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    placeholder: 'Family name',
  },
  {
    name: 'title',
    label: 'Title',
    placeholder: 'What is their role?',
  },
];

const INITIAL_VALUES = EMPLOYEE_FIELDS.reduce((fields, field) => ({
  ...fields,
  [field.name]: '',
}), {});

export default function CreateUpdateEmployee({ onComplete, onCancel, initialValues = INITIAL_VALUES }) {
  const isCreating = initialValues === INITIAL_VALUES;

  const [form, setForm] = useState(initialValues);
  const [pending, setPending] = useState(false);
  const [displayForm, setDisplayForm] = useState(!isCreating);

  const onSubmit = useCallback(async () => {
    setPending(true);

    try {
      const result = await fetchWithRetry(EMPLOYEE_ENDPOINT, 'PUT', form);

      setDisplayForm(false);
      setForm(INITIAL_VALUES);

      onComplete && onComplete(result);
    } catch(e) {
      // @TODO handle failure state display
      console.error(e);
    } finally {
      setPending(false);
    }
  }, [form, setPending, setDisplayForm, setForm]);

  if (displayForm) {
    return (
      <CreateEmployeeWrapper>
        <h3>{isCreating ? 'Add Employee' : 'Update Details'}</h3>

        <AnimatedList
          items={EMPLOYEE_FIELDS}
          getKeys={field => field.name}
          renderItem={field => (
            <Input
              key={field.label}
              {...field}
              type="text"
              onChange={value => {
                // @TODO switch to use Immer for observable rather than redefining entire form on change
                setForm({
                  ...form,
                  [field.name]: value,
                });
              }}
              value={form[field.name]}
            />
          )}
        />

        {pending ? (
          <Loader />
        ) : (
          <FlexRow>
            {onCancel && <Link onClick={onCancel} color="#f00">Cancel</Link>}
            <FormButton onClick={onSubmit} disabled={Object.values(form).some(value => !value)}>
              {isCreating ? 'Create' : 'Update'}
            </FormButton>
          </FlexRow>
        )}
      </CreateEmployeeWrapper>
    );
  }

  return (
    <FlexRow>
      <Button onClick={() => setDisplayForm(true)}>
        Add employee +
      </Button>
    </FlexRow>
  );
}