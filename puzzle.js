// Snippets de código para poder componer el programa

//Usado?: X
  const middlewares = require('./middlewares');
//--- Explicación: 
//Importa las funciones del fichero middlewares en un formato de objeto
// -------------------------------------------------------------------------------------

//Usado?: X
const bodyParser = require('body-parser');
//--- Explicación:
//Importa la dependencia body-parser
// -------------------------------------------------------------------------------------

//Usado?: X
const session = require('express-session');
//--- Explicación:
//Importa la dependencia express-session
// -------------------------------------------------------------------------------------

//Usado?: X
const express = require('express');
//--- Explicación:
//Importa la dependencia express
// -------------------------------------------------------------------------------------

//Usado?: X
const bodyParser = require('body-parser');
//--- Explicación:
//Importa la dependencia body-parser
// -------------------------------------------------------------------------------------

//Usado?: X
const session = require('express-session');
//--- Explicación:
//Importa la dependencia express-session
// -------------------------------------------------------------------------------------

//Usado?: X
const dotenv = require('dotenv');
//--- Explicación:
//Importa la dependencia dotenv
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
// Iniciamos en el proyecto para que pueda utilizar express y sus funciones
// -------------------------------------------------------------------------------------

//Usado?: X
const PORT = 4000;
//--- Explicación:
//Establece el puerto a un número en este caso 4000
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
//Llama la funcion setupApp que forma parte del objeto middlewares previamente importado
// -------------------------------------------------------------------------------------

//Usado?: X
routes.setup(app);
//--- Explicación: 
//Llama la funcion setup que forma parte del objeto routes previamente importado
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
// Función que recupera, valida y redirecciona en caso de error.

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
// Función que da error en caso de poner bien la palabra y reedirigirnos a otra página en caso de acertar la palabra.

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
//Envia como respuesta el documento de la pagina de inicio con la variable mensaje error que depende de si has intentado loguear  
//anteriormente y fallado o aun no lo has intentado.
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
//Función que parsea información en un formato que permite tanto objetos como arrays y crea una sesión con un objeto de información
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
//Chequea que la palabra introducida en el imput sea la correcta y guarda la palabra en la sessión
// -------------------------------------------------------------------------------------

//Usado?: X
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 
//Parsea información en un formato que permite tanto objetos como arrays
// -------------------------------------------------------------------------------------

//Usado?: X
app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));

//--- Explicación: 
//Crea una sesión con un objeto.
// -------------------------------------------------------------------------------------

//Usado?: X
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
//--- Explicación: 
//Pone en marcha la app para poder abrir la página en el puerto especificado previamente.
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
//Middleware que limita a que solo los usuarios autorizados que tengan en la session palabraSecreta puedan acceder, si no esta te pide que loguees.
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
// Te lleva a tu perfil una vez has iniciado sesión.
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
// Cierra tu sesión tras haber iniciado con anterioridad a ella.
// -------------------------------------------------------------------------------------

//Usado?: X
module.exports = {
  setup,
};
//--- Explicación:
// Exporta la función para que pueda ser utilizada en otros ficheros.
// -------------------------------------------------------------------------------------

//Usado?: X
module.exports = {
  validarPalabraMiddleware,
  verificarSesionMiddleware,
  setupAPP,
};
//--- Explicación:
//Exporta las funciones creadas previamente en formato de objeto para que puedan ser usadas en otros ficheros.
// -------------------------------------------------------------------------------------

