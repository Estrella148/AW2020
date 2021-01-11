-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-01-2021 a las 21:09:01
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
(2, 'AW'),
(2, 'notas'),
(3, 'TAIS'),
(3, 'notas'),
(4, 'aprender'),
(4, 'tecnología'),
(5, 'Linux'),
(5, 'Windows'),
(5, 'tecnología'),
(6, 'tecnología'),
(6, 'programar'),
(7, 'null'),
(8, 'AW');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medallabronce`
--

CREATE TABLE `medallabronce` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(300) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `medallabronce`
--

INSERT INTO `medallabronce` (`idUsuario`, `nombre`, `cantidad`) VALUES
(37, 'Estudiante', 4),
(36, 'Estudiante', 2),
(37, 'Pregunta popular', 1),
(38, 'Respuesta interesante', 2),
(39, 'Pregunta popular', 1),
(36, 'Pregunta popular', 1);

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

--
-- Volcado de datos para la tabla `medallaplata`
--

INSERT INTO `medallaplata` (`idUsuario`, `nombre`, `cantidad`) VALUES
(37, 'Pregunta destacada', 1);

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
(2, '¿Cómo puedo sacar un 10 en AW?', 'Me gustaría saber como poder sacar la máxima nota en la asignatura de Aplicaciones Web cursada en Ingeniería del Software 2020.', 36, '2021-01-11', 2, 1, 1),
(3, '¿Cómo puedo sacar un 10 en TAIS?', 'Me gustaría saber como poder sacar la máxima nota en la asignatura de TAIS cursada en Ingeniería del Software 2020.', 36, '2021-01-11', 1, 1, 1),
(4, '¿Qué es la informática?', 'La informática me parece super interesante pero no sé qué es exactamente. No tengo ni idea del mundo de la tecnología y me gustaría comenzar a aprender más sobre ello. En especial me gustarían respuestas explícitas, concisas e informativas sobre el tema. Muchas gracias por su tiempo.', 37, '2021-01-11', 4, 3, 1),
(5, '¿Es mejor Linux o Windows?', 'Quiero comprarme un ordenador nuevo y no estoy segura de que sistema operativo va mejor. ¿Cuáles son las ventajas e inconvenientes de cada uno de ellos?', 37, '2021-01-11', 1, 1, 1),
(6, '¿Cómo descargo Visual Studio?', 'Tengo un Windows 10 y me está dando errores en el puerto 33 para instalar el programa. ', 37, '2021-01-11', 1, 1, 1),
(7, '¿Cómo puedo realizar consultar en OLAP?', 'En la asignatura de Sistema de Gestión de Empresas nos han pedido realizar una práctica con consultas en OLAP. No me he enterado muy bien del asunto, así que me vendría bien cualquier información sobre el manejo de esta plataforma.', 39, '2021-01-11', 1, 0, 0),
(8, 'Diseño de páginas HTML y CSS', 'Tengo ciertas dudas a la hora de estructurar el diseño de una página web, cuál es la mejor vía para una interfaz más intuitiva y manejable para el usuario.', 39, '2021-01-11', 3, 1, -1);

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
(38, 'La informática es la disciplina o campo de estudio que abarca el conjunto de conocimientos, métodos y técnicas referentes al tratamiento automático de la información, junto con sus teorías y aplicaciones prácticas, con el fin de almacenar, procesar y transmitir datos e información en formato digital utilizando sistemas computacionales. Los datos son la materia prima para que, mediante su proceso, se obtenga como resultado información. Para ello, la informática crea y/o emplea sistemas de procesamiento de datos, que incluyen medios físicos (hardware) en interacción con medios lógicos (software) y las personas que los programan y/o los usan (humanware).', 4, '2021-01-11', 38, 4, 2),
(39, 'Realizando todas las prácticas, atendiendo en clases de teoría, preguntándome dudas y no equivocarte en el examen.', 1, '2021-01-11', 38, 2, 1),
(40, 'La informática es la forma científica de procesar la información. Este procesamiento consiste en ordenar, seleccionar, ejecutar cálculos de forma que nos permita extraer conclusiones de la información manipulada. Procesar información es transformar datos primarios en información organizada, significativa y útil, que a su vez está compuesta de datos.', 1, '2021-01-11', 40, 4, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

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
(36, 'pepe@ucm.es', '123123', 'Pepe García', 'estandar1.png', 21, 2, 0, '2021-01-11'),
(37, 'ana@ucm.es', '456456', 'Ana Belén', 'estandar2.png', 39, 3, 0, '2021-01-11'),
(38, 'marina@ucm.es', '789789', 'Marina', 'estandar4.jpg', 39, 0, 2, '2021-01-11'),
(39, 'alejandro@ucm.es', '123123', 'Alex Ruiz', '1d5d459755cf73a9ceb85f0233840aa9', 1, 2, 0, '2021-01-11'),
(40, 'esther@ucm.es', '123123', 'Esther Peñas', '0d4c7149a451f1507b331c956e84725c', 11, 0, 1, '2021-01-11'),
(41, 'guille@ucm.es', '123123', 'Guillermo', 'c8fa1b382244b362d53ccbc11c932830', 1, 0, 0, '2021-01-11'),
(42, 'iker@gmail.es', '789789', 'Iker Casillas', 'estandar3.png', 1, 0, 0, '2021-01-11'),
(43, 'fernando_torres@gmail.es', '456456', 'Fernando Torres', 'estandar3.png', 1, 0, 0, '2021-01-11'),
(44, 'meryl@gmail.es', '456456', 'Meryl Streep', '56d0c0d5bb0d7d41eb2c746fd6668dde', 1, 0, 0, '2021-01-11'),
(45, 'tom@ucm.es', 'soyunactorazo', 'Tom Hanks', '73c816f353d457ea5cce5af26ce6b0b0', 1, 0, 0, '2021-01-11');

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

--
-- Volcado de datos para la tabla `votospregunta`
--

INSERT INTO `votospregunta` (`idUsuario`, `idPregunta`, `visitaPregunta`, `votoPregunta`) VALUES
(38, 4, 1, 1),
(38, 8, 1, 0),
(38, 2, 1, 1),
(37, 4, 1, 0),
(37, 8, 1, 1),
(36, 8, 1, 0),
(36, 7, 1, 0),
(36, 6, 1, 1),
(36, 3, 1, 1),
(36, 2, 1, 0),
(36, 5, 1, 1),
(36, 4, 1, 1),
(40, 4, 1, 1);

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
-- Volcado de datos para la tabla `votosrespuesta`
--

INSERT INTO `votosrespuesta` (`idUsuario`, `idRespuesta`, `votoRespuesta`) VALUES
(38, 38, 1),
(38, 39, 1),
(37, 38, 1),
(36, 38, 1),
(40, 38, 1),
(40, 40, 1);

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
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

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
