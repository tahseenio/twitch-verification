import React, { useCallback, useEffect, useRef, useState } from 'react';

import { validateInput } from '../api';
import Loader from './Loader';

//TODO: making it auto submit after the last number has been entered
// TODO: accessibilty: such as tabbing to submit button

const TOTAL_DIGIT_LENGTH = 6;

const PIN_MIN_VALUE = 0;
const PIN_MAX_VALUE = 9;

const TwitchBox = () => {
  const [number, setNumber] = useState<Array<number | undefined>>(
    new Array(TOTAL_DIGIT_LENGTH)
  );

  const [submitting, setSubmitting] = useState<boolean | undefined>(undefined);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  const onNumberChange = (
    numberEntry: number | undefined,
    numberIndex: number
  ) => {
    const newNumber = [...number];
    newNumber[numberIndex] = numberEntry;
    setNumber(newNumber);
  };

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const changeNumberFocus = (numberIndex: number) => {
    const ref = inputRefs.current[numberIndex];
    if (ref) {
      ref.focus();
    }
  };

  useEffect(() => {
    changeNumberFocus(0);
  }, [submitting]);

  const removeValuesFromArray = (valuesArray: string[], value: string) => {
    const valuesIndex = valuesArray.findIndex((entry) => entry === value);
    if (valuesIndex === -1) return;
    valuesArray.splice(valuesIndex, 1);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const previousValue = e.target.defaultValue;
    const valuesArray = e.target.value.split('');
    removeValuesFromArray(valuesArray, previousValue);
    const value = valuesArray.pop();
    if (!value) return;
    const number = Number(value.trim());
    if (isNaN(number) || value.length === 0) {
      return;
    }
    if (number >= PIN_MIN_VALUE && number <= PIN_MAX_VALUE) {
      onNumberChange(number, index);
      if (index < TOTAL_DIGIT_LENGTH) {
        changeNumberFocus(index + 1);
      }
    }
  };

  const onKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const keyboardKeyCode = e.nativeEvent.code;
    if (keyboardKeyCode !== 'Backspace') {
      return;
    }

    if (number[index] === undefined) {
      changeNumberFocus(index - 1);
    } else {
      onNumberChange(undefined, index);
    }
  };

  const validateNumber = useCallback(async () => {
    setSubmitting(true);
    setIsDisabled(false);
    try {
      const result = await validateInput(number.join(''));
      setValidationMessage(result);
      setIsValid(true);
    } catch (e: any) {
      setValidationMessage(e);
      setIsValid(false);
      setNumber(new Array(TOTAL_DIGIT_LENGTH));
    } finally {
      setIsDisabled(true);
      setSubmitting(false);
      setTimeout(() => {
        setValidationMessage('');
      }, 2500);
    }
  }, [number]);

  useEffect(() => {
    const checkNumber = async () => {
      if (!number.includes(undefined)) {
        await validateNumber();
      }
    };
    checkNumber();
  }, [number, validateNumber]);

  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  return (
    <section className='twitch--wrapper'>
      <button className='CloseBtn'>X</button>
      <h1 className='title'>Account Verification</h1>
      <p className='para'>
        We've sent a 6-digit security code to +61 0345688323. Please enter your
        code below. You can update your account information anytime in{' '}
        <span className='purple'>Settings</span>.
      </p>
      <div className='inputs--wrapper'>
        {Array.from({ length: TOTAL_DIGIT_LENGTH }).map((_, index) => (
          <input
            key={index}
            disabled={submitting}
            className='number__input'
            // maxLength={1}
            ref={(elem) => {
              if (elem) {
                inputRefs.current[index] = elem;
              }
            }}
            onChange={(e) => onChange(e, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            value={number[index] || ''}
          />
        ))}
      </div>
      <p className='resend__para'>Resend Code</p>
      <p className='twitch-policy__para'>
        Twitch may use your phone number to call or send text messages with
        information regarding your account.
      </p>
      <div className='lower--wrapper'>
        <p className='para' style={{ color: isValid ? 'green' : 'red' }}>
          {validationMessage}
        </p>
        <div className='bottom-button--wrapper'>
          <button className='genericBtn'>Back</button>
          <button
            style={{ backgroundColor: isDisabled ? 'gray' : undefined }}
            disabled={isDisabled}
            className='genericBtn genericBtn--purple'
            onClick={validateNumber}
          >
            {submitting ? <Loader /> : 'Submit'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TwitchBox;
