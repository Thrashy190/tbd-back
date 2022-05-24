define USERNAME = tba

create user &USERNAME;

alter user &USERNAME
    default tablespace users
    temporary tablespace temp
    quota unlimited on users;

grant create session,
    create view,
    create sequence,
    create procedure,
    create table,
    create trigger,
    create type,
    create materialized view
    to &USERNAME;

alter user &USERNAME identified by tba;

CREATE TABLE paciente (
  id_paciente NUMERIC NOT NULL,
  nombre  VARCHAR(18) NULL,
  apellido VARCHAR(18) NULL,
  fecha_nacimiento DATE NULL,
  direccion_paciente VARCHAR(18) NULL,
  telefono NUMERIC NULL,
  cp NUMERIC NULL,
  peso NUMERIC NULL,
  altura NUMERIC NULL,
  fecha_registro DATE NULL,
  antecedentes VARCHAR2 NULL,
  CONSTRAINT pk_id_paciente PRIMARY KEY(id_paciente)
);

INSERT INTO paciente VALUES (1,'Diego','Lopez',TO_DATE('2002/07/02 21:02:44', 'yyyy/mm/dd hh24:mi:ss'),'Montessori 125',8441039924,25297,85,173,TO_DATE('2022/04/21 21:02:44', 'yyyy/mm/dd hh24:mi:ss'));
INSERT INTO paciente VALUES (2,'Ale','Lopez',TO_DATE('1992/02/15 21:02:44', 'yyyy/mm/dd hh24:mi:ss'),'Monterrey',8441039924,25297,75,168,TO_DATE('2022/04/21 21:02:44', 'yyyy/mm/dd hh24:mi:ss'));
