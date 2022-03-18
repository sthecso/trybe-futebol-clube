import readFileDocumentSecret from './Readfile';

export default {
  jwt: {
    secret: readFileDocumentSecret(),
  },
};
