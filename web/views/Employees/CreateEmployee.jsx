import React, {useCallback, useState} from 'react';
import styled from "@emotion/styled";
import Loader from 'react-loader-spinner';

import fetchWithRetry from "../../utils/fetchWithRetry";
import { EMPLOYEE_ENDPOINT } from "../../constants/endpoints";
import Button from "../../components/Button";
import AnimatedList from "../../components/AnimatedList";
import Input from "../../components/Input";
import Card from "../../components/Card";

const FormButton = styled(Button)`
  margin-top: 48px;
`;

const LoaderWrapper = styled.div`
  text-align: center;
`;

const EMPLOYEE_FIELDS = [
  {
    name: 'firstName',
    label: 'First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
  },
  {
    name: 'title',
    label: 'Title',
    placeholder: 'What do they do?',
  },
];

const INITIAL_VALUES = EMPLOYEE_FIELDS.reduce((fields, field) => ({
  ...fields,
  [field.name]: '',
}), {});

export default function CreateEmployee({ onComplete }) {
  const [form, setForm] = useState({});
  const [pending, setPending] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  const onSubmit = useCallback(async e => {
    e.preventDefault();

    setPending(true);

    await fetchWithRetry(EMPLOYEE_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(form),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (onComplete) onComplete();

    setDisplayForm(false);
    setPending(false);
    setForm(INITIAL_VALUES);
  }, [form]);

  if (pending) {
    return (
      <LoaderWrapper>
        <Loader type="Rings" color="#ccc" />
        <p>Please wait...</p>
      </LoaderWrapper>
    );
  }

  if (displayForm) {
    return (
      <Card>
        <h3>Add employee</h3>

        <AnimatedList>
          {EMPLOYEE_FIELDS.map(field => (
            <Input
              key={field.label}
              {...field}
              onChange={value => {
                // @TODO switch to use Immer for observable rather than redefining entire form on change
                setForm({
                  ...form,
                  [field.name]: value,
                });
              }}
              value={form[field.name]}
            />
          ))}

          <FormButton onClick={onSubmit} disabled={Object.values(form).some(value => !value)}>
            Create employee
          </FormButton>
        </AnimatedList>
      </Card>
    );
  }

  return (
    <Button onClick={() => setDisplayForm(true)}>
      Add employee +
    </Button>
  );
}