const libs = global.abs('api/libs');

/* ================================================ */
if (process.env.NODE_ENV === 'test') {
  libs.dotenv.config({
    path: '.test.env',
  });
} else {
  libs.dotenv.config({
    path: '.env',
  });
}

/* ------------------------------------------------ */
// NODE_ENV
libs.joi.assert(
  process.env.NODE_ENV,
  libs.joi
    .string()
    .valid('development', 'production', 'test')
    .required(),
);

// APP_HOST
libs.joi.assert(
  process.env.APP_HOST,
  libs.joi
    .string()
    .valid('localhost')
    .required(),
);

// APP_PORT
libs.joi.assert(
  process.env.APP_PORT,
  libs.joi
    .number()
    .integer()
    .min(1)
    .max(65535)
    .required(),
);

// MONGODB_HOST
libs.joi.assert(
  process.env.MONGODB_HOST,
  libs.joi
    .string()
    .uri({
      scheme: [
        'mongodb+srv',
      ],
    })
    .required(),
);

// JWT_SECRET
libs.joi.assert(
  process.env.APP_SECRET,
  libs.joi
    .string()
    .required(),
);

// JWT_ALGORITHM
libs.joi.assert(
  process.env.JWT_ALGORITHM,
  libs.joi
    .string()
    .valid('HS256')
    .required(),
);

// GMAIL_USER
libs.joi.assert(
  process.env.GMAIL_USER,
  libs.joi
    .string()
    .email()
    .required(),
);

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
module.exports = {
  env: process.env.NODE_ENV,

  app: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    secret: process.env.APP_SECRET,
  },

  mongodb: {
    host: process.env.MONGODB_HOST,
  },

  gmail: {
    user: process.env.GMAIL_USER,
    password: process.env.GMAIL_PASSWORD,
  },
};
