
drop database if exists lifeboat;

create database if not exists lifeboat;


create table gov_staff (
  id int AUTO_INCREMENT,
  name varchar(30),
  password varchar(200),
  email varchar(90),
  city varchar(20),
  joined_on datetime DEFAULT NOW(),
  staff_type enum('REGULAR', 'ADMIN', 'SUPER_ADMIN') default 'REGULAR',
  primary key(id)
);

create table facilities (
  id int AUTO_INCREMENT,
  name varchar(40),
  city varchar(30),
  lat varchar(90),
  lng varchar(90),
  verified_by int,
  added_on datetime default NOW(),
  foreign key(verified_by) references gov_staff(id) on delete set null,
  primary key(id)
);


-- keep data about supervisors of facilities
create table supervisors (
  id int AUTO_INCREMENT,
  name varchar(30),
  password varchar(200),
  national_id varchar(20),
  gender enum('MALE', 'FEMALE'),
  dob datetime,
  verified_by int,
  joined_on datetime default NOW(),
  foreign key(verified_by) references gov_staff(id) on delete set null,
  primary key(id)
);



create table foster_kids (
  id int AUTO_INCREMENT,
  name varchar(30),
  dob datetime default NOW(),
  gender enum('MALE', 'FEMALE', 'OTHER') default 'OTHER',
  reason_here longtext,
  verified_by int,
  joined_on datetime default NOW(),
  foreign key(verified_by) references gov_staff(id) on delete set null,
  primary key(id)
);

-- keep history of which facilities a foster kid has been to
-- 
-- verified_by
-- could be empty at first when if the site supervisor adds 
-- them and before a government staffer oversees it 
-- so we don't link the column as foreign key to avoid constraint errors
create table facility_kids (
  id int AUTO_INCREMENT,
  facility_id int,
  foster_kid_id int,
  verified_by int, 
  joined_on datetime default NOW(),
  left_on datetime default NOW(),
  reason longtext,
  foreign key(facility_id) references facilities(id) on delete cascade,
  foreign key(foster_kid_id) references foster_kids(id) on delete cascade,
  -- foreign key(verified_by) references gov_staff(id),
  primary key(id)
);


-- keep history of which facilities a supervisor has been to
create table facility_supervisors (
  id int AUTO_INCREMENT,
  facility_id int,
  supervisor_id int,
  joined_on datetime default NOW(),
  left_on datetime default NOW(),
  reason longtext,
  foreign key(facility_id) references facilities(id) on delete cascade,
  foreign key(supervisor_id) references supervisors(id) on delete cascade,
  primary key(id)
);



-- keep history of inspections done in facilities 
create table facility_inspections (
  id int AUTO_INCREMENT,
  facility_id int,
  gov_staff_id int,
  done_on datetime default NOW(),
  report longtext,
  status enum('GOOD STANDING', 'STANDING', 'POOR STANDING'),
  foreign key(facility_id) references facilities(id) on delete cascade,
  foreign key(gov_staff_id) references gov_staff(id) on delete set null,
  primary key(id)
);


-- keep history of inspections done on facility supervisors while a facility is inspected 
create table supervisor_inspections (
  id int AUTO_INCREMENT,
  facility_id int,
  supervisor_id int,
  gov_staff_id int,
  done_on datetime default NOW(),
  report longtext,
  status enum('GOOD STANDING', 'STANDING', 'POOR STANDING'),
  foreign key(facility_id) references facilities(id) on delete set null,
  foreign key(gov_staff_id) references gov_staff(id) on delete set null,
  foreign key(supervisor_id) references supervisors(id) on delete cascade,
  primary key(id)
);

