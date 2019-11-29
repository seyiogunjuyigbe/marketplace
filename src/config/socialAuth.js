import { GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    SITE_URL } from './constants';

export const googleConfig = {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${SITE_URL}/auth/google/redirect`
  };