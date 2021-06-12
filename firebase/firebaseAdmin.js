const admin = require('firebase-admin');
const serviceAccount = require('./secretAccount.json');

export const veriyIdToken = (token) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credentials: admin.credential.cert(serviceAccount),
    });
  }
  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error;
    });
};
