FROM mysql:latest
COPY ./mock_data.csv /var/lib/mysql-files/
COPY ./init.sql /docker-entrypoint-initdb.d
EXPOSE 3306