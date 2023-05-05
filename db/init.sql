CREATE DATABASE  IF NOT EXISTS `contact_db` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `contact_db`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: contact_db
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `city` (
  `city_id` int NOT NULL AUTO_INCREMENT,
  `city_name` varchar(45) NOT NULL,
  `state_id` int DEFAULT NULL,
  PRIMARY KEY (`city_id`),
  KEY `state_id_idx` (`state_id`),
  CONSTRAINT `state_id` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=145 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Athens',1),(2,'Thessaloniki',3),(3,'Patras',12),(4,'Piraeus',1),(5,'Larissa',11),(6,'Heraklion',4),(7,'Peristeri',1),(8,'Kallithea',1),(9,'Acharnes',1),(10,'Kalamaria',3),(11,'Nikaia',1),(12,'Glyfada',1),(13,'Volos',11),(14,'Ilio',1),(15,'Ilioupoli',1),(16,'Keratsini',1),(17,'Evosmos',3),(18,'Chalandri',1),(19,'Nea Smyrni',1),(20,'Marousi',1),(21,'Agios Dimitrios',1),(22,'Zografou',1),(23,'Egaleo',1),(24,'Nea Ionia',1),(25,'Ioannina',6),(26,'Palaio Faliro',1),(27,'Korydallos',1),(28,'Trikala',11),(29,'Vyronas',1),(30,'Agia Paraskevi',1),(31,'Galatsi',1),(32,'Agrinio',12),(33,'Chalcis',2),(34,'Petroupoli',1),(35,'Serres',3),(36,'Alexandroupoli',5),(37,'Xanthi',5),(38,'Katerini',3),(39,'Kalamata',9),(40,'Kavala',5),(41,'Chania',4),(42,'Lamia',2),(43,'Komotini',5),(44,'Irakleio',1),(45,'Rhodes',10),(46,'Kifissia',1),(47,'Stavroupoli',3),(48,'Chaidari',1),(49,'Drama',5),(50,'Veria',3),(51,'Alimos',1),(52,'Kozani',13),(53,'Polichni',3),(54,'Karditsa',11),(55,'Sykies',3),(56,'Ampelokipoi',3),(57,'Pylaia',3),(58,'Agioi Anargyroi',1),(59,'Argyroupoli',1),(60,'Ano Liosia',1),(61,'Nea Ionia',11),(62,'Rethymno',4),(63,'Ptomlemaida',13),(64,'Tripoli',9),(65,'Cholargos',1),(66,'Vrilissia',1),(67,'Aspropyrgos',1),(68,'Corinth',9),(69,'Gerakas',1),(70,'Metamorfosi',1),(71,'Giannitsa',3),(72,'Voula',1),(73,'Kamatero',1),(74,'Mytilene',8),(75,'Neapoli',3),(76,'Eleftherio-Kordelio',3),(77,'Chios',8),(78,'Agia Varvara',1),(79,'Kaisariani',1),(80,'Nea Filadelfia',1),(81,'Moschato',1),(82,'Perama',1),(83,'Salamina',1),(84,'Eleusis',1),(85,'Corfu',7),(86,'Pyrgos',12),(87,'Megara',1),(88,'Kilkis',3),(89,'Dafni',1),(90,'Thebes',2),(91,'Melissia',1),(92,'Argos',9),(93,'Arta',6),(94,'Artemida',1),(95,'Livadeia',2),(96,'Pefki',1),(97,'Oraikastro',3),(98,'Aigio',12),(99,'Kos',10),(100,'Koropi',1),(101,'Preveza',6),(102,'Naousa',3),(103,'Orestiada',5),(104,'Peraia',3),(105,'Edessa',3),(106,'Florina',13),(107,'Panorama',3),(108,'Nea Erythraia',1),(109,'Elliniko',1),(110,'Amaliada',12),(111,'Pallini',1),(112,'Sparta',9),(113,'Agios Ioannis Rentis',1),(114,'Thermi',3),(115,'Vari',1),(116,'Nea Makri',1),(117,'Tavros',1),(118,'Alexandreia',3),(119,'Menemeni',3),(120,'Paiania',1),(121,'Kalyvia Thorikou',1),(122,'Nafplio',9),(123,'Drapetsona',1),(124,'Efkarpia',3),(125,'Papagou',1),(126,'Nafpaktos',12),(127,'Kastoria',13),(128,'Grevena',13),(129,'Pefka',3),(130,'Nea Alikarnassos',4),(131,'Missolonghi',12),(132,'Gazi',4),(133,'Ierapetra',4),(134,'Kalymnos',10),(135,'Rafina',1),(136,'Loutraki',9),(137,'Agios Nikolaos',4),(138,'Ermoupoli',10),(139,'Ialysos',10),(140,'Mandra',1),(141,'Tyvarnos',11),(142,'Glyka Nera',1),(143,'Ymittos',1),(144,'Neo Psychiko',1);
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `contact_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `street_address` varchar(45) DEFAULT NULL,
  `zip_code` int DEFAULT NULL,
  `city_id` int DEFAULT NULL,
  `phone_number` varchar(11) NOT NULL,
  `email_address` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`contact_id`),
  KEY `city_id_idx` (`city_id`),
  CONSTRAINT `city_id` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
  CONSTRAINT `contacts_chk_1` CHECK ((`zip_code` between 10000 and 89999))
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (2,'Maria','Papadopoulou','Solonos 75',54644,2,'6987825687','mpapadopoulou@gmail.com'),(3,'Pedro','Gonzalez','Ermou 3',10563,1,'2108547595','pgonzalez99@email.com'),(4,'Michalis','Louloudopoulos','Nikiforou Theotoki 154',49100,85,'6953086207','louloudopoulos@hotmail.com'),(5,'Fernando','Fernandez','Lioufi 3',50100,52,'6946558874','ferfer@gmail.com'),(6,'Giorgos','Pavlidis','Leof. Nikis 21',54623,2,'2310458793','gpavlapavlidis@gmx.net'),(7,'Katerina','Oikonomou','Chelidonous 8',14561,46,'69447895634','koikonomou@gmail.com');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `state`
--

DROP TABLE IF EXISTS `state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `state` (
  `state_id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(45) NOT NULL,
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `state`
--

LOCK TABLES `state` WRITE;
/*!40000 ALTER TABLE `state` DISABLE KEYS */;
INSERT INTO `state` VALUES (1,'Attica'),(2,'Central Greece'),(3,'Central Macedonia'),(4,'Crete'),(5,'Eastern Macedonia and Thrace'),(6,'Epirus'),(7,'Ionian Islands'),(8,'North Aegean'),(9,'Peloponnese'),(10,'South Aegean'),(11,'Thessaly'),(12,'Western Greece'),(13,'Western Macedonia'),(14,'Monastic community of Mount Athos');
/*!40000 ALTER TABLE `state` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-05 12:57:02

CREATE VIEW full_contacts AS
SELECT contact_id,first_name,last_name,street_address,zip_code,city_name,state_name,phone_number,email_address FROM contacts 
JOIN city ON city.city_id=contacts.city_id
JOIN state ON state.state_id=city.state_id
ORDER BY contact_id;
