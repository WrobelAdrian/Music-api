export const config = {
  mLab: {
    uri: process.env.MLAB_URI,
  },
  mongo: {
    uri: process.env.MONGO_URI,
  },
  jwt: {
    secretKey: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
  },
  deezer: {
    deezerUrl: process.env.DEEZER_URL,
  },
};
