# Clone of the Twitch 2FA Popup [Link](https://twitch-verification.vercel.app)

<p>Correct PIN is 123456</p>

## Tech Used
<p align="center">
  <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" >
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" >
  <img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" >
</p>

## Lessons Learned
- Learned how to inputs that autofocus to the next input once the max length has been reached. This is good for future projects when I want to create aesthetic components for things such as 2FA and phone number inputs. 
- Learned how to create a basic fake API to check the 2FA Code

## Future optimizations
- Auto focus on initial load does not work correctly on Firefox. Seems to be only a firefox issues as all other chromium browsers work.
- Remove 'any' types to be more strict. One issue was figuring out what the event type of a catch error was.
