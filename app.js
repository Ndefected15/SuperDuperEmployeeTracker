const mysql = require("mysql2");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const fs = require("fs");

const db = mysql.createConnection(
  {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Y7ji5vE^$KHu",
    database: "employees",
  },
  console.log("Connected to the employees database.")
);

const sqlData = fs.readFileSync("./schema.sql").toString();

const scriptArray = sqlData.split(";");

scriptArray.forEach((script) => {
  db.execute(`${script};`);
  console.log("execute ran");
});

db.connect(function (err) {
  if (err) throw err;
  console.log("Database connected.");

  options();
});

function options() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add an employee",
        "Add a department",
        "Add a role",
        "Update employee role",
        "Delete an employee",
        "EXIT",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          viewEmployees();
          break;
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Update employee role":
          updateRole();
          break;
        case "Delete an employee":
          deleteEmployee();
          break;
        case "EXIT":
          exitApp();
          break;
        default:
          break;
      }
    });
}

// view employees in the database
function viewEmployees() {
  var query = "SELECT * FROM employee";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + " employees found!");
    console.table("All Employees:", res);
    options();
  });
}

// view departments in the database
function viewDepartments() {
  var query = "SELECT * FROM department";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Departments:", res);
    options();
  });
}

// view roles in the database
function viewRoles() {
  var query = "SELECT * FROM role";
  db.query(query, function (err, res) {
    if (err) throw err;
    console.table("All Roles:", res);
    options();
  });
}

// add an employee to the database
function addEmployee() {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employee's fist name? ",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employee's last name? ",
        },
        {
          name: "manager_id",
          type: "input",
          message: "What is the employee's manager's ID? ",
        },
        {
          name: "role",
          type: "list",
          choices: function () {
            var roleArray = [];
            for (let i = 0; i < res.length; i++) {
              roleArray.push(res[i].title);
            }
            return roleArray;
          },
          message: "What is this employee's role? ",
        },
      ])
      .then(function (answer) {
        let role_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].title == answer.role) {
            role_id = res[a].id;
            console.log(role_id);
          }
        }
        db.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.first_name,
            last_name: answer.last_name,
            manager_id: answer.manager_id,
            role_id: role_id,
          },
          function (err) {
            if (err) throw err;
            console.log("Your employee has been added!");
            options();
          }
        );
      });
  });
}

// add a department to the database
function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        type: "input",
        message: "Which department would you like to add?",
      },
    ])
    .then(function (answer) {
      db.query("INSERT INTO department SET ?", {
        name: answer.newDepartment,
      });
      var query = "SELECT * FROM department";
      db.query(query, function (err, res) {
        if (err) throw err;
        console.log("Your department has been added!");
        console.table("All Departments:", res);
        options();
      });
    });
}

// add a role to the database
function addRole() {
  db.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "new_role",
          type: "input",
          message: "What new role would you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role? (Enter a number)",
        },
        {
          name: "Department",
          type: "list",
          choices: function () {
            var deptArry = [];
            for (let i = 0; i < res.length; i++) {
              deptArry.push(res[i].name);
            }
            return deptArry;
          },
        },
      ])
      .then(function (answer) {
        let department_id;
        for (let a = 0; a < res.length; a++) {
          if (res[a].name == answer.Department) {
            department_id = res[a].id;
          }
        }

        db.query(
          "INSERT INTO role SET ?",
          {
            title: answer.new_role,
            salary: answer.salary,
            department_id: department_id,
          },
          function (err, res) {
            if (err) throw err;
            console.log("Your new role has been added!");
            console.table("All Roles:", res);
            options();
          }
        );
      });
  });
}

// exit the app
function exitApp() {
  db.end();
}
