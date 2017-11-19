CREATE DATABASE  IF NOT EXISTS `starbuc` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `starbuc`;
-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: localhost    Database: starbuc
-- ------------------------------------------------------
-- Server version	5.7.19-0ubuntu0.17.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `estados_tickets`
--

DROP TABLE IF EXISTS `estados_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `estados_tickets` (
  `et_id` int(11) NOT NULL AUTO_INCREMENT,
  `et_estado` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`et_id`),
  UNIQUE KEY `et_estado_UNIQUE` (`et_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movimientos` (
  `mo_id` int(11) NOT NULL AUTO_INCREMENT,
  `mo_fecha` datetime DEFAULT NULL,
  `mo_moviemiento` int(11) DEFAULT NULL,
  `mo_ticket` int(11) DEFAULT NULL,
  `mo_usuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`mo_id`),
  KEY `mo_ticket_idx` (`mo_ticket`),
  KEY `mo_movimiento_idx` (`mo_moviemiento`),
  KEY `mo_usuario_idx` (`mo_usuario`),
  CONSTRAINT `mo_movimiento` FOREIGN KEY (`mo_moviemiento`) REFERENCES `movimientos` (`mo_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `mo_ticket` FOREIGN KEY (`mo_ticket`) REFERENCES `tickets` (`ti_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `mo_usuario` FOREIGN KEY (`mo_usuario`) REFERENCES `usuarios` (`us_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `planteles`
--

DROP TABLE IF EXISTS `planteles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `planteles` (
  `pl_id` int(11) NOT NULL AUTO_INCREMENT,
  `pl_nombre` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`pl_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickets` (
  `ti_id` int(11) NOT NULL,
  `ti_estado` int(11) DEFAULT NULL,
  `ti_tipo` int(11) DEFAULT NULL,
  `ti_folio` varchar(30) DEFAULT NULL,
  `ti_fecha_alta` datetime DEFAULT NULL,
  `ti_fecha_cierre` datetime DEFAULT NULL,
  `ti_pregunta` varchar(255) DEFAULT NULL,
  `ti_calificacion` decimal(11,0) DEFAULT NULL,
  PRIMARY KEY (`ti_id`),
  UNIQUE KEY `ti_folio_UNIQUE` (`ti_folio`),
  KEY `ti_tipo_idx` (`ti_tipo`),
  KEY `ti_estado_idx` (`ti_estado`),
  CONSTRAINT `ti_estado` FOREIGN KEY (`ti_estado`) REFERENCES `estados_tickets` (`et_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ti_tipo` FOREIGN KEY (`ti_tipo`) REFERENCES `tipos_tickets` (`tt_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipos_movimientos`
--

DROP TABLE IF EXISTS `tipos_movimientos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos_movimientos` (
  `tm_id` int(11) NOT NULL AUTO_INCREMENT,
  `tm_movimiento` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`tm_id`),
  UNIQUE KEY `tm_movimiento_UNIQUE` (`tm_movimiento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipos_tickets`
--

DROP TABLE IF EXISTS `tipos_tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos_tickets` (
  `tt_id` int(11) NOT NULL AUTO_INCREMENT,
  `tt_tipo` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`tt_id`),
  UNIQUE KEY `tt_tipo_UNIQUE` (`tt_tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tipos_usuarios`
--

DROP TABLE IF EXISTS `tipos_usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos_usuarios` (
  `tu_id` int(11) NOT NULL AUTO_INCREMENT,
  `tu_tipo` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`tu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `us_id` int(11) NOT NULL AUTO_INCREMENT,
  `us_nombre` varchar(60) DEFAULT NULL,
  `us_correo` varchar(60) DEFAULT NULL,
  `us_tipo_usuario` int(11) DEFAULT NULL,
  `us_plantel` int(11) DEFAULT NULL,
  PRIMARY KEY (`us_id`),
  UNIQUE KEY `us_correo_UNIQUE` (`us_correo`),
  KEY `us_tipo_usuario_idx` (`us_tipo_usuario`),
  KEY `us_plantel_idx` (`us_plantel`),
  CONSTRAINT `us_plantel` FOREIGN KEY (`us_plantel`) REFERENCES `planteles` (`pl_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `us_tipo_usuario` FOREIGN KEY (`us_tipo_usuario`) REFERENCES `tipos_usuarios` (`tu_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-09-19 20:24:29
