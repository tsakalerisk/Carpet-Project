CREATE TABLE Contacts(
    id INT PRIMARY KEY,
    first_name VARCHAR(256),
    last_name VARCHAR(256),
    street_address VARCHAR(256),
    city_id INT,
    zip_code VARCHAR(256),
    phone_number VARCHAR(256),
    email VARCHAR(256)
    # city_id must be foreign key
);

LOAD DATA INFILE  '/var/lib/mysql-files/contacts.csv'
INTO TABLE Contacts
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES;