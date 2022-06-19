import React, { useEffect, useRef, useState } from 'react';

//TODO: making it auto submit after the last number has been entered
// TODO: accessibilty: such as tabbing to submit button

const TwitchBox = () => {
  const input1ref = useRef<HTMLInputElement>(null);
  const input2ref = useRef<HTMLInputElement>(null);
  const input3ref = useRef<HTMLInputElement>(null);
  const input4ref = useRef<HTMLInputElement>(null);
  const input5ref = useRef<HTMLInputElement>(null);
  const input6ref = useRef<HTMLInputElement>(null);

  const inputs = [
    { name: 'input1', reference: input1ref },
    { name: 'input2', reference: input2ref },
    { name: 'input3', reference: input3ref },
    { name: 'input4', reference: input4ref },
    { name: 'input5', reference: input5ref },
    { name: 'input6', reference: input6ref },
  ];

  useEffect(() => {
    input1ref.current?.focus();
  }, []);

  const [values, setValues] = useState({
    input1: '',
    input2: '',
    input3: '',
    input4: '',
    input5: '',
    input6: '',
  });

  // useEffect(() => {
  //   console.log(values);
  // }, [values]);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputName = e.currentTarget.name;

    setValues({
      ...values,
      [inputName]: e.currentTarget.value,
    });

    if (
      e.key === 'Backspace' ||
      e.key === '37' ||
      e.key === '39' ||
      e.key === 'Tab' ||
      e.key === 'Shift'
    ) {
      return;
    }

    const currIndex = inputs.findIndex(
      (item) => item.name === e.currentTarget.name
    );
    const nextIndex = currIndex + 1;

    if (nextIndex === inputs.length) {
      // handleSubmit();
      return;
    } else {
      const ref = inputs[nextIndex].reference;
      ref.current?.focus();
    }
  };

  const handleSubmit = (e?: any) => {
    e?.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      const message = `CODE SUBMITTED AS: ${Object.values(values).join('')}`;
      alert(message);
      setIsSubmitted(false);
    }, 2000);
  };

  return (
    <section className='twitch--wrapper'>
      {isSubmitted && <div style={{ color: 'white' }}>Submitting...</div>}
      <button className='CloseBtn'>X</button>
      <h1 className='title'>Account Verification</h1>
      <p className='para'>
        We've sent a 6-digit security code to +61 0345688323. Please enter your
        code below. You can update your account information anytime in{' '}
        <span className='purple'>Settings</span>.
      </p>
      <form className='form--wrapper' onSubmit={(e) => handleSubmit(e)}>
        <div className='inputs--wrapper'>
          {inputs.map((elem) => (
            <input
              className='number__input'
              key={elem.name}
              name={elem.name}
              type='text'
              maxLength={1}
              ref={elem.reference}
              onKeyUp={(e) => handleChange(e)}
              required
            />
          ))}
        </div>
        <p className='resend__para'>Resend Code</p>
        <p className='twitch-policy__para'>
          Twitch may use your phone number to call or send text messages with
          information regarding your account.
        </p>
        <div className='bottom-button--wrapper'>
          <button className='genericBtn'>Back</button>
          <button type='submit' className='genericBtn genericBtn--purple'>
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default TwitchBox;
