create database matemaxdb;
use matemaxdb;

create table jogador (
id_J int auto_increment primary key not null,
nome varchar(50) not null
);

create table operacao (
id_op int auto_increment primary key not null,
materia char(1) not null,
nome varchar(20) not null
);

create table pontuacao (
id_J int not null,
id_op int not null,
pontuacao int,
CONSTRAINT FK_id_J FOREIGN KEY (id_J) REFERENCES jogador(id_J),
CONSTRAINT FK_id_op FOREIGN KEY (id_op) REFERENCES operacao(id_op)
);