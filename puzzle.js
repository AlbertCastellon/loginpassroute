// Snippets de código para poder componer el programa

//Usado?: X
  const middlewares = require('./middlewares');
//--- Explicación: 
//Importa las funciones del fichero middlewares en un formato de objeto
// -------------------------------------------------------------------------------------

//Usado?: X
const bodyParser = require('body-parser');
//--- Explicación:
//Importa el módulo body parse a formato objeto
// -------------------------------------------------------------------------------------

//Usado?: X
const session = require('express-session');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: X
const express = require('express');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: X
const bodyParser = require('body-parser');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: X
const session = require('express-session');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: X
const dotenv = require('dotenv');
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: X
const middlewares = require('./middlewares');
//--- Explicación:
//Importa las funciones del fichero middlewares en un formato de objeto
// -------------------------------------------------------------------------------------

//Usado?: X
const routes = require('./routes');
//--- Explicación:
//Importa las funciones del fichero routes en un formato de objeto
// -------------------------------------------------------------------------------------

//Usado?: X
dotenv.config();
//--- Explicación:
//Usa el metodo cinfig de la dependencia dotenv, lee el fichero .env parsea su contenido y lo assigna a process.env, devuelve un objeto con el contenido y un error si falla.
// -------------------------------------------------------------------------------------

//Usado?: X
const app = express();
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: X
const PORT = 4000;
//--- Explicación:
//establece el puerto a un número en este caso 4000
// -------------------------------------------------------------------------------------

//Usado?: X
const dotenv = require('dotenv');
//--- Explicación:
//Importa la dependencia dotenv
// -------------------------------------------------------------------------------------

//Usado?: X
dotenv.config();
//--- Explicación:
//Usa el metodo cinfig de la dependencia dotenv, lee el fichero .env parsea su contenido y lo assigna a process.env, devuelve un objeto con el contenido y un error si falla.
// -------------------------------------------------------------------------------------

//Usado?: X
middlewares.setupApp(app);
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: X
routes.setup(app);
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: X
const validarPalabraMiddleware = (req, res, next) => {
  const palabraCorrecta = process.env.PALABRA_SECRETA || '';

  if (req.body.palabra === palabraCorrecta) {
    req.session.palabraSecreta = req.body.palabra;
    next();
  } else {
    res.redirect('/?error=1');
  }
};
//--- Explicación: 


// -------------------------------------------------------------------------------------


//Usado?: X
const setup = (app) => {
  app.get('/', (req, res) => {
    const mensajeError = req.query.error
      ? (req.query.error === '1' ? 'Palabra incorrecta, inténtalo de nuevo.' : 'No estás logado.')
      : '';
    if (req.session.palabraSecreta) {
      return res.redirect('/profile');
    }
  //Aquí va código dentro
})}
//--- Explicación: 


// -------------------------------------------------------------------------------------


//Usado?: X
res.send(`
  <html>
    <body>
      <h1>Página de Inicio</h1>
      <p>${mensajeError}</p>
      <form method="post" action="/profile">
        <label for="palabra">Introduce la palabra:</label>
        <input type="text" name="palabra" required>
        <button type="submit">Enviar</button>
      </form>
    </body>
  </html>
`);
//--- Explicación: 


// -------------------------------------------------------------------------------------

//Usado?: X
const setupAPP = (app) => {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(session({
    secret: 'secretoSuperSecreto',
    resave: false,
    saveUninitialized: true,
  }));
};
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: X
app.post('/profile', middlewares.validarPalabraMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: X
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: X
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: X
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: X
const verificarSesionMiddleware = (req, res, next) => {
  if (req.session.palabraSecreta) {
    next();
  } else {
    res.redirect('/?error=2');
  }
};
//--- Explicación: 

// -------------------------------------------------------------------------------------


//Usado?: X
app.get('/profile', middlewares.verificarSesionMiddleware, (req, res) => {
  res.send(`
    <h1>Ruta del Perfil (Sesión activa)</h1>
    <form method="post" action="/logout">
      <button type="submit">Log Out</button>
    </form>
  `);
});
//--- Explicación: 

// -------------------------------------------------------------------------------------


//Usado?: X
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});
//--- Explicación: 

// -------------------------------------------------------------------------------------

//Usado?: X
module.exports = {
  setup,
};
//--- Explicación:

// -------------------------------------------------------------------------------------

//Usado?: X
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:

// -------------------------------------------------------------------------------------

