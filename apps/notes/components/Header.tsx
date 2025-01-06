import { Flex } from 'antd';

import { auth, signIn, signOut } from '@/auth';

interface HeaderProps {}

const SignIn: React.FC<any> = ({ provider, ...props }) => {
  return (
    <form
      action={async () => {
        'use server';
        await signIn(provider);
      }}
    >
      <button type="submit" {...props}>
        Sign In
      </button>
    </form>
  );
};

const SignOut: React.FC = props => {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit" {...props}>
        Sign Out
      </button>
    </form>
  );
};

const Header: React.FC<HeaderProps> = async () => {
  const session = await auth();

  return (
    <Flex justify="space-around">
      {session?.user ? (
        <>
          <span>{session.user.name}</span>
          <SignOut />
        </>
      ) : (
        <SignIn />
      )}
    </Flex>
  );
};

export default Header;

let a =
  'https://github.com/login/oauth/authorize?scope=read:user+user:email&response_type=code&client_id=Ov23lizW9zR45A1c6GcR&redirect_uri=http://localhost:3000/api/auth/callback/github&code_challenge=GoK23mAr2OGKX4lokwvtwPEemY5MGu-RuGEnsw1n_3E&code_challenge_method=S256';
