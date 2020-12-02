-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2020 a las 19:43:43
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
  `etiqueta` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `contVisitas` int(11) NOT NULL,
  `contVotosPos` int(11) NOT NULL,
  `contVotosNeg` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuestas`
--

CREATE TABLE `respuestas` (
  `idRespuesta` int(11) NOT NULL,
  `cuerpo` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_spanish_ci NOT NULL,
  `contVotosPos` int(11) NOT NULL,
  `contVotosNeg` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idPregunta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
(1, 'pepe@ucm.es', '123456', 'Pepe García', '1.png', 0, 0, 0, '2020-12-02'),
(2, 'esther@ucm.es', 'estrella', 'Esther Peñas', '2.png', 0, 0, 0, '2020-12-02'),
(3, 'marina@ucm.es', 'aw', 'Marina García', '3.png', 0, 0, 0, '2020-12-02'),
(4, 'antonio@ucm.es', 'bilbao', 'Antonio Navarro', '5.png', 0, 0, 0, '2020-12-02'),
(5, 'guille@ucm.es', '333', 'Guillermo Garvi', '9.png', 0, 0, 0, '2020-12-02'),
(6, 'alberto@ucm.es', 'juez', 'Alberto Verdejo', '6.png', 0, 0, 0, '2020-12-02'),
(7, 'alejandro@ucm.es', 'magdalenas', 'Alejandro Ruiz', '4.png', 0, 0, 0, '2020-12-02'),
(8, 'isabel@ucm.es', 'juez2', 'Isabel Pita', '7.png', 0, 0, 0, '2020-12-02'),
(9, 'virginia@ucm.es', 'datos', 'Virginia Nose', '8.png', 0, 0, 0, '2020-12-02'),
(10, 'merche@ucm.es', 'pokemon', 'Mercedes Herrero', '10.png', 0, 0, 0, '2020-12-02');

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
  ADD PRIMARY KEY (`nombre`),
  ADD KEY `bronceUsuario` (`idUsuario`);

--
-- Indices de la tabla `medallaoro`
--
ALTER TABLE `medallaoro`
  ADD PRIMARY KEY (`nombre`),
  ADD KEY `oroUsuario` (`idUsuario`);

--
-- Indices de la tabla `medallaplata`
--
ALTER TABLE `medallaplata`
  ADD PRIMARY KEY (`nombre`),
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
  MODIFY `idPregunta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `respuestas`
--
ALTER TABLE `respuestas`
  MODIFY `idRespuesta` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
