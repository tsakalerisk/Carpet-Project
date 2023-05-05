FROM mysql:latest
COPY ./cities.csv /var/lib/mysql-files/
COPY ./contacts.csv /var/lib/mysql-files/
COPY ./init.sql /docker-entrypoint-initdb.d
EXPOSE 3306