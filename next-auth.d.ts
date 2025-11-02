import { User } from './lib/types';

declare module 'next-auth' {
  interface Session {
    user: User;
    expires: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    [key: string]: any;
  }
}
