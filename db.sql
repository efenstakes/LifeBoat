
drop database if exists lifeboat;

create database if not exists lifeboat;


create table gov_staff (
  id int,
  name varchar(30),
  password varchar(200),
  city varchar(20),
  staff_type enum('REGULAR', 'ADMIN', 'SUPER_ADMIN'),
  primary key(id)
);

create table facilities (
  id int,
  name varchar(40),
  city varchar(30),
  primary key(id)
);


-- keep data about supervisors of facilities
create table supervisors (
  id int,
  name varchar(30),
  password varchar(200),
  city varchar(20),
  supervisor_id int,
  facility_id int,
  foreign key(supervisor_id) references supervisors(id),
  foreign key(facility_id) references facilities(id),
  primary key(id)
);



create table foster_kids (
  id int,
  name varchar(30),
  dob datetime,
  reason_here longtext,
  facility_id int,
  foreign key(facility_id) references facilities(id),
  primary key(id)
);

-- keep history of which facilities a foster kid has been to
-- 
-- overseer_supervisor_id
-- could be empty at first when if the site supervisor adds 
-- them and before a government staffer oversees it 
-- so we don't link the column as foreign key to avoid constraint errors
create table facility_kids (
  id int,
  facility_id int,
  foster_kid_id int,
  overseer_supervisor_id int, 
  joined_on datetime,
  left_on datetime,
  reason longtext,
  foreign key(facility_id) references facilities(id),
  foreign key(foster_kid_id) references foster_kids(id),
  -- foreign key(overseer_supervisor_id) references supervisors(id),
  primary key(id)
);


-- keep history of which facilities a supervisor has been to
create table facility_supervisors (
  id int,
  facility_id int,
  supervisor_id int,
  joined_on datetime,
  left_on datetime,
  reason longtext,
  foreign key(facility_id) references facilities(id),
  foreign key(supervisor_id) references supervisors(id),
  primary key(id)
);



-- keep history of inspections done in facilities 
create table facility_inspections (
  id int,
  facility_id int,
  gov_staff_id int,
  done_on datetime,
  report longtext,
  status enum('GOOD STANDING', 'STANDING', 'POOR STANDING'),
  foreign key(facility_id) references facilities(id),
  foreign key(gov_staff_id) references gov_staff(id),
  primary key(id)
);


-- keep history of inspections done on facility supervisors while a facility is inspected 
create table supervisor_inspections (
  id int,
  facility_id int,
  supervisor_id int,
  done_on datetime,
  report longtext,
  status enum('GOOD STANDING', 'STANDING', 'POOR STANDING'),
  foreign key(facility_id) references facilities(id),
  foreign key(supervisor_id) references supervisors(id),
  primary key(id)
);

