const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: process.env.username,
        mongodb_password: process.env.password,
        mongodb_clustername: process.env.cluster,
        mongodb_events: 'events-dev',
        mongodb_newsletter: 'newsletter-dev',
      },
    };
  }

  return {
    env: {
      mongodb_username: process.env.username,
      mongodb_password: process.env.password,
      mongodb_clustername: process.env.cluster,
      mongodb_events: 'events',
      mongodb_newsletter: 'newsletter',
    },
  };
};
