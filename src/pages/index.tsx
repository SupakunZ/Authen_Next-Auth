//tsrsfc --> Auto code typescript
import * as React from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

interface IIndexProps {
}

const Index: React.FunctionComponent<IIndexProps> = (props) => {
  const { data: session } = useSession()
  // console.log(session)
  return (
    <>
      <h1>Hello</h1>
      {session
        ? (<button onClick={() => signOut()}>Sign out</button>)
        : (<button onClick={() => signIn()}>Sign in</button>)
      }
    </>
  )
};

export default Index;
