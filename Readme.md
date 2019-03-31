# LifeBoat 
( *fostering the fosters for the fostered ones* )

## Table of Contents

- [Install](#install)
- [Introduction](#introduction)
- [API](#api)
- [Contributing](#contributing)
- [SecurityVulnerabilities](#security-vulnerabilities)
- [Licence](#licence)



## Install
LifeBoat is a foster care management system. It helps governments and officials who run the foster
care system or any foster facilities manage their tasks and help in decision making.  

Before downloading and running this server, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 8.* or higher is required as well as [mysql server](https://dev.mysql.com/downloads/).

Installation is done by first using the `npm clone` command to get the repo then copying the contents of db.sql and creating the database 

```sh
$ git clone https://github.com/efenstakes/LifeBoat
$ cd LifeBoat
$ npm install
$ npm start
```


## Introduction 
LifeBoat is a foster care management system. It helps governments and officials who run the foster
care system or any foster facilities manage their tasks and help in decision making. It also helps move
the old existing systems which are mostly paper-based to a digital system which is easier to manage.

System entities 
1. Government Staff
2. Facility supervisors
3. Foster kids
4. Children's home facilities


It's aimed at solving these problems:
* Scattered storage systems which are mostly based on old paper systems
* Transparency issues in foster facilities
* Fund allocation by governments to facilities
* Poor auditing of operations in the system 
* Mismanagement of facilities, it's funds or foster kids' affairs
* Long duration taken for availing, compiling or creating reports 
* Blind decision making for government staff, using the system they can assign kids to the right facilities,
right supervisors are assigned to the right facilities based on given reports.
* Lack of trust in foster facilities by possible donors and sponsors


It helps with these tasks:
1. Store system entities like Government Staff, Facilities, Facility Supervisors, Foster Kids and reports
2. Keep facility and supervisor reports
3. Keep history of facility progress (the kids and supervisors who have been there)
4. Authenticate system operations
5. Assure donors and sponsors that they are contributing to verified facilities 
6. Auditing the system for example who verified a facility, when and what report did they give?


## API
The server runs on port 9000 and follows REST API best practices. It has 4 main parent routes 

[domain](http://localhost:9000)/api/*entity*,
where *entity* is either gov-staff, facility, kid or report 

```sh
 http://localhost:9000/gov-staff/
 http://localhost:9000/facility/
 http://localhost:9000/kid/
 http://localhost:9000/report/
```

Each deals with a specific system entity.
 

## Contributing
Contributions to the LifeBoat server are welcome. Contributions are accepted using GitHub pull requests. If you're not familiar with making GitHub pull requests, please refer to the GitHub documentation "Creating a pull request".

For a good pull request, we ask you provide the following:

* Try to include a clear description of your pull request in the description. It should include the basic "what" and "why"s for the request.  

* Follow the same code formatting model used in the existing code base


# Security Vulnerabilities
If you discover a security vulnerability within Laravel, please send an e-mail to Efen via efenstakes101@gmail.com. All security vulnerabilities will be promptly addressed.


# Licence
The LifeBoat server is open-source software licensed under the [ISC Licence](https://www.isc.org/downloads/software-support-policy/isc-license/)
