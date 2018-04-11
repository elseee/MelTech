-- create database
CREATE DATABASE meltech;

-- create afspraken table
create table afspraken (
  id integer primary key auto_increment,
  startTijd varchar(250) NOT NULL,
  naam varchar(250),
  email varchar(250),
  tel varchar(25),
  probleem varchar(250)
);

-- create login table
create table login (
	user varchar(25),
	password varchar(25)
);

-- create login details
INSERT INTO login (user, password) VALUES ('admin', 'admin');

