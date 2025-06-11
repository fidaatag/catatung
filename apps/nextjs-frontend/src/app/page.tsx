import {type JSX} from 'react';

export default function Home(): JSX.Element {
  return (
    <>
      <h2>Welcome to Next.js</h2>
      <div className="flex gap-10">
        <a href="/login">login</a>
        <a href="/register">register</a>
      </div>
    </>
  );
}
