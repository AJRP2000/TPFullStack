API de Mi Juego de Personajes
Bienvenido a la API de Mi Juego de Personajes, una aplicación que te permite crear y personalizar tus propios personajes. A continuación, se describen los endpoints disponibles y sus funcionalidades.

Autenticación
Para acceder a ciertos endpoints, debes proporcionar un token de autenticación en el encabezado de la solicitud. Este token se genera al iniciar sesión y tiene una duración de 1 hora.

GET /logIn/{nombre}&{pinNumerico}
Recibe el nombre y el pinNumérico del usuario y retorna el usuario almacenado en la base de datos junto con un token de autenticación que es válido por 1 hora.
(Para propositos de testing, se cuenta con un usuario llamado TESTING cuyo pin numerico es 1234)

Listas de Elementos
GET /listaPersonajes
Retorna un JSON array con todos los IDs de cada personaje disponible en el juego.

GET /listaRopaSuperior
Retorna un JSON array con todos los IDs de cada prenda superior disponible en el juego.

GET /listaRopaInferior
Retorna un JSON array con todos los IDs de cada prenda inferior disponible en el juego.

GET /listaZapatos
Retorna un JSON array con todos los IDs de cada zapato disponible en el juego.

Obtener Imágenes
GET /personaje/{idPersonaje}
Recibe el idPersonaje y retorna la imagen que corresponde a ese personaje.

GET /ropaSuperior/{idRopa}
Recibe el idRopa de una prenda superior y retorna la imagen que le corresponde.

GET /ropaInferior/{idRopa}
Recibe el idRopa de una prenda inferior y retorna la imagen que le corresponde.

GET /zapatos/{idRopa}
Recibe el idRopa de unos zapatos y retorna la imagen que le corresponde.

Crear Personaje
POST /guardarPersonaje/{nombreUsuario}&{idRopaSuperior}&{idRopaInferior}&{idZapatos}
Recibe el nombreUsuario, el idPersonaje, el idRopaSuperior, el idRopaInferior, el idZapatos, y el token de autenticación en el encabezado. Retorna un mensaje de éxito si es el primer personaje creado por el usuario hoy o un mensaje de error en caso contrario.

Obtener Personajes Creados por Usuario
GET /personajesCreadosPorUser/{nombreUsuario}&{limit}&{offset}
Recibe el nombreUsuario, limit y offset, y el token de autenticación en el encabezado. Retorna un JSON array con los personajes creados por el usuario según el límite y el desplazamiento proporcionados.

Obtener Personajes Creados Recientemente
GET /personajesCreadosRecientemente
Devuelve un JSON array con los últimos 5 personajes creados en el juego.