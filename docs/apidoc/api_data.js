define({ "api": [
  {
    "type": "post",
    "url": "/",
    "title": "add a facility to the system",
    "version": "1.0.0",
    "name": "add_facility",
    "group": "Facility",
    "description": "<p>add a new facility to the system</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>facility name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>city the facility is located</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lat",
            "description": "<p>its location latitude to help search it in maps</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "lng",
            "description": "<p>its location longitude to help search it in maps</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "staff_type",
            "description": "<p>The Staff staff_type</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"name\": \"Nairobi Kids Facility\",\n   \"city\": \"Cairo\",\n   \"lat\": \"-1.360766\",\n   \"lng\": \"42.167809655\"\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "saved",
            "description": "<p>determines if the facility was added</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>containing the id of the facility if it was added</p>"
          },
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "errors",
            "description": "<p>list of errors if any occured</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"saved\": true|false,\n  \"id\": null|\"id\",\n  \"errors\": []  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facility.js",
    "groupTitle": "Facility"
  },
  {
    "type": "post",
    "url": "/:id/supervisors",
    "title": "get history supervisors of a facility",
    "version": "1.0.0",
    "name": "check_if_a_staffer_is_authenticated",
    "group": "Facility",
    "description": "<p>check if a staffer is authenticated</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "supervisor",
            "description": "<p>the array of supervisors for a facility</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "supervisor",
            "description": "<p>array of supervisors a facility has had</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"supervisors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facility.js",
    "groupTitle": "Facility"
  },
  {
    "type": "delete",
    "url": "/",
    "title": "delete a facility",
    "version": "1.0.0",
    "name": "delete_facility",
    "group": "Facility",
    "description": "<p>delete a facility</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n   \"id\": \"id\"    \n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.delete(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "deleted",
            "description": "<p>boolean determining if facility is deleted</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"deleted\": true|false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facility.js",
    "groupTitle": "Facility"
  },
  {
    "type": "post",
    "url": "/",
    "title": "get all facilities",
    "version": "1.0.0",
    "name": "get_all_facilities",
    "group": "Facility",
    "description": "<p>get all facilities in the system</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": "<p>of facilities in the system</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"facilities\": [] \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facility.js",
    "groupTitle": "Facility"
  },
  {
    "type": "post",
    "url": "/",
    "title": "get all facilities in a city",
    "version": "1.0.0",
    "name": "get_city_facilities",
    "group": "Facility",
    "description": "<p>get all facilities in a city</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>the city name whose facilities we are getting</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "array",
            "description": "<p>of facilities in a city</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"facilities\": [] \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facility.js",
    "groupTitle": "Facility"
  },
  {
    "type": "get",
    "url": "/:id/",
    "title": "get details of a facility",
    "version": "1.0.0",
    "name": "get_facility_details",
    "group": "Facility",
    "description": "<p>get details of a facility. its supervisor, inspections, kids, location etc..</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the facility ID</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "Facility",
            "description": "<p>the facility details</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "Supervisor",
            "description": "<p>the facility supervisor details</p>"
          },
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "Kids",
            "description": "<p>a list of the kids in the facility</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"facility\": {},\n  \"supervisor\": {},\n  \"kids\": []  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facility.js",
    "groupTitle": "Facility"
  },
  {
    "type": "post",
    "url": "/:id/kids/history",
    "title": "get history of all kids in a facility",
    "version": "1.0.0",
    "name": "get_history_of_kids",
    "group": "Facility",
    "description": "<p>get history of all kids in a facility</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ID",
            "description": "<p>id of the facility whose history we are to fetch</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "Kids",
            "description": "<p>the array of kids in a facility</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"kids\": [] \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facility.js",
    "groupTitle": "Facility"
  },
  {
    "type": "post",
    "url": "/:id/kids",
    "title": "get kids in a facility",
    "version": "1.0.0",
    "name": "get_kids",
    "group": "Facility",
    "description": "<p>get kids in a facility in an Array</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ID",
            "description": "<p>the facility id whose kids we are fetching</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "kids",
            "description": "<p>list of kids i the facility</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"kids\": [] \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/facility.js",
    "groupTitle": "Facility"
  },
  {
    "type": "get",
    "url": "/:id/exists",
    "title": "Check if a kid exists",
    "version": "1.0.0",
    "name": "Check_if_kid_exists",
    "group": "Foster_Kids",
    "description": "<p>Check if a kid exists</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the foster kid</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "Boolean",
            "description": "<p>to determine if a kid exists</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>contain the kid's data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"exists\": true|false,\n  \"data\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/foster-kid.js",
    "groupTitle": "Foster_Kids"
  },
  {
    "type": "post",
    "url": "/:name/name-used",
    "title": "Check if a kid's Name is used",
    "version": "1.0.0",
    "name": "Check_if_kid_s_Name_is_used",
    "group": "Foster_Kids",
    "description": "<p>Check if a kid's Name is used</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the name of the foster kid</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "used",
            "description": "<p>to determine if a kid's name is used</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "data",
            "description": "<p>contain the kid's data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"used\": true|false,\n  \"data\": {} \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/foster-kid.js",
    "groupTitle": "Foster_Kids"
  },
  {
    "type": "post",
    "url": "/",
    "title": "add a foster kid to the system",
    "version": "1.0.0",
    "name": "add_foster_kid",
    "group": "Foster_Kids",
    "description": "<p>add a foster kid to the system</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the name of the kid</p>"
          },
          {
            "group": "Request body",
            "type": "DateTime",
            "optional": false,
            "field": "dob",
            "description": "<p>date this kid was added</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>gender of the kid</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "reason_here",
            "description": "<p>reason this kid was added to the system</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"name\": \"Nairobi Kids Facility\",\n   \"dob\": \"2019-10-31 22:10:08\",\n   \"gender\": 'MALE'|'FEMALE',\n   \"reason_here\": \"a reason\"\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "saved",
            "description": "<p>determines if the kid was added</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>containing the id of the kid if it was added</p>"
          },
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "errors",
            "description": "<p>list of errors if any occured</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"saved\": true|false,\n  \"id\": null|\"id\",\n  \"errors\": []  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/foster-kid.js",
    "groupTitle": "Foster_Kids"
  },
  {
    "type": "delete",
    "url": "/",
    "title": "delete a kid",
    "version": "1.0.0",
    "name": "delete_kid",
    "group": "Foster_Kids",
    "description": "<p>delete a kid from the system</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n   \"id\": \"id\"    \n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.delete(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "deleted",
            "description": "<p>boolean determining if kid was deleted</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"deleted\": true|false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/foster-kid.js",
    "groupTitle": "Foster_Kids"
  },
  {
    "type": "get",
    "url": "/:id/",
    "title": "get foster kid details",
    "version": "1.0.0",
    "name": "get_kid_details",
    "group": "Foster_Kids",
    "description": "<p>get foster kid details</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the foster kid</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "kid",
            "description": "<p>object containing the kid's data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"kid\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/foster-kid.js",
    "groupTitle": "Foster_Kids"
  },
  {
    "type": "get",
    "url": "/:id/facilities",
    "title": "get facilities this foster kid has been to",
    "version": "1.0.0",
    "name": "get_kid_facilities",
    "group": "Foster_Kids",
    "description": "<p>get history of facilities this foster kid has been to</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the foster kid</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "facilities",
            "description": "<p>a kid has been to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"facilities\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/foster-kid.js",
    "groupTitle": "Foster_Kids"
  },
  {
    "type": "post",
    "url": "/:id/place",
    "title": "place a kid in a new facility",
    "version": "1.0.0",
    "name": "place_kid_in_facily",
    "group": "Foster_Kids",
    "description": "<p>place a foster kid in a new facility</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the foster kid</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "saved",
            "description": "<p>determines if the kid was successfully placed</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>containing the id of the new placement for the kid if they were placed</p>"
          },
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "errors",
            "description": "<p>list of errors if any occured</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"saved\": true|false,\n  \"id\": null|\"id\",\n  \"errors\": []  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/foster-kid.js",
    "groupTitle": "Foster_Kids"
  },
  {
    "type": "post",
    "url": "/account-exists",
    "title": "Check if a Government Staff Account Exists",
    "version": "1.0.0",
    "name": "Check_Account",
    "group": "Government_Staff",
    "description": "<p>Check if a Government Staff Account Exists</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"name\": \"kimmy wesley\",\n   \"password\": \"password\"\n}\n\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "Boolean",
            "description": "<p>to determine if Staff account exists</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "JSON",
            "description": "<p>object with user data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"exists\": true|false,\n  \"user\": {} \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "post",
    "url": "/:id/exists",
    "title": "Check if a Government Staff Account Exists By Id",
    "version": "1.0.0",
    "name": "Check_Account_By_Id",
    "group": "Government_Staff",
    "description": "<p>Check if a Government Staff Account Exists By Id</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "Boolean",
            "description": "<p>to determine if Staff account exists</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"exists\": true|false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "post",
    "url": "/:name/exists",
    "title": "Check if a Government Staff Name is used",
    "version": "1.0.0",
    "name": "Check_if_Account_Name_is_used",
    "group": "Government_Staff",
    "description": "<p>Check if a Government Staff Name is used</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "Boolean",
            "description": "<p>to determine if Staff a name is used</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"used\": true|false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "post",
    "url": "/",
    "title": "Create a Government Staff Account",
    "version": "1.0.0",
    "name": "Create_Account",
    "group": "Government_Staff",
    "description": "<p>Create a Government Staff Account</p>",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>The Staff name</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>The Staff password</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmationPassword",
            "description": "<p>Staff confirmationPassword</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>The Staff email</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "city",
            "description": "<p>The Staff city</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "staff_type",
            "description": "<p>The Staff staff_type</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"name\": \"kimmy wesley\",\n   \"password\": \"password\",\n   \"confirmationPassword\": \"confirmationPassword\",\n   \"email\": \"email@email.com\",\n   \"city\": \"Cairo\",\n   \"staff_type\": \"REGULAR | ADMIN | SUPER_ADMIN\"\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "saved",
            "description": "<p>Boolean to determine if Staff was saved successfully</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>The id of the saved staff (id they were saved)</p>"
          },
          {
            "group": "Success 201",
            "type": "List",
            "optional": false,
            "field": "errors",
            "description": "<p>list of errors that were found with the data (if any)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"saved\": true|false,\n  \"id\": \"id\",\n   \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/",
    "title": "Delete a Government Staff Account",
    "version": "1.0.0",
    "name": "Delete_Account",
    "group": "Government_Staff",
    "permission": [
      {
        "name": "authenticated user"
      }
    ],
    "description": "<p>Delete a Government Staff Account</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.delete(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "Boolean",
            "description": "<p>to determine if Staff was deleted successfully</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"deleted\": true|false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "Unauthorized",
            "description": "<p>Only authenticated users can access the endpoint.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Unauthorized response:",
          "content": "HTTP 401 Unauthorized\n{\n  \"message\": \"Invalid credentials\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/:id/",
    "title": "Get a Government Staffer Details",
    "version": "1.0.0",
    "name": "Get_a_Government_Staffer_Details",
    "group": "Government_Staff",
    "description": "<p>Get a Government Staffer Details</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>contain Staff details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"details\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "post",
    "url": "/:id/set-priviledge",
    "title": "Set the priviledge for a Government Staffer",
    "version": "1.0.0",
    "name": "Set_a_Government_Staffer_s_Priviledge",
    "group": "Government_Staff",
    "description": "<p>Set the priviledge for a Government Staffer</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   priviledge: 'regular' | 'admin' | 'super admin'    \n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "Boolean",
            "description": "<p>true if the update was made</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"set\": true|false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "post",
    "url": "/is-authenticated",
    "title": "check if a staffer is authenticated",
    "version": "1.0.0",
    "name": "check_if_a_staffer_is_authenticated",
    "group": "Government_Staff",
    "description": "<p>check if a staffer is authenticated</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "Boolean",
            "description": "<p>determines if the staffer is authenticated or not</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>containing the staff details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"is_authenticated\": true|false,\n  \"user\": {} \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "post",
    "url": "/",
    "title": "get all staffers in the server",
    "version": "1.0.0",
    "name": "get_all_staffers_in_the_server",
    "group": "Government_Staff",
    "description": "<p>get all staffers in the server</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "List",
            "optional": false,
            "field": "List",
            "description": "<p>containing the staffers</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"staffers\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "get",
    "url": "/:id/facilities",
    "title": "get facilities a staffer has inspected",
    "version": "1.0.0",
    "name": "get_facilities_a_staffer_has_inspected",
    "group": "Government_Staff",
    "description": "<p>get facilities a staffer has inspected</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "List",
            "optional": false,
            "field": "List",
            "description": "<p>containing the facilities</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"facilities\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "get",
    "url": "/:id/facilities/city/:city",
    "title": "get facilities a staffer has inspected in a city route",
    "version": "1.0.0",
    "name": "get_facilities_a_staffer_has_inspected_in_a_city_route",
    "group": "Government_Staff",
    "description": "<p>get facilities a staffer has inspected in a city route</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "List",
            "optional": false,
            "field": "List",
            "description": "<p>containing the facilities</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"facilities\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "get",
    "url": "/:id/facilities",
    "title": "get facilities a staffer has verified",
    "version": "1.0.0",
    "name": "get_facilities_a_staffer_has_verified",
    "group": "Government_Staff",
    "description": "<p>get facilities a staffer has verified</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "List",
            "optional": false,
            "field": "List",
            "description": "<p>containing the facilities</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"facilities\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "get",
    "url": "/:id/foster-kids/verifications",
    "title": "get kids a staffer has verified to be added to the foster system",
    "version": "1.0.0",
    "name": "get_kids_a_staffer_has_verified_to_be_added_to_the_foster_system",
    "group": "Government_Staff",
    "description": "<p>get kids a staffer has verified to be added to the foster system</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "List",
            "optional": false,
            "field": "List",
            "description": "<p>containing the kids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"kids\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "get",
    "url": "/:id/foster-kids/placements",
    "title": "get kids that this staffer has placed in a childrens home or a foster home",
    "version": "1.0.0",
    "name": "get_kids_that_this_staffer_has_placed_in_a_childrens_home_or_a_foster_home",
    "group": "Government_Staff",
    "description": "<p>get kids that this staffer has placed in a childrens home or a foster home</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "List",
            "optional": false,
            "field": "List",
            "description": "<p>containing the kids</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"kids\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "post",
    "url": "/logout",
    "title": "log any user out",
    "version": "1.0.0",
    "name": "log_any_user_out",
    "group": "Government_Staff",
    "description": "<p>log any user out</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "Boolean",
            "description": "<p>flag identifying if a user was logged out or not</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"logged_out\": true|false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/base.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "post",
    "url": "/",
    "title": "login a government staffer",
    "version": "1.0.0",
    "name": "login_a_government_staffer",
    "group": "Government_Staff",
    "description": "<p>login a government staffer</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   name: \"name\", \n   password: \"password\"    \n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "String",
            "description": "<p>containing the authentication token</p>"
          },
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "Object",
            "description": "<p>containing the staff details</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"token\": \"tokenstring\",\n  \"user\": {} \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/gov-staff.js",
    "groupTitle": "Government_Staff"
  },
  {
    "type": "post",
    "url": "/facility",
    "title": "add a report for a certain facility",
    "version": "1.0.0",
    "name": "add_facility_report",
    "group": "Reports",
    "description": "<p>add a report for a certain facility to the system</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "facility_id",
            "description": "<p>id of facility whose report we are adding</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "report",
            "description": "<p>the text describing the status of the facility</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>the status of a facility 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"facility_id\": \"Nairobi Kids Facility ID\",\n   \"report\": \"report here\",\n   \"status\": 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "saved",
            "description": "<p>determines if the facility report was added</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>containing the id of the report if it was added</p>"
          },
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "errors",
            "description": "<p>list of errors if any occured</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"saved\": true|false,\n  \"id\": null|\"id\",\n  \"errors\": []  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/report.js",
    "groupTitle": "Reports"
  },
  {
    "type": "post",
    "url": "/supervisor",
    "title": "add a report for a certain supervisor",
    "version": "1.0.0",
    "name": "add_supervisor_report",
    "group": "Reports",
    "description": "<p>add a report for a certain supervisor to the system</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "Number",
            "optional": false,
            "field": "supervisor_id",
            "description": "<p>id of supervisor whose report we are adding</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "report",
            "description": "<p>the text describing the status of the supervisor</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>the status of a supervisor 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"supervisor_id\": \"supervisor ID\",\n   \"report\": \"report here\",\n   \"status\": 'GOOD STANDING' | 'STANDING' | 'POOR STANDING'\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "saved",
            "description": "<p>determines if the report was added</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>containing the id of the report if it was added</p>"
          },
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "errors",
            "description": "<p>list of errors if any occured</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"saved\": true|false,\n  \"id\": null|\"id\",\n  \"errors\": []  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/report.js",
    "groupTitle": "Reports"
  },
  {
    "type": "get",
    "url": "/facility/:id/",
    "title": "get reports of a facility",
    "version": "1.0.0",
    "name": "get_reports",
    "group": "Reports",
    "description": "<p>get reports of a facility in an Array</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ID",
            "description": "<p>the facility id whose reports we are fetching</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "reports",
            "description": "<p>array of report that have been made for this facility</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"reports\": [] \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/report.js",
    "groupTitle": "Reports"
  },
  {
    "type": "get",
    "url": "/facility/:id/",
    "title": "get reports of a facility",
    "version": "1.0.0",
    "name": "get_reports",
    "group": "Reports",
    "description": "<p>get reports of a supervisor in an Array</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "ID",
            "description": "<p>the supervisor id whose reports we are fetching</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "reports",
            "description": "<p>array of report that have been made for this supervisor</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"reports\": [] \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/report.js",
    "groupTitle": "Reports"
  },
  {
    "type": "post",
    "url": "/",
    "title": "add a supervisor to the system",
    "version": "1.0.0",
    "name": "add_supervisor",
    "group": "Supervisors",
    "description": "<p>add a supervisor to the system</p>",
    "parameter": {
      "fields": {
        "Request body": [
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>the name of the supervisor</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>the password of the supervisor</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "confirmationPassword",
            "description": "<p>the password of the supervisor (should be same as password)</p>"
          },
          {
            "group": "Request body",
            "type": "DateTime",
            "optional": false,
            "field": "dob",
            "description": "<p>date this supervisor was added</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>gender of the supervisor</p>"
          },
          {
            "group": "Request body",
            "type": "String",
            "optional": false,
            "field": "national_id",
            "description": "<p>the national id of this supervisor</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n   \"name\": \"Liz Muwami\",\n   \"password\": \"Secret\",\n   \"confirmationPassword\": \"Secret\",\n   \"dob\": \"2019-10-31 22:10:08\",\n   \"gender\": 'MALE'|'FEMALE',\n   \"national_id\": \"8643467789\"\n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.post(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "saved",
            "description": "<p>determines if the kid was added</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>containing the id of the kid if it was added</p>"
          },
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "errors",
            "description": "<p>list of errors if any occured</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"saved\": true|false,\n  \"id\": null|\"id\",\n  \"errors\": []  \n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/supervisor.js",
    "groupTitle": "Supervisors"
  },
  {
    "type": "delete",
    "url": "/",
    "title": "delete a supervisor",
    "version": "1.0.0",
    "name": "delete_supervisor",
    "group": "Supervisors",
    "description": "<p>delete a supervisor from the system</p>",
    "parameter": {
      "fields": {
        "Request Body": [
          {
            "group": "Request Body",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the supervisor</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {  \n   \"id\": \"id\"    \n}\n\n$http.defaults.headers.common[\"Authorization\"] = token;\n$http.delete(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Boolean",
            "optional": false,
            "field": "deleted",
            "description": "<p>boolean determining if supervisor was deleted</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"deleted\": true|false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/supervisor.js",
    "groupTitle": "Supervisors"
  },
  {
    "type": "get",
    "url": "/:id/",
    "title": "get all supervisors",
    "version": "1.0.0",
    "name": "get_all_supervisors",
    "group": "Supervisors",
    "description": "<p>get all supervisors</p>",
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "supervisors",
            "description": "<p>array containing the supervisors</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"supervisors\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/supervisor.js",
    "groupTitle": "Supervisors"
  },
  {
    "type": "get",
    "url": "/:id/",
    "title": "get supervisor details",
    "version": "1.0.0",
    "name": "get_supervisor_details",
    "group": "Supervisors",
    "description": "<p>get supervisor details</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the supervisor</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Object",
            "optional": false,
            "field": "supervisor",
            "description": "<p>object containing the supervisor's data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"supervisor\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/supervisor.js",
    "groupTitle": "Supervisors"
  },
  {
    "type": "get",
    "url": "/:id/facilities",
    "title": "get facilities this supervisor has been to",
    "version": "1.0.0",
    "name": "get_supervisor_facilities",
    "group": "Supervisors",
    "description": "<p>get all facilities this supervisor has been to</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>the id of the supervisor</p>"
          }
        ]
      }
    },
    "examples": [
      {
        "title": "Example usage:",
        "content": "const data = {\n}\n\n$http.get(url, data)\n  .success((res, status) => doSomethingHere())\n  .error((err, status) => doSomethingHere());",
        "type": "js"
      }
    ],
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "Array",
            "optional": false,
            "field": "facilities",
            "description": "<p>array containing the facilities this supervisor has been to</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success response:",
          "content": " HTTPS 201 OK\n {\n  \"facilities\": {}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/supervisor.js",
    "groupTitle": "Supervisors"
  }
] });
