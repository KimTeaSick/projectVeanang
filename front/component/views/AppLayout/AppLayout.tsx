import React from 'react'
import Link from 'next/link';

const AppLayout = () => {
  return (
    <div>
      <Link href="/">
        <a>to index</a>
      </Link>
      <Link href="/landing">
        <a>to LandingPage</a>
      </Link>
      <Link href="/login">
        <a>to LoginPage</a>
      </Link>
      <Link href="/register">
        <a>to RegisterPage</a>
      </Link>
    </div>
  )
}

export default AppLayout;
