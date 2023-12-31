-- MySQL dump 10.13  Distrib 8.1.0, for Linux (x86_64)
--
-- Host: localhost    Database: anti_social_database
-- ------------------------------------------------------
-- Server version	8.1.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Friend`
--

DROP TABLE IF EXISTS `Friend`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Friend` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) DEFAULT NULL,
  `Friendname` varchar(255) DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `FK_Friend_User_Id` (`UserId`),
  CONSTRAINT `FK_Friend_User_Id` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Friend`
--

LOCK TABLES `Friend` WRITE;
/*!40000 ALTER TABLE `Friend` DISABLE KEYS */;
INSERT INTO `Friend` VALUES (42,'Emma','Bob',56),(43,'Liam','Bob',57),(44,'Liam','Cole',57),(45,'Oliver','Cole',58),(46,'Oliver','Emma',58),(47,'Luca','Liam',59),(48,'Luca','Oliver',59),(49,'Luca','Emma',59),(50,'Sophia','Oliver',60),(51,'Sophia','Charlotte',60),(52,'Sophia','Cole',60),(53,'Cole','Charlotte',47),(54,'Cole','Luca',47),(55,'Cole','Sophia',47),(56,'Cole','Oliver',47),(57,'Cole','Emma',47),(58,'Cole','Liam',47),(59,'Cole','Bob',47);
/*!40000 ALTER TABLE `Friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Movie`
--

DROP TABLE IF EXISTS `Movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Movie` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) DEFAULT NULL,
  `Runtime` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Movie`
--

LOCK TABLES `Movie` WRITE;
/*!40000 ALTER TABLE `Movie` DISABLE KEYS */;
INSERT INTO `Movie` VALUES (1,'The Shawshank Redemption',142),(2,'The Godfather: Part II',202),(3,'The Dark Knight',152),(4,'12 Angry Men',96),(5,'Schindler\'s List',195),(6,'Pulp Fiction',154),(7,'The Lord of the Rings: The Return of the King',201),(8,'Il buono, il brutto, il cattivo',161),(9,'Forrest Gump',142),(10,'The Lord of the Rings: The Fellowship of the Ring',178),(11,'Fight Club',139),(12,'Inception',148),(13,'Dag II',135),(14,'Dil Bechara',101),(15,'One Flew Over the Cuckoo\'s Nest',133),(16,'Star Wars: Episode V - The Empire Strikes Back',124),(17,'Goodfellas',146),(18,'The Matrix',136),(19,'The Lord of the Rings: The Two Towers',179),(20,'It\'s a Wonderful Life',130),(21,'Shichinin no samurai',207),(22,'Star Wars',121),(23,'The Silence of the Lambs',118),(24,'Se7en',127),(25,'La vita è bella',116),(26,'The Green Mile',189),(27,'Saving Private Ryan',169),(28,'Sen to Chihiro no kamikakushi',125),(29,'Cidade de Deus',130),(30,'Interstellar',169),(31,'Gisaengchung',132),(32,'City Lights',87),(33,'Modern Times',87),(34,'Casablanca',102),(35,'Psycho',109),(36,'C\'era una volta il West',165),(37,'Back to the Future',116),(38,'Hotaru no haka',89),(39,'Nuovo Cinema Paradiso',155),(40,'Terminator 2: Judgment Day',137),(41,'The Lion King',88),(42,'Léon',110),(43,'The Usual Suspects',106),(44,'American History X',119),(45,'Gladiator',155),(46,'The Pianist',150),(47,'The Departed',151),(48,'The Prestige',130),(49,'Intouchables',112),(50,'Whiplash',106),(51,'Joker',122),(52,'The Great Dictator',125),(53,'Sunset Blvd.',110),(54,'Rear Window',112),(55,'Paths of Glory',88),(56,'Witness for the Prosecution',116),(57,'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',95),(58,'Alien',117),(59,'Apocalypse Now',147),(60,'The Shining',146),(61,'Raiders of the Lost Ark',115),(62,'Once Upon a Time in America',229),(63,'Mononoke-hime',134),(64,'Memento',113),(65,'Oldeuboi',120),(66,'Das Leben der Anderen',137),(67,'WALL·E',98),(68,'Taare Zameen Par',165),(69,'3 Idiots',170),(70,'The Dark Knight Rises',164),(71,'Django Unchained',165),(72,'Coco',105),(73,'Avengers: Infinity War',149),(74,'Avengers: Endgame',181),(75,'Spider-Man: Into the Spider-Verse',117),(76,'Dangal',161),(77,'Kimi no na wa.',106),(78,'Capharnaüm',126),(79,'The Kid',68),(80,'Metropolis',153),(81,'M - Eine Stadt sucht einen Mörder',117),(82,'Citizen Kane',119),(83,'Double Indemnity',107),(84,'Ladri di biciclette',89),(85,'Ikiru',143),(86,'Singin\' in the Rain',103),(87,'Vertigo',128),(88,'North by Northwest',136),(89,'The Apartment',125),(90,'Lawrence of Arabia',228),(91,'Per qualche dollaro in più',132),(92,'2001: A Space Odyssey',149),(93,'A Clockwork Orange',136),(94,'The Sting',129),(95,'Taxi Driver',114),(96,'Das Boot',149),(97,'Star Wars: Episode VI - Return of the Jedi',131),(98,'Scarface',170),(99,'Amadeus',160);
/*!40000 ALTER TABLE `Movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TVShow`
--

DROP TABLE IF EXISTS `TVShow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TVShow` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) DEFAULT NULL,
  `Runtime` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TVShow`
--

LOCK TABLES `TVShow` WRITE;
/*!40000 ALTER TABLE `TVShow` DISABLE KEYS */;
INSERT INTO `TVShow` VALUES (1,'Game of Thrones',6669),(2,'The Mandalorian',2600),(3,'Friends',3146),(4,'The Sopranos',6435),(5,'The Wonder Years',1716),(6,'Seinfeld',2860),(7,'House of Cards',3978),(8,'Lost',4004),(9,'Westworld',6448),(10,'Stranger Things',5304),(11,'The X Files',15210),(12,'Chernobyl',936),(13,'Better Call Saul',5382),(14,'Narcos',1911),(15,'Family Guy',7150),(16,'Parks and Recreation',3432),(17,'The Simpsons',10010),(18,'The Wire',5369),(19,'Rome',2028),(20,'Rick and Morty',3289),(21,'Homeland',7150),(22,'Band of Brothers',910),(23,'Vikings',4576),(24,'The Boys',3900),(25,'The Good Place',1430),(26,'24',5720),(27,'Two and a Half Men',3718),(28,'X-Men',1794),(29,'Legion',2340),(30,'American Crime Story',4368),(31,'Dexter',11024),(32,'The Walking Dead',7436),(33,'Ted Lasso',1560),(34,'The Handmaid\'s Tale',5460),(35,'True Detective',4290),(36,'Brooklyn Nine-Nine',2860),(37,'Bob\'s Burgers',3718),(38,'The Umbrella Academy',3900),(39,'Mr. Robot',3185),(40,'Boardwalk Empire',3575),(41,'Star Trek: The Next Generation',4576),(42,'Scooby Doo, Where Are You!',572),(43,'Daredevil',2808),(44,'Prison Break',7436),(45,'House M.D.',5148),(46,'ER',9152),(47,'The Big Bang Theory',3718),(48,'South Park',7722),(49,'Fargo',6890),(50,'Snowpiercer',3120),(51,'Buffy the Vampire Slayer',4004),(52,'Beavis and Butt-Head',3705),(53,'Oz',5005),(54,'The Office',2574),(55,'Everybody Loves Raymond',2860),(56,'His Dark Materials',3900),(57,'The Pacific',780),(58,'Law & Order: Special Victims Unit',19500),(59,'Black Mirror',10140),(60,'American Dad!',5434),(61,'Deadwood',2145),(62,'That \'70s Show',2574),(63,'Mad Men',5499),(64,'The Flintstones',2366),(65,'American Horror Story',10140),(66,'Baywatch',10140),(67,'The Outsider',780),(68,'Heroes',2925),(69,'The Following',1677),(70,'Futurama',4290),(71,'Fleabag',1404),(72,'Penny Dreadful',2340),(73,'Agents of S.H.I.E.L.D.',4680),(74,'Spartacus: Blood and Sand',2860),(75,'Supernatural',9152),(76,'How I Met Your Mother',2860),(77,'The Strain',2236),(78,'\"Beverly Hills',90210),(79,'Gotham',3276),(80,'Altered Carbon',2340),(81,'La casa de papel',4550),(82,'MacGyver',4992),(83,'13 Reasons Why',3120),(84,'The Punisher',2067),(85,'The Gifted',1677),(86,'True Blood',5005),(87,'BoJack Horseman',2275),(88,'Modern Family',3432),(89,'The Queen\'s Gambit',871),(90,'Arrested Development',4862),(91,'Ozark',5460),(92,'Luke Cage',2145),(93,'Sons of Anarchy',4095),(94,'SpongeBob SquarePants',7475),(95,'Jessica Jones',3640),(96,'The Fresh Prince of Bel-Air',2002),(97,'Alias',3276),(98,'Tales from the Crypt',2600),(99,'Orange Is the New Black',5369),(100,'Breaking Bad',3822);
/*!40000 ALTER TABLE `TVShow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `AntiSocialScore` int DEFAULT '0',
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES (47,'Cole','1',23918),(54,'Bob','123',6249),(55,'Charlotte','123',14715),(56,'Emma','123',19162),(57,'Liam','123',6318),(58,'Oliver','123',20944),(59,'Luca','123',18635),(60,'Sophia','123',21794);
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserMovie`
--

DROP TABLE IF EXISTS `UserMovie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserMovie` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `MovieId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserId` (`UserId`),
  KEY `MovieId` (`MovieId`),
  CONSTRAINT `UserMovie_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`),
  CONSTRAINT `UserMovie_ibfk_2` FOREIGN KEY (`MovieId`) REFERENCES `Movie` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserMovie`
--

LOCK TABLES `UserMovie` WRITE;
/*!40000 ALTER TABLE `UserMovie` DISABLE KEYS */;
INSERT INTO `UserMovie` VALUES (64,54,2),(65,54,4),(66,55,55),(67,55,53),(68,55,51),(69,55,50),(70,55,57),(71,56,60),(72,56,58),(73,56,54),(74,56,79),(75,57,61),(76,57,59),(77,57,97),(78,58,39),(79,58,37),(80,58,35),(81,59,3),(82,59,7),(83,59,55),(84,60,3),(85,60,7),(86,60,28),(87,60,26),(88,47,1),(89,47,12),(90,47,11),(91,47,24),(92,47,22);
/*!40000 ALTER TABLE `UserMovie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserTVShow`
--

DROP TABLE IF EXISTS `UserTVShow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserTVShow` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `TVShowId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserId` (`UserId`),
  KEY `TVShowId` (`TVShowId`),
  CONSTRAINT `UserTVShow_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`),
  CONSTRAINT `UserTVShow_ibfk_2` FOREIGN KEY (`TVShowId`) REFERENCES `TVShow` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserTVShow`
--

LOCK TABLES `UserTVShow` WRITE;
/*!40000 ALTER TABLE `UserTVShow` DISABLE KEYS */;
INSERT INTO `UserTVShow` VALUES (33,54,2),(34,54,3),(35,55,8),(36,55,6),(37,55,4),(38,56,46),(39,56,43),(40,56,42),(41,56,34),(42,57,8),(43,57,5),(44,58,15),(45,58,17),(46,58,19),(47,59,53),(48,59,49),(49,59,73),(50,60,52),(51,60,49),(52,60,48),(53,47,9),(54,47,13),(55,47,18),(56,47,16);
/*!40000 ALTER TABLE `UserTVShow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserVideoGame`
--

DROP TABLE IF EXISTS `UserVideoGame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserVideoGame` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `UserId` int DEFAULT NULL,
  `VideoGameId` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserId` (`UserId`),
  KEY `VideoGameId` (`VideoGameId`),
  CONSTRAINT `UserVideoGame_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `User` (`Id`),
  CONSTRAINT `UserVideoGame_ibfk_2` FOREIGN KEY (`VideoGameId`) REFERENCES `VideoGame` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserVideoGame`
--

LOCK TABLES `UserVideoGame` WRITE;
/*!40000 ALTER TABLE `UserVideoGame` DISABLE KEYS */;
INSERT INTO `UserVideoGame` VALUES (31,54,12),(32,54,9),(33,55,12),(34,55,9),(35,55,2),(36,55,34),(37,56,12),(38,56,6),(39,56,34),(40,57,12),(41,57,9),(42,58,61),(43,58,58),(44,58,56),(45,59,98),(46,59,96),(47,59,93),(48,60,74),(49,60,72),(50,60,70),(51,47,855),(52,47,841),(53,47,832),(54,47,777),(55,47,775);
/*!40000 ALTER TABLE `UserVideoGame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `VideoGame`
--

DROP TABLE IF EXISTS `VideoGame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `VideoGame` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(255) DEFAULT NULL,
  `Playtime` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=1213 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `VideoGame`
--

LOCK TABLES `VideoGame` WRITE;
/*!40000 ALTER TABLE `VideoGame` DISABLE KEYS */;
INSERT INTO `VideoGame` VALUES (1,'Lumines: Puzzle Fusion',600),(2,'WarioWare Touched!',150),(5,'The Urbz: Sims in the City',1200),(6,'Ridge Racer',53),(7,'Metal Gear Ac!d',1276),(9,'Pokmon Dash',71),(10,'Dynasty Warriors',125),(12,'Ridge Racer DS',134),(13,'Darkstalkers Chronicle: The Chaos Tower',120),(14,'Ape Escape Academy',113),(15,'Polarium',360),(16,'Asphalt: Urban GT',744),(17,'Zoo Keeper',300),(18,'Mr. DRILLER: Drill Spirits',593),(19,'Sprung',1065),(21,'Puyo Pop Fever',120),(22,'Mario Kart DS',545),(23,'Nintendogs',1679),(24,'Brain Age: Train Your Brain in Minutes a Day!',60),(25,'Brain Agey: More Training in Minutes a Day!',900),(26,'Grand Theft Auto: Liberty City Stories',898),(27,'Animal Crossing: Wild World',4832),(28,'Big Brain Academy',428),(29,'Call of Duty 2',540),(30,'Midnight Club 3: DUB Edition',2880),(31,'Need for Speed: Most Wanted 5-1-0',620),(32,'Pokmon Mystery Dungeon: Blue Rescue Team',1537),(33,'Sonic Rush',373),(34,'Star Wars: Battlefront II',540),(35,'SOCOM: U.S. Navy SEALs - Fireteam Bravo',515),(39,'Mario & Luigi: Partners in Time',1119),(41,'Need for Speed Underground: Rivals',1228),(43,'Perfect Dark Zero',480),(44,'Super Monkey Ball: Touch & Roll',34),(45,'Super Princess Peach',557),(48,'Clubhouse Games',1200),(50,'Untold Legends: Brotherhood of the Blade',1260),(51,'Tony Hawk\'s Underground 2: Remix',1407),(52,'The Sims 2',2095),(53,'WipEout Pure',528),(54,'NBA Live 06',240),(55,'WWE Smackdown vs. Raw 2006',565),(56,'Dead or Alive 4',360),(57,'Phoenix Wright: Ace Attorney',1143),(58,'Spider-Man 2',600),(60,'Kirby: Canvas Curse',340),(61,'Battlefield 2: Modern Combat',416),(62,'Yoshi Touch & Go',270),(64,'Condemned: Criminal Origins',453),(65,'Peter Jackson\'s King Kong: The Official Game of...',420),(66,'Castlevania: Dawn of Sorrow',780),(69,'Kameo: Elements of Power',612),(70,'Advance Wars: Dual Strike',1670),(71,'Trauma Center: Under the Knife',496),(72,'Coded Arms',360),(73,'NBA LIVE 06 ',240),(74,'Tony Hawk\'s American Wasteland',780),(75,'Star Wars: Episode III - Revenge of the Sith',300),(76,'Capcom Classics Collection Remixed',2140),(77,'Madagascar',360),(78,'X-Men: Legends II - Rise of Apocalypse',1320),(79,'Quake 4',507),(80,'Pokmon Trozei!',176),(81,'Need for Speed: Most Wanted',720),(82,'Mega Man Maverick Hunter X',341),(83,'Metroid Prime Pinball',300),(84,'NBA 06',240),(85,'GUN ',480),(86,'NBA 2K6 ',32),(89,'Tony Hawk\'s American Sk8land',1200),(93,'SSX on Tour',930),(95,'Death Jr.',212),(96,'Harry Potter and the Goblet of Fire',529),(97,'MediEvil Resurrection',583),(98,'The Chronicles of Narnia: The Lion, the Witch a...',160),(99,'Shrek SuperSlam',90),(102,'Burnout Legends',720),(103,'Meteos',846),(104,'Spyro: Shadow Legacy',270),(106,'Infected',400),(107,'Pursuit Force',600),(108,'Kingdom of Paradise',1380),(109,'Dragon Ball Z: Supersonic Warriors 2',882),(110,'Dragon Quest Heroes: Rocket Slime',802),(111,'Dead to Rights: Reckoning',175),(112,'Amped 3',540),(114,'Lunar: Dragon Song',1480),(115,'Madden NFL 06',225),(119,'Metal Gear Ac!d 2',900),(122,'GoldenEye: Rogue Agent',510),(123,'Need for Speed Underground 2',1200),(125,'The Lord of the Rings: Tactics',300),(126,'Rengoku: The Tower of Purgatory',283),(128,'Ridge Racer 6',480),(129,'Ford Racing 3',481),(130,'NHL 2K6 ',150),(132,'Battles of Prince of Persia',480),(134,'Marvel Nemesis: Rise of the Imperfects ',275),(135,'Scooby-Doo! Unmasked',480),(136,'Viewtiful Joe: Double Trouble!',300),(137,'The Legend of Heroes: A Tear of Vermillion',1790),(139,'Lost in Blue',1500),(143,'Mega Man Battle Network 5: Double Team DS',2100),(144,'Nanostray',72),(146,'Teenage Mutant Ninja Turtles 3: Mutant Nightmare',270),(147,'Pac-Man World 3',480),(148,'Tokobot',521),(149,'Fullmetal Alchemist: Dual Sympathy',840),(150,'Exit',360),(152,'The Rub Rabbits!',140),(153,'Electroplankton',30),(154,'LifeSigns: Surgical Unit',1831),(156,'Wii Play',240),(157,'New Super Mario Bros.',540),(158,'Pokmon Diamond',3480),(159,'Pokmon Pearl',3480),(160,'Gears of War',566),(161,'The Legend of Zelda: Twilight Princess',2580),(162,'Cooking Mama',420),(164,'Daxter',480),(167,'Grand Theft Auto: Vice City Stories',1034),(168,'Resistance: Fall of Man',720),(169,'MotorStorm',900),(171,'Yoshi\'s Island DS',575),(172,'Tom Clancy\'s Ghost Recon: Advanced Warfighter',525),(174,'Pokmon Ranger',805),(176,'Saints Row',1200),(178,'Dead Rising',900),(181,'Mario Hoops 3 on 3',255),(183,'Super Monkey Ball: Banana Blitz',324),(186,'WarioWare: Smooth Moves',180),(188,'Final Fantasy III',2640),(192,'Kirby: Squeak Squad',300),(193,'Pokmon Battle Revolution',925),(194,'Medal of Honor: Heroes',300),(195,'Tekken: Dark Resurrection',1830),(197,'Mario vs. Donkey Kong 2: March of the Minis',285),(198,'Sonic Rivals',390),(200,'Mortal Kombat: Unchained',262),(202,'Tetris DS',1650),(204,'Red Steel',495),(205,'Metroid Prime: Hunters',524),(206,'LEGO Star Wars II: The Original Trilogy',900),(207,'NBA 2K7 ',491),(209,'Call of Duty 3',507),(212,'SpongeBob SquarePants: The Yellow Avenger',711),(214,'Fight Night Round 3',660),(216,'Need for Speed: Carbon',816),(219,'Viva Pi$?ata',2370),(220,'SpongeBob Squarepants: Creature from the Krusty Krab',410),(224,'Excite Truck',840),(225,'Harvest Moon DS',3308),(226,'Star Fox Command',180),(227,'Metal Gear Solid: Portable Ops',725),(234,'WWE SmackDown vs. Raw 2007',547),(235,'Rune Factory: A Fantasy Harvest Moon',4025),(237,'Marvel Ultimate Alliance',840),(239,'Ace Combat X: Skies of Deception',247),(240,'Killzone: Liberation',480),(242,'NBA 2K7',491),(243,'Tony Hawk\'s Project 8',1020),(245,'Castlevania: Portrait of Ruin',720),(246,'Hitman: Blood Money',780),(247,'Rockstar Games presents Table Tennis',360),(248,'Trauma Center: Second Opinion',540),(249,'Tenchu Z',1275),(250,'Elite Beat Agents',270),(251,'Street Fighter Alpha 3 MAX',180),(252,'Blue Dragon',3103),(253,'The Lord of the Rings: The Battle for Middle Ea...',995),(254,'Prey',480),(255,'Over the Hedge',356),(258,'NHL 07 ',540),(259,'Monster Hunter Freedom',6066),(260,'Chromehounds',960),(262,'Dragon Ball Z: Budokai Tenkaichi 2',876),(263,'Dragon Quest Monsters: Joker',2259),(264,'Pirates of the Caribbean: Dead Man\'s Chest',150),(266,'Syphon Filter: Dark Mirror',437),(268,'Ridge Racer 7',750),(269,'The Outfit',472),(270,'Elebits',540),(274,'Thrillville',494),(275,'The Godfather: The Game',1200),(276,'Rampage: Total Destruction',300),(278,'Far Cry: Instincts - Predator',1075),(279,'Full Auto',300),(280,'Age of Empires: The Age of Kings',3000),(281,'Need for Speed: Carbon - Own the City',1082),(282,'Brothers in Arms: D-Day',480),(283,'Family Guy Video Game!',353),(284,'Superman Returns',1320),(287,'Mystery Dungeon: Shiren the Wanderer',1980),(288,'Phoenix Wright: Ace Attorney - Justice for All',1098),(290,'Valhalla Knights',6000),(291,'Genji: Days of the Blade',720),(292,'Top Spin 2',600),(293,'Field Commander',833),(294,'Children of Mana',1327),(295,'Valkyrie Profile: Lenneth',2063),(296,'Monster House',400),(298,'NHL 07',540),(300,'Full Auto 2: Battlelines',575),(301,'Blitz: The League',900),(302,'Star Trek Legacy',540),(304,'Master of Illusion',246),(305,'Mega Man ZX',658),(309,'Untold Legends: Dark Kingdom',1500),(310,'Happy Feet',40),(312,'Dungeon Siege: Throne of Agony',1010),(313,'LocoRoco',360),(314,'Dead or Alive: Xtreme 2',60),(315,'Fuzion Frenzy 2',225),(317,'Lumines II',870),(318,'Major League Baseball 2K6',480),(319,'Star Wars: Lethal Alliance',300),(322,'Metal Slug Anthology',420),(325,'Avatar: The Last Airbender',300),(326,'Lemmings',1248),(327,'Mega Man Powered Up',345),(328,'College Hoops 2K6',94),(329,'Dynasty Warriors 5: Empires',1367),(330,'Magical Starsign',1727),(331,'Resident Evil: Deadly Silence',370),(332,'X-Men: The Official Game',724),(334,'Cabela\'s Alaskan Adventures',1200),(336,'Eragon',480),(337,'LostMagic',720),(338,'Magnetica',596),(339,'Def Jam Fight for NY: The Takeover',309),(341,'The Ant Bully',214),(342,'Just Cause',600),(343,'Onechanbara: Bikini Samurai Squad',470),(344,'Phantasy Star Universe',1736),(345,'Project Sylpheed: Arc of Deception',290),(346,'Winning Eleven: Pro Evolution Soccer 2007',2220),(348,'Digimon World DS',1927),(349,'Justice League Heroes',300),(350,'Innocent Life: A Futuristic Harvest Moon',2024),(351,'Power Stone Collection',502),(353,'Open Season',225),(354,'Samurai Warriors 2',2850),(356,'Import Tuner Challenge',2340),(357,'Contact',875),(358,'Touch Detective',368),(359,'FIFA Street 2',1200),(360,'007: From Russia with Love',390),(361,'PaRappa the Rapper',85),(362,'Riviera: The Promised Land',1456),(363,'Samurai Warriors: State of War',630),(364,'Viewtiful Joe: Red Hot Rumble',594),(365,'Ice Age 2: The Meltdown',510),(366,'Rumble Roses XX',7560),(368,'Deep Labyrinth',814),(369,'Blade Dancer: Lineage of Light',1770),(370,'Every Extend Extra',720),(371,'Ultimate Ghosts \'N\' Goblins',330),(372,'Xiaolin Showdown',360),(374,'Bullet Witch',450),(376,'Alex Rider: Stormbreaker',390),(377,'Cartoon Network Racing',892),(378,'Guilty Gear: Dust Strikers',19),(379,'Gunpey DS',480),(380,'Lara Croft Tomb Raider: Legend',480),(381,'Worms: Open Warfare',547),(384,'Snoopy vs. the Red Baron',360),(386,'Ys VI: The Ark of Napishtim',820),(387,'Bomberman Land Touch!',900),(388,'Point Blank DS',9),(389,'Scurge: Hive',589),(391,'Tao\'s Adventure: Curse of the Demon Seal',2700),(393,'Gitaroo Man Lives!',113),(394,'Gradius Collection',607),(395,'The Legend of Heroes II: Prophecy of the Moonli...',1368),(396,'Pac-Man World Rally',165),(398,'Earth Defense Force 2017',660),(399,'WarTech: Senko no Ronde',70),(400,'MechAssault: Phantom War',420),(401,'Astonishia Story',1149),(406,'MotoGP',450),(407,'OutRun 2006: Coast 2 Coast',240),(409,'SBK: Snowboard Kids',379),(410,'Tenchu: Dark Secret',426),(412,'Metal Gear Solid: Digital Graphic Novel',182),(415,'Platypus',75),(416,'Custom Robo Arena',1237),(417,'Gurumin: A Monstrous Adventure',630),(419,'Wii Fit',240),(420,'Halo 3',545),(422,'Super Mario Galaxy',1200),(423,'Mario Party DS',412),(424,'Mario Party 8',300),(426,'Link\'s Crossbow Training',120),(427,'Guitar Hero III: Legends of Rock',530),(433,'Forza Motorsport 2',3493),(435,'Guitar Hero II',570),(437,'The Legend of Zelda: Phantom Hourglass',1164),(438,'Pokmon Mystery Dungeon: Explorers of Darkness',1434),(439,'Pokmon Mystery Dungeon: Explorers of Time',1434),(440,'Assassin\'s Creed',1020),(441,'Uncharted: Drake\'s Fortune',540),(442,'Mass Effect',1500),(443,'Cooking Mama 2: Dinner with Friends',311),(445,'Super Paper Mario',1186),(446,'Game Party',120),(447,'Ratchet & Clank: Size Matters',427),(448,'Dance Dance Revolution Hottest Party',480),(449,'Cooking Mama: Cook Off',204),(450,'Gran Turismo 5: Prologue',660),(451,'Professor Layton and the Curious Village',833),(452,'Resident Evil 4',1050),(453,'The Elder Scrolls IV: Oblivion',4800),(456,'Diddy Kong Racing DS',750),(457,'Big Brain Academy: Wii Degree',1200),(459,'Deal or No Deal',7),(461,'Sonic and the Secret Rings',556),(462,'The Orange Box',1740),(463,'Crackdown',740),(468,'Call of Duty 4: Modern Warfare',420),(469,'MySims',437),(470,'Mario Strikers Charged',720),(471,'Star Wars Battlefront: Renegade Squadron',163),(472,'Flash Focus: Vision Training in Minutes a Day',360),(473,'Metroid Prime 3: Corruption',933),(476,'Ratchet & Clank Future: Tools of Destruction',840),(477,'LEGO Star Wars: The Complete Saga',1200),(478,'Rayman Raving Rabbids 2',300),(479,'NBA 2K8 ',240),(480,'Namco Museum DS',600),(483,'Drawn to Life',840),(486,'Resident Evil: The Umbrella Chronicles',540),(488,'Spectrobes',1324),(491,'Madden NFL 08',1020),(494,'Ace Combat 6: Fires of Liberation',825),(495,'Heavenly Sword',420),(496,'Ninja Gaiden Sigma',872),(499,'CrossworDS',1032),(500,'Sonic Rush Adventure',540),(503,'Call of Duty: Roads to Victory',375),(505,'NBA 2K8',240),(508,'Tom Clancy\'s Rainbow Six: Vegas',540),(509,'Need for Speed: ProStreet',720),(511,'Dance Dance Revolution Universe 2',480),(513,'Final Fantasy IV',2123),(518,'Tiger Woods PGA Tour 07',600),(520,'Sonic Rivals 2',1320),(522,'Medal of Honor: Airborne',360),(525,'Lost Odyssey',3923),(528,'Final Fantasy Tactics',3000),(529,'Endless Ocean',658),(532,'The Sims 2: Pets',1662),(533,'Two Worlds',1655),(536,'Mega Man Star Force: Dragon',1200),(537,'Sonic the Hedgehog',188),(544,'Jam Sessions',15),(545,'Monster Hunter Freedom 2',4080),(546,'Shadowrun',1620),(550,'The World Ends With You',1800),(552,'NCAA Football 08',720),(553,'Final Fantasy Tactics A2: Grimoire of the Rift',4500),(556,'Tom Clancy\'s Ghost Recon: Advanced Warfighter 2...',525),(557,'Final Fantasy',1200),(558,'Lair',600),(560,'Command & Conquer 3: Tiberium Wars',1500),(561,'Overlord',1200),(562,'Diner Dash',300),(563,'Medal of Honor: Heroes 2',300),(565,'Time Crisis 4',60),(566,'Dragon Ball Z: Budokai Tenkaichi 3',900),(567,'Final Fantasy XII: Revenant Wings',1859),(572,'Transformers: The Game',330),(574,'SSX Blur',600),(575,'Bleach: The Blade of Fate',540),(577,'Final Fantasy II',1680),(581,'NiGHTS: Journey of Dreams',397),(584,'Kane & Lynch: Dead Men',360),(585,'Crash of the Titans',480),(587,'SimCity DS',180),(588,'Wario: Master of Disguise',570),(589,'No More Heroes',780),(597,'Contra 4',187),(598,'Phoenix Wright: Ace Attorney - Trials and Tribu...',1262),(600,'Dragon Ball Z: Shin Budokai - Another Road',501),(601,'Spider-Man 3',619),(604,'Chicken Shoot',37),(606,'DK: Jungle Climber',360),(607,'Dragon Quest IV: Chapters of the Chosen',1800),(608,'300: March to Glory',444),(609,'Fire Emblem: Radiant Dawn',2870),(616,'The Warriors',627),(617,'Ghost Rider',289),(621,'The Simpsons Game',60),(622,'Syphon Filter: Logan\'s Shadow',600),(625,'Trauma Center: New Blood',754),(626,'Hotel Dusk: Room 215',900),(627,'Mega Man ZX Advent',656),(628,'Silent Hill: 0rigins',360),(630,'NHL 08 ',1050),(631,'Castlevania: The Dracula X Chronicles',450),(632,'Tony Hawk\'s Proving Ground',488),(633,'Jeanne d\'Arc',2221),(634,'BWii: Battalion Wars 2',583),(635,'Battlestations: Midway',523),(637,'Touch the Dead',279),(638,'The Darkness',600),(641,'Armored Core 4',1200),(642,'Etrian Odyssey',3243),(643,'Ben 10: Protector of the Earth',273),(644,'Tom Clancy\'s Splinter Cell: Double Agent',660),(646,'Zack & Wiki: Quest for Barbaros\' Treasure',900),(648,'Virtua Fighter 5',90),(649,'Lunar Knights',915),(650,'Enchanted Arms',2400),(651,'F.E.A.R.: First Encounter Assault Recon',540),(652,'Folklore',999),(654,'The Elder Scrolls IV: Shivering Isles',948),(655,'NHL 08',1050),(658,'Viva Pi$?ata: Party Animals',533),(659,'Warriors Orochi',900),(660,'Luminous Arc',1459),(661,'Picross DS',3041),(665,'Stuntman: Ignition',380),(666,'Mortal Kombat: Armageddon',500),(667,'Def Jam: Icon',480),(668,'Soulcalibur Legends',555),(670,'Planet Puzzle League',19),(671,'DiRT',780),(672,'TMNT',300),(675,'Disney Pirates of the Caribbean: At World\'s End',420),(676,'Bee Movie Game',338),(677,'Dynasty Warriors: Gundam',3048),(678,'Golden Axe',60),(679,'Dementium: The Ward',240),(680,'Rondo of Swords',1062),(681,'Disgaea: Afternoon of Darkness',3576),(683,'Dragon Quest Swords: The Masked Queen and the T...',558),(684,'Call of Juarez',492),(687,'Kingdom Under Fire: Circle of Doom',3300),(689,'All-Pro Football 2K8',720),(694,'Conan',360),(695,'Spider-Man: Friend or Foe',540),(700,'Rayman Raving Rabbids',371),(703,'Beowulf: The Game',485),(705,'Scarface: The World is Yours',1384),(708,'NBA Street Homecourt',463),(709,'Geometry Wars: Galaxies',1110),(710,'Final Fantasy: Crystal Chronicles - Echoes of Time',1102),(713,'WWE SmackDown vs. Raw 2008',786),(714,'The BIGS',608),(715,'Brave Story: New Traveler',1515),(716,'WipEout Pulse',540),(717,'TimeShift',535),(719,'Beautiful Katamari',360),(720,'Hour of Victory',369),(724,'Draglade',244),(725,'Final Fantasy Fables: Chocobo Tales',735),(728,'The Golden Compass',420),(729,'Harry Potter and the Order of the Phoenix',735),(733,'InuYasha: Secret of the Divine Jewel',574),(734,'The Settlers',290),(735,'Shrek the Third',285),(736,'Ratatouille',750),(737,'Soldier of Fortune: Payback',195),(744,'Blazing Angels 2: Secret Missions of WWII',750),(745,'Cake Mania',352),(747,'Touch Detective 2 1/2',398),(748,'7 Wonders of the Ancient World',291),(750,'Crush',396),(752,'The Sims 2: Castaway',480),(753,'Test Drive Unlimited',2310),(754,'Thrillville: Off the Rails',578),(756,'Bladestorm: The Hundred Years\' War',3075),(757,'Looney Tunes: Acme Arsenal',189),(760,'Indianapolis 500 Legends',870),(763,'BlackSite: Area 51',348),(764,'Code Lyoko: Quest for Infinity',348),(766,'FlatOut: Ultimate Carnage',1380),(767,'Zoids Assault',723),(768,'Alien Syndrome',180),(770,'Heroes of Mana',1621),(771,'Myst',423),(772,'Coded Arms: Contagion',600),(774,'F.E.A.R. Files',600),(775,'Ontamarama',60),(776,'Retro Game Challenge',620),(777,'Ultimate Mortal Kombat 3',120),(779,'Juiced 2: Hot Import Nights',936),(780,'Pursuit Force: Extreme Justice',480),(781,'Medal of Honor: Vanguard',218),(784,'Worms: Open Warfare 2',547),(785,'Surf\'s Up',77),(787,'Brothers in Arms DS',300),(789,'Fantastic Four: Rise of the Silver Surfer',385),(790,'Zendoku',240),(791,'Heatseeker',585),(792,'Manhunt 2',570),(796,'Escape from Bug Island',397),(798,'Cabela\'s Big Game Hunter',240),(802,'Guilty Gear XX ? Core',120),(804,'Code Lyoko',420),(806,'Orcs & Elves',300),(808,'Dead Head Fred',594),(809,'Hot Pixel',43),(810,'The Legend of Heroes III: Song of the Ocean',3000),(811,'SEGA Rally Revo',2040),(812,'Bionicle Heroes',773),(813,'Burnout Dominator',1102),(814,'Samurai Warriors 2: Empires',750),(816,'Turn It Around',60),(818,'Dragoneer\'s Aria',2258),(820,'R-Type Command',1914),(822,'Virtua Tennis 3',930),(823,'Front Mission',1218),(825,'Nervous Brickdown',480),(826,'Sea Monsters: A Prehistoric Adventure',300),(829,'Puzzle Quest: Challenge of the Warlords',2400),(832,'Driver: Parallel Lines',690),(833,'Mario Kart Wii',547),(835,'Super Smash Bros.: Brawl',900),(837,'Grand Theft Auto IV',1920),(838,'Gears of War 2',600),(839,'Pokmon: Platinum Version',2580),(840,'Metal Gear Solid 4: Guns of the Patriots',1134),(841,'Fable II',1200),(844,'LittleBigPlanet',600),(847,'Left 4 Dead',420),(849,'Guitar Hero: On Tour',1440),(854,'Animal Crossing: City Folk',3900),(855,'Mario & Sonic at the Olympic Games',540),(859,'Kirby Super Star Ultra',518),(861,'God of War: Chains of Olympus',340),(862,'Fallout 3',2700),(865,'Rock Band',480),(869,'Call of Duty: World at War',480),(873,'Resistance 2',600),(874,'Rock Band 2',750),(875,'Midnight Club: Los Angeles',1862),(878,'Guitar Hero: World Tour',517),(881,'Burnout Paradise',1200),(882,'Pokmon Ranger: Shadows of Almia',1500),(883,'Mortal Kombat vs. DC Universe',240),(884,'Dead Space',720),(886,'Star Wars: The Force Unleashed',330),(888,'SOCOM: U.S. Navy SEALs - Confrontation',600),(891,'Saints Row 2',1421),(892,'Guitar Hero: On Tour - Decades',655),(894,'Mystery Case Files: MillionHeir',430),(895,'Battlefield: Bad Company',420),(896,'Army of Two',405),(898,'The House of the Dead 2 & 3 Return',240),(900,'Boom Blox',420),(902,'Madden NFL 09',871),(905,'Tom Clancy\'s Rainbow Six: Vegas 2',540),(908,'Guitar Hero: Aerosmith',300),(909,'SoulCalibur IV',300),(910,'Valkyria Chronicles',2105),(911,'Harvest Moon: Tree of Tranquility',2310),(912,'Star Wars: The Clone Wars - Jedi Alliance',300),(914,'Wario Land: Shake It!',406),(919,'Devil May Cry 4',720),(922,'BioShock',810),(926,'Sonic Chronicles: The Dark Brotherhood',1200),(927,'Chrono Trigger',1500),(930,'The Legendary Starfy',594),(932,'Haze',415),(933,'Dissidia: Final Fantasy',3000),(936,'Prince of Persia',780),(937,'NHL 09 ',1200),(942,'De Blob',600),(943,'Sonic Riders: Zero Gravity',256),(944,'Rhythm Heaven',520),(946,'Advance Wars: Days of Ruin',1320),(947,'LEGO Batman: The Videogame',900),(948,'Far Cry 2',1380),(949,'Harvest Moon: Island of Happiness',2580),(950,'Brothers in Arms: Hell\'s Highway',486),(953,'Sonic Unleashed',780),(954,'Samba de Amigo',480),(955,'?kami',2490),(957,'MotorStorm: Pacific Rift',1950),(961,'Sid Meier\'s Civilization: Revolution',360),(962,'Pure',780),(963,'Turok',465),(966,'Frontlines: Fuel of War',330),(968,'Too Human',900),(970,'LEGO Indiana Jones: The Original Adventures',823),(971,'SEGA Bass Fishing',420),(975,'MLB 08: The Show',600),(978,'GRID',1388),(979,'NHL 09',1200),(980,'Banjo-Kazooie: Nuts & Bolts',1167),(982,'Rune Factory 2: A Fantasy Harvest Moon',4025),(984,'Patapon',1007),(988,'Lost Planet: Extreme Condition',540),(989,'Mirror\'s Edge',380),(993,'Speed Racer: The Videogame',743),(994,'Viva Pi$?ata: Pocket Paradise',1260),(995,'Tom Clancy\'s EndWar',585),(996,'Iron Man',300),(997,'Need for Speed: Undercover',672),(999,'Spectrobes: Beyond the Portals',1815),(1001,'Mercenaries 2: World in Flames',1216),(1002,'Infinite Undiscovery',1560),(1005,'Fire Emblem: Shadow Dragon',1311),(1007,'Tales of Vesperia',3412),(1010,'Apollo Justice: Ace Attorney',1196),(1011,'Castlevania: Order of Ecclesia',800),(1012,'Mega Man Star Force 2: Zerker X Ninja',1200),(1013,'Enemy Territory: Quake Wars',475),(1018,'Unreal Tournament III',751),(1021,'The Last Remnant',4500),(1022,'Dragon Ball Z: Burst Limit',360),(1024,'Turning Point: Fall of Liberty',300),(1025,'MX vs. ATV Untamed',720),(1026,'Crash: Mind over Mutant',333),(1030,'The Incredible Hulk',313),(1031,'Kung Fu Panda',300),(1032,'Dark Sector',514),(1033,'Tales of Symphonia: Dawn of the New World',2206),(1034,'Valkyrie Profile: Covenant of the Plume',1125),(1036,'TV Show King',1800),(1040,'AC/DC Live: Rock Band - Track Pack',236),(1041,'Harvest Moon: Magical Melody',1822),(1043,'Order Up!',360),(1045,'Age of Empires: Mythologies',996),(1046,'LocoRoco 2',438),(1047,'Star Ocean: First Departure',1291),(1049,'Tetris Party',120),(1050,'Bully: Scholarship Edition',1041),(1052,'Dynasty Warriors 6',1020),(1054,'Ninja Gaiden: Dragon Sword',323),(1055,'Condemned 2: Bloodshot',570),(1056,'Silent Hill: Homecoming',576),(1057,'Command & Conquer: Red Alert 3',682),(1059,'Beijing 2008',330),(1060,'Don King Presents: Prizefighter',771),(1061,'Bomberman',192),(1062,'Ferrari Challenge Trofeo Pirelli',1920),(1063,'Command & Conquer 3: Kane\'s Wrath',570),(1064,'Lost: Via Domus',338),(1066,'Eternal Sonata',2022),(1067,'Viva Pi$?ata: Trouble in Paradise',1252),(1068,'FlatOut: Head On',1380),(1069,'Viking: Battle for Asgard',960),(1070,'Neopets Puzzle Adventure',180),(1071,'TNA iMPACT!',495),(1072,'Tomb Raider: Underworld',602),(1074,'The Chronicles of Narnia: Prince Caspian',699),(1076,'Dark Messiah of Might and Magic: Elements',720),(1080,'Culdcept Saga',2857),(1083,'Mushroom Men: The Spore Wars',357),(1084,'Dragon Quest V: Hand of the Heavenly Bride',2040),(1085,'Ninjatown',900),(1086,'Super Dodgeball Brawlers',41),(1087,'Dokapon Kingdom',1500),(1090,'Sega Superstars Tennis',480),(1092,'Destroy All Humans! Big Willy Unleashed',270),(1095,'The Club',285),(1099,'Madagascar: Escape 2 Africa',390),(1100,'Pro Evolution Soccer 2008',4200),(1101,'Avalon Code',1431),(1102,'Disgaea DS',4232),(1105,'Syberia',630),(1106,'Afrika',1826),(1110,'ObsCure: The Aftermath',440),(1114,'Pinball Hall of Fame: The Williams Collection',1650),(1117,'Wall-E',403),(1123,'Castlevania Judgment',360),(1124,'Death Jr. II: Root of Evil',582),(1125,'Raiden IV',50),(1126,'Metal Slug 7',59),(1127,'Spider-Man: Web of Shadows',720),(1128,'Trauma Center: Under The Knife 2',632),(1129,'Fracture',420),(1130,'Alone in the Dark',367),(1131,'Final Fantasy Fables: Chocobo\'s Dungeon',1500),(1133,'Klonoa: Door to Phantomile',248),(1137,'Dragon Ball: Origins',647),(1138,'Ninja Reflex',230),(1139,'Space Bust-A-Move',241),(1144,'Blitz: The League II',1200),(1145,'Space Chimps',144),(1147,'Etrian Odyssey II: Heroes of Lagaard',3228),(1152,'Universe at War: Earth Assault',960),(1154,'Code Lyoko: Fall of X.A.N.A',909),(1155,'Knights in the Nightmare',1731),(1156,'Lock\'s Quest',900),(1158,'N+',1080),(1160,'The Spiderwick Chronicles',300),(1161,'Summon Night: Twin Age',900),(1162,'Wild Arms XF',3232),(1163,'FIFA Street 3',330),(1168,'Conflict: Denied Ops',340),(1169,'Worms: A Space Oddity',600),(1171,'Overlord: Raising Hell',870),(1172,'Battle Fantasia',63),(1173,'Bangai-O Spirits',630),(1174,'Dungeon Explorer: Warriors of Ancient Arts',470),(1175,'From the Abyss',338),(1177,'Soul Bubbles',519),(1180,'Zubo',900),(1182,'Harvey Birdman: Attorney at Law',240),(1183,'Secret Agent Clank',450),(1186,'Legendary',338),(1187,'Agatha Christie: Evil Under the Sun',457),(1188,'Agatha Christie: And Then There Were None',450),(1189,'Armored Core: For Answer',870),(1191,'The Dark Spire',2700),(1192,'Flower, Sun and Rain',494),(1193,'Insecticide',221),(1194,'Izuna 2: The Unemployed Ninja Returns',795),(1195,'Looney Tunes: Cartoon Conductor',285),(1196,'Nanostray 2',180),(1200,'Vampire Rain',630),(1201,'Baroque',467),(1202,'Supreme Commander',1200),(1204,'Assassin\'s Creed: Altar\'s Chronicles',292),(1205,'The Legend of Kage 2',200),(1206,'Rhapsody: A Musical Adventure',600),(1210,'Secret Files: Tunguska',560),(1211,'Chicken Hunter',90),(1212,'Super Mario 64 DS',1469);
/*!40000 ALTER TABLE `VideoGame` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-22  2:14:30
