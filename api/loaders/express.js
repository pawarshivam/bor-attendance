const libs        = global.abs('api/libs');
const commons     = global.abs('api/commons');
const routers     = global.abs('api/routers');
const middlewares = global.abs('api/middlewares');

/* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
// Configure the express app
module.exports = (app) => {
  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  // Setting up EJS
  app.set('view engine', 'ejs');

  // Middleware for serving static files
  app.use(libs.express.static('public'));

  // Middleware for parsing POST request bodies
  app.use(libs.express.urlencoded({ extended: true }));

  // Middleware for session management
  app.use(libs.session({
    secret: commons.env.app.secret,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(libs.flash());

  app.use((request, response, next) => {
    response.locals.config = commons.config;
    response.locals.session = request.session;
    response.locals.flash = request.flash;
    next();
  });

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(libs.cors());

  // HTTP Requests logger
  app.use(libs.morgan('dev'));

  app.disable('etag');

  // Static content
  app.use(libs.express.static(libs.path.join('static')));

  // Register routers
  app.use('/', routers());

  // Register error handler
  app.use(middlewares.error);
};
