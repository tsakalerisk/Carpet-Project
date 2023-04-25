FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD="pass"
ENV MYSQL_DATABASE="Carpet"
COPY ./mock_data.csv /var/lib/mysql-files/
COPY ./init.sql /docker-entrypoint-initdb.d
EXPOSE 3306