CREATE TABLE item (
  id int(11) UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO item (title) VALUES ('Stuff'), ('Doodads');

-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: localhost    Database: projet3
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `article`
--

DROP TABLE IF EXISTS `article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(150) NOT NULL,
  `date` date NOT NULL,
  `texte` longtext NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article`
--

LOCK TABLES `article` WRITE;
/*!40000 ALTER TABLE `article` DISABLE KEYS */;
/*!40000 ALTER TABLE `article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artiste`
--

DROP TABLE IF EXISTS `artiste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artiste` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `pseudo` varchar(50) DEFAULT NULL,
  `date_naissance` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artiste`
--

LOCK TABLES `artiste` WRITE;
/*!40000 ALTER TABLE `artiste` DISABLE KEYS */;
/*!40000 ALTER TABLE `artiste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artiste_has_article`
--

DROP TABLE IF EXISTS `artiste_has_article`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artiste_has_article` (
  `artiste_id` int NOT NULL,
  `article_id` int NOT NULL,
  PRIMARY KEY (`artiste_id`,`article_id`),
  KEY `fk_artiste_has_article_article1_idx` (`article_id`),
  KEY `fk_artiste_has_article_artiste1_idx` (`artiste_id`),
  CONSTRAINT `fk_artiste_has_article_article1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`),
  CONSTRAINT `fk_artiste_has_article_artiste1` FOREIGN KEY (`artiste_id`) REFERENCES `artiste` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artiste_has_article`
--

LOCK TABLES `artiste_has_article` WRITE;
/*!40000 ALTER TABLE `artiste_has_article` DISABLE KEYS */;
/*!40000 ALTER TABLE `artiste_has_article` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galerie_photo`
--

DROP TABLE IF EXISTS `galerie_photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galerie_photo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(255) NOT NULL,
  `utilisateur_id` int NOT NULL,
  PRIMARY KEY (`id`,`utilisateur_id`),
  KEY `fk_galerie_photo_utilisateur1_idx` (`utilisateur_id`),
  CONSTRAINT `fk_galerie_photo_utilisateur1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galerie_photo`
--

LOCK TABLES `galerie_photo` WRITE;
/*!40000 ALTER TABLE `galerie_photo` DISABLE KEYS */;
/*!40000 ALTER TABLE `galerie_photo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'Stuff'),(2,'Doodads');
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oeuvre`
--

DROP TABLE IF EXISTS `oeuvre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oeuvre` (
  `id` int NOT NULL AUTO_INCREMENT,
  `titre` varchar(150) DEFAULT NULL,
  `points` int DEFAULT NULL,
  `url_photo` varchar(255) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `nb_vu` int NOT NULL,
  `valide` tinyint NOT NULL,
  `quartier_id` int NOT NULL,
  `mark` tinyint DEFAULT NULL,
  `decouverte` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`,`quartier_id`),
  KEY `fk_Oeuvre_quartier1_idx` (`quartier_id`),
  CONSTRAINT `fk_Oeuvre_quartier1` FOREIGN KEY (`quartier_id`) REFERENCES `quartier` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oeuvre`
--

LOCK TABLES `oeuvre` WRITE;
/*!40000 ALTER TABLE `oeuvre` DISABLE KEYS */;
INSERT INTO `oeuvre` VALUES (11,NULL,10,'11.jpg',44.84962940074958,-0.5608069651355938,0,1,2,0,0),(12,NULL,35,'12.jpg',44.86414297665333,-0.5500707511751429,0,1,3,1,0),(13,NULL,10,'13.jpg',44.8068854578942,-0.6232769914559688,0,1,4,0,0),(14,NULL,45,'14.jpg',44.81620173806237,-0.5965962395082577,0,1,5,0,0),(15,NULL,25,'15.jpg',44.810210005863496,-0.5432323884474753,0,1,6,0,0),(16,NULL,20,'16.jpg',44.79466786574708,-0.6182431150180463,0,1,7,0,0),(17,NULL,10,'17.jpg',44.85303197992082,-0.5723105393951187,0,1,8,0,0),(18,NULL,15,'18.jpg',44.835699,-0.570443,0,1,9,0,0),(19,NULL,10,'19.jpg',44.80244172430585,-0.5578321664957506,0,1,10,0,1),(20,NULL,30,'20.jpg',44.82894086330347,-0.603291789936389,0,1,5,0,0),(21,NULL,50,'21.jpg',44.82656547827471,-0.5653309995596228,0,1,11,1,1);
/*!40000 ALTER TABLE `oeuvre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oeuvre_has_artiste`
--

DROP TABLE IF EXISTS `oeuvre_has_artiste`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oeuvre_has_artiste` (
  `oeuvre_id` int NOT NULL,
  `artiste_id` int NOT NULL,
  PRIMARY KEY (`oeuvre_id`,`artiste_id`),
  KEY `fk_oeuvre_has_artiste_artiste1_idx` (`artiste_id`),
  KEY `fk_oeuvre_has_artiste_oeuvre1_idx` (`oeuvre_id`),
  CONSTRAINT `fk_oeuvre_has_artiste_artiste1` FOREIGN KEY (`artiste_id`) REFERENCES `artiste` (`id`),
  CONSTRAINT `fk_oeuvre_has_artiste_oeuvre1` FOREIGN KEY (`oeuvre_id`) REFERENCES `oeuvre` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oeuvre_has_artiste`
--

LOCK TABLES `oeuvre_has_artiste` WRITE;
/*!40000 ALTER TABLE `oeuvre_has_artiste` DISABLE KEYS */;
/*!40000 ALTER TABLE `oeuvre_has_artiste` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `privilege`
--

DROP TABLE IF EXISTS `privilege`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `privilege` (
  `id` int NOT NULL AUTO_INCREMENT,
  `privilege_statut` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `privilege`
--

LOCK TABLES `privilege` WRITE;
/*!40000 ALTER TABLE `privilege` DISABLE KEYS */;
INSERT INTO `privilege` VALUES (1,'User'),(2,'Admin');
/*!40000 ALTER TABLE `privilege` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quartier`
--

DROP TABLE IF EXISTS `quartier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quartier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `ville_id` int NOT NULL,
  `polygon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`,`ville_id`),
  KEY `fk_quartier_ville1_idx` (`ville_id`),
  CONSTRAINT `fk_quartier_ville1` FOREIGN KEY (`ville_id`) REFERENCES `ville` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quartier`
--

LOCK TABLES `quartier` WRITE;
/*!40000 ALTER TABLE `quartier` DISABLE KEYS */;
INSERT INTO `quartier` VALUES (2,'Bastide Niel',44.84561144422572,-0.5578021332009533,1,NULL),(3,'Bacalan',44.872763736236465,-0.548930291154818,1,NULL),(4,'Le Burck',44.81501290413744,-0.6397140848018117,1,NULL),(5,'Saint Augustin',44.827263932469066,-0.6074846300039526,1,NULL),(6,'Le prèche',44.812508973555936,-0.5467813333074922,1,NULL),(7,'Montaigne',44.79600314025957,-0.6168865368936665,1,NULL),(8,'Chartrons',44.858264173482326,-0.5670218539579241,1,NULL),(9,'Victor Hugo',44.840508475087574,-0.5719463981394894,1,NULL),(10,'Bègles',44.812036167446735,-0.5441236702691535,1,NULL),(11,'Nansouty',44.81939885602836,-0.5708871922829272,1,NULL),(12,'Le Mans',48.01243,0.18659,1,NULL);
/*!40000 ALTER TABLE `quartier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pseudo` varchar(50) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `mdp` varchar(150) NOT NULL,
  `forget_mdp` varchar(255) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `score` int NOT NULL,
  `privilege_id` int NOT NULL,
  PRIMARY KEY (`id`,`privilege_id`),
  KEY `fk_utilisateur_privilege_idx` (`privilege_id`),
  CONSTRAINT `fk_utilisateur_privilege` FOREIGN KEY (`privilege_id`) REFERENCES `privilege` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur`
--

LOCK TABLES `utilisateur` WRITE;
/*!40000 ALTER TABLE `utilisateur` DISABLE KEYS */;
INSERT INTO `utilisateur` VALUES (1,'booba','kaaris','jean loic','jl123',NULL,'jl@gmail.com','bidon',0,1),(2,'bob l\'éponge','bob','brice','br123',NULL,'br@gmail.com','bidon1',0,2);
/*!40000 ALTER TABLE `utilisateur` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateur_has_oeuvre`
--

DROP TABLE IF EXISTS `utilisateur_has_oeuvre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateur_has_oeuvre` (
  `utilisateur_id` int NOT NULL,
  `oeuvre_id` int NOT NULL,
  `mark` tinyint NOT NULL,
  `decouverte` tinyint NOT NULL,
  PRIMARY KEY (`utilisateur_id`,`oeuvre_id`),
  KEY `fk_utilisateur_has_Oeuvre_Oeuvre1_idx` (`oeuvre_id`),
  KEY `fk_utilisateur_has_Oeuvre_utilisateur1_idx` (`utilisateur_id`),
  CONSTRAINT `fk_utilisateur_has_Oeuvre_Oeuvre1` FOREIGN KEY (`oeuvre_id`) REFERENCES `oeuvre` (`id`),
  CONSTRAINT `fk_utilisateur_has_Oeuvre_utilisateur1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateur` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateur_has_oeuvre`
--

LOCK TABLES `utilisateur_has_oeuvre` WRITE;
/*!40000 ALTER TABLE `utilisateur_has_oeuvre` DISABLE KEYS */;
INSERT INTO `utilisateur_has_oeuvre` VALUES (1,11,1,0),(2,11,0,1),(2,12,1,0),(2,13,0,0),(2,14,0,0),(2,15,1,0),(2,16,1,0),(2,17,0,0),(2,18,0,0),(2,19,0,1),(2,20,0,0),(2,21,0,0);
/*!40000 ALTER TABLE `utilisateur_has_oeuvre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ville`
--

DROP TABLE IF EXISTS `ville`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ville` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(150) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ville`
--

LOCK TABLES `ville` WRITE;
/*!40000 ALTER TABLE `ville` DISABLE KEYS */;
INSERT INTO `ville` VALUES (1,'BORDEAUX',44.83862654144651,-0.5825808773447223);
/*!40000 ALTER TABLE `ville` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-04 10:04:41