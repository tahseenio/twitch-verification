const VALID_PIN = '123456';

export const validateInput = (numberToCheck: string): Promise<string> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (numberToCheck === VALID_PIN) {
        resolve('Pin is valid');
      } else {
        reject('Invalid Pin');
      }
    }, 2000)
  );
