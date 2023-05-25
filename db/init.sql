CREATE TABLE state (
    state_id int AUTO_INCREMENT,
    state_name varchar(45) NOT NULL,
    PRIMARY KEY (state_id)
);

INSERT INTO state VALUES
    (1, 'Attica'),
    (2, 'Central Greece'),
    (3, 'Central Macedonia'),
    (4, 'Crete'),
    (5, 'Eastern Macedonia and Thrace'),
    (6, 'Epirus'),
    (7, 'Ionian Islands'),
    (8, 'North Aegean'),
    (9, 'Peloponnese'),
    (10, 'South Aegean'),
    (11, 'Thessaly'),
    (12, 'Western Greece'),
    (13, 'Western Macedonia'),
    (14, 'Monastic community of Mount Athos');

CREATE TABLE city (
    city_id int AUTO_INCREMENT,
    city_name varchar(45) NOT NULL,
    state_id int DEFAULT NULL,
    PRIMARY KEY (city_id),
    FOREIGN KEY (state_id) REFERENCES state (state_id)
);

LOAD DATA INFILE '/var/lib/mysql-files/cities.csv'
INTO TABLE city
FIELDS TERMINATED BY ','
ENCLOSED BY "'"
LINES TERMINATED BY '\n'
IGNORE 1 LINES;

CREATE TABLE contacts (
    contact_id int NOT NULL AUTO_INCREMENT,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    street_address varchar(100) DEFAULT NULL,
    zip_code int DEFAULT NULL,
    city_id int DEFAULT NULL,
    phone_number varchar(11) NOT NULL,
    email_address varchar(50) DEFAULT NULL,
    PRIMARY KEY (contact_id),
    FOREIGN KEY (city_id) REFERENCES city (city_id)
);

INSERT INTO contacts(first_name, last_name, street_address, zip_code, city_id, phone_number, email_address) VALUES 
    ('Maria','Papadopoulou','Solonos 75',54644,2,'6987825687','mpapadopoulou@gmail.com'),
    ('Pedro','Gonzalez','Ermou 3',10563,1,'2108547595','pgonzalez99@email.com'),
    ('Michalis','Louloudopoulos','Nikiforou Theotoki 154',49100,85,'6953086207','louloudopoulos@hotmail.com'),
    ('Fernando','Fernandez','Lioufi 3',50100,52,'6946558874','ferfer@gmail.com'),
    ('Giorgos','Pavlidis','Leof. Nikis 21',54623,2,'2310458793','gpavlapavlidis@gmx.net'),
    ('Katerina','Oikonomou','Chelidonous 8',14561,46,'6944789563','koikonomou@gmail.com');

LOAD DATA INFILE '/var/lib/mysql-files/contacts.csv'
INTO TABLE contacts
FIELDS TERMINATED BY ','
ENCLOSED BY "'"
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(first_name, last_name, street_address, city_id, zip_code, phone_number, email_address);

CREATE VIEW FULL_CONTACTS AS 
SELECT contact_id, first_name, last_name, street_address, zip_code, city_name, state_name, phone_number, email_address
FROM contacts
	JOIN city ON city.city_id = contacts.city_id
	JOIN state ON state.state_id = city.state_id
ORDER BY contact_id; 