import Head from 'next/head';
import { auth, testAccount } from '../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Auth() {
  //   const cred = await signInWithEmailAndPassword(
  //     auth,
  //     testAccount.email,
  //     testAccount.password
  //   );
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Test MVP App - Auth Page</h1>
      <h2>Use `yarn dev` to start the test app</h2>
      <p>{JSON.stringify(auth)}</p>
    </>
  );
}