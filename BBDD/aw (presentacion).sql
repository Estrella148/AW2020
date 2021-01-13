-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-01-2021 a las 20:03:15
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `aw`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiquetas`
--

CREATE TABLE `etiquetas` (
  `idPregunta` int(11) NOT NULL,
  `nombre` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `etiquetas`
--

INSERT INTO `etiquetas` (`idPregunta`, `nombre`) VALUES
(1, 'css'),
(1, 'css3'),
(2, 'css'),
(2, 'html'),
(3, 'JavaScript'),
(4, 'nodejs'),
(5, 'mysql'),
(5, 'sql');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medallabronce`
--

CREATE TABLE `medallabronce` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medallaoro`
--

CREATE TABLE `medallaoro` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medallaplata`
--

CREATE TABLE `medallaplata` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `idPregunta` int(11) NOT NULL,
  `titulo` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `cuerpo` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `contVisitas` int(11) NOT NULL,
  `contVotos` int(11) NOT NULL,
  `puntosPregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`idPregunta`, `titulo`, `cuerpo`, `idUsuario`, `fecha`, `contVisitas`, `contVotos`, `puntosPregunta`) VALUES
(1, '¿Cual es la diferencia entre position: relative, position: absolute y position: fixed?', 'Sé que estas propiedades de CSS sirven para posicionar un elemento dentro de la página. Sé que estas propiedades de CSS sirven para posicionar un elemento dentro de la página.', 46, '2021-01-13', 0, 0, 0),
(2, '¿Cómo funciona exactamente nth-child?', 'No acabo de comprender muy bien que hace exactamente y qué usos prácticos puede tener.', 47, '2021-01-13', 0, 0, 0),
(3, 'Diferencias entre == y === (comparaciones en JavaScript)', ' Siempre he visto que en JavaScript hay:  asignaciones = comparaciones == y === Creo entender que == hace algo parecido a comparar el valor de la variable y el === también compara el tipo (como un equals de java).', 48, '2021-01-13', 0, 0, 0),
(4, 'Problema con asincronismo en Node', ' Soy nueva en Node... Tengo una modulo que conecta a una BD de postgres por medio de pg-node. En eso no tengo problemas. Mi problema es que al llamar a ese modulo, desde otro modulo, y despues querer usar los datos que salieron de la BD me dice undefined... Estoy casi seguro que es porque la conexion a la BD devuelve una promesa, y los datos no estan disponibles al momento de usarlos.', 49, '2021-01-13', 0, 0, 0),
(5, '¿Qué es la inyección SQL y cómo puedo evitarla?', 'He encontrado bastantes preguntas en StackOverflow sobre programas o formularios web que guardan información en una base de datos (especialmente en PHP y MySQL) y que contienen graves problemas de seguridad relacionados principalmente con la inyección SQL.  Normalmente dejo un comentario y/o un enlace a una referencia externa, pero un comentario no da mucho espacio para mucho y sería positivo que hubiera una referencia interna en SOes sobre el tema así que decidí escribir esta pregunta.', 50, '2021-01-13', 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `idRespuesta` int(11) NOT NULL,
  `cuerpo` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `contVotos` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `puntosRespuesta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `respuestas`
--

INSERT INTO `respuestas` (`idRespuesta`, `cuerpo`, `contVotos`, `fecha`, `idUsuario`, `idPregunta`, `puntosRespuesta`) VALUES
(42, 'La propiedad position sirve para posicionar un elemento dentro de la página. Sin embargo, dependiendo de cual sea la propiedad que usemos, el elemento tomará una referencia u otra para posicionarse respecto a ella.  Los posibles valores que puede adoptar la propiedad position son: static | relative | absolute | fixed | inherit | initial.', 0, '2021-01-13', 50, 1, 0),
(43, 'La pseudoclase :nth-child() selecciona los hermanos que cumplan cierta condición definida en la fórmula an + b. a y b deben ser números enteros, n es un contador. El grupo an representa un ciclo, cada cuantos elementos se repite; b indica desde donde empezamos a contar.', 0, '2021-01-13', 51, 2, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('96EbF1WDPTOPuau-vlfy0A5wop8fiLhP', 1610650796, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"currentUser\":\"emy@404.es\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `pass` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `nombre` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `imagen` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `reputacion` int(11) NOT NULL,
  `contPreguntas` int(11) NOT NULL,
  `contRespuestas` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correo`, `pass`, `nombre`, `imagen`, `reputacion`, `contPreguntas`, `contRespuestas`, `fecha`) VALUES
(46, 'nico@404.es', '1234', 'Nico', '2829cd82f3359bb90f5147167aec1730', 1, 1, 0, '2021-01-13'),
(47, 'roberto@404.es', '1234', 'Roberto', '2c54b2c07b79bae0c532bff09108f818', 1, 1, 0, '2021-01-13'),
(48, 'sfg@404.es', '1234', 'SFG', '8173ef0e4b5902c65dd39deb5dfbf9b9', 1, 1, 0, '2021-01-13'),
(49, 'marta@404.es', '1234', 'Marta', 'a59fe2dfe1a59bc15fe2a51c576f9b25', 1, 1, 0, '2021-01-13'),
(50, 'lucas@404.es', '1234', 'Lucas', 'defecto3.png', 1, 1, 1, '2021-01-13'),
(51, 'emy@404.es', '1234', 'Emy', 'c0c8bc580b531023e681d5abce9db2f8', 1, 0, 1, '2021-01-13');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votospregunta`
--

CREATE TABLE `votospregunta` (
  `idUsuario` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `visitaPregunta` tinyint(1) NOT NULL,
  `votoPregunta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votosrespuesta`
--

CREATE TABLE `votosrespuesta` (
  `idUsuario` int(11) NOT NULL,
  `idRespuesta` int(11) NOT NULL,
  `votoRespuesta` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD KEY `preguntaEtiqueta` (`idPregunta`);

--
-- Indices de la tabla `medallabronce`
--
ALTER TABLE `medallabronce`
  ADD KEY `bronceUsuario` (`idUsuario`);

--
-- Indices de la tabla `medallaoro`
--
ALTER TABLE `medallaoro`
  ADD KEY `oroUsuario` (`idUsuario`);

--
-- Indices de la tabla `medallaplata`
--
ALTER TABLE `medallaplata`
  ADD KEY `plataUsuario` (`idUsuario`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`idPregunta`),
  ADD KEY `usuarioPregunta` (`idUsuario`);

--
-- Indices de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD PRIMARY KEY (`idRespuesta`),
  ADD KEY `usuarioRespuesta` (`idUsuario`),
  ADD KEY `preguntaRespuesta` (`idPregunta`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`,`correo`);

--
-- Indices de la tabla `votospregunta`
--
ALTER TABLE `votospregunta`
  ADD KEY `usuarioVoto` (`idUsuario`),
  ADD KEY `preguntaVoto` (`idPregunta`);

--
-- Indices de la tabla `votosrespuesta`
--
ALTER TABLE `votosrespuesta`
  ADD KEY `respuestavoto` (`idRespuesta`),
  ADD KEY `usuariovotorespuesta` (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `etiquetas`
--
ALTER TABLE `etiquetas`
  ADD CONSTRAINT `preguntaEtiqueta` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`idPregunta`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medallabronce`
--
ALTER TABLE `medallabronce`
  ADD CONSTRAINT `bronceUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medallaoro`
--
ALTER TABLE `medallaoro`
  ADD CONSTRAINT `oroUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medallaplata`
--
ALTER TABLE `medallaplata`
  ADD CONSTRAINT `plataUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `usuarioPregunta` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `respuestas`
--
ALTER TABLE `respuestas`
  ADD CONSTRAINT `preguntaRespuesta` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`idPregunta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioRespuesta` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `votospregunta`
--
ALTER TABLE `votospregunta`
  ADD CONSTRAINT `preguntaVoto` FOREIGN KEY (`idPregunta`) REFERENCES `preguntas` (`idPregunta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuarioVoto` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `votosrespuesta`
--
ALTER TABLE `votosrespuesta`
  ADD CONSTRAINT `respuestavoto` FOREIGN KEY (`idRespuesta`) REFERENCES `respuestas` (`idRespuesta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `usuariovotorespuesta` FOREIGN KEY (`idUsuario`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
