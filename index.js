
const inquirer = require('inquirer');

const mysql = require('mysql2');

require("console.table");
require("dotenv").config();


const PORT = process.env.PORT || 3001;

//connection created to connect mysql to node to be able to use connection.query option
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "tracker_db"
});


//create drop downs to make menu selections
function viewDatabase() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "response",
                message: "What would you like to do?",
                choices: [
                    "View all employees",
                    "View all departments",
                    "View all roles",
                    "Add a new employee",
                    "Add department",
                    "Add role",
                    "Update employee role",
                    "quit",
                ],
            },
        ])
        //use switch case to run the function based on which option is selected that will run the function created
        .then(function ({ response }) {
            switch (response) {
                case "View all employees":
                    viewEmployees();
                    break;
                case "View all departments":
                    viewDepts();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "Add a new employee":
                    addEmployee();
                    break;
                case "Add department":
                    addDepts();
                    break;
                case "add a new role":
                    addNewRole();
                    break;
                case "Update employee role":
                    updateRole();
                    break;
                case "quit":
                    connection.end();
                    break;

            };
        });
};
//create functions to respond to choice selected
// create function to show all tables grouped together
function viewEmployees() {
    connection.query(`SELECT employee.id, employee.first_name, employee.last_name, 
    role.title, role.salary, 
    department.name AS department, 
    CONCAT (manager.first_name, ' ', manager.last_name) 
    AS manager FROM employee LEFT JOIN role on employee.role_id = 
    role.id LEFT JOIN department on role.department_id = 
    department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`,
        function (err, res) {
            if (err) throw err;
            console.table(res);
            viewDatabase();
        });
};

function viewDepts() {
    // Data from Dept is displayed on the console
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        console.table(res);
        viewDatabase();
    });
};

function viewRoles() {
    // Data from roles is displayed on the console 
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        console.table(res);
        viewDatabase();
    });
};

function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the new employee's first name?",
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the new employee's last name?",
            },
            {
                type: "input",
                name: "role",
                message: "What position is this employee being hired for?",
            },
            {
                type: "input",
                name: "manager",
                message: "Who does the new employee report to? List by manager ID",
            },
        ])
        .then(function (data) {
            // After recieving data input, data is then placed into employee table
            connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
                [data.first_name, data.last_name, data.role, data.manager],
                function (err, result) {
                    if (err) throw err;
                    console.table(data);
                    viewDatabase();
                });
        });
};

function addDepts() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What is the new department called?",
            },
        ])
        .then(function (data) {
            // After recieving data input, data is then placed into dept table
            connection.query("INSERT INTO department (name) VALUES (?)",
                [data.name],
                function (err, res) {
                    if (err) throw err;

                })
            // Updated data is then displayed onto the console log as a table
            connection.query("SELECT * FROM department", function (err, res) {
                if (err) throw err;
                console.table(res);
                viewDatabase();
            });
        });
};

function addNewRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "add_role",
                message: "What is the name of the new position?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the new position's base salary?"
            },
            {
                type: "input",
                name: "department_id",
                message: "Which department does this position belong to? Please enter Dept. ID"
            },
        ])
        .then(function (data) {
            // After recieving data input, data is then placed into role table
            connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?);",
                [data.title, data.salary, data.department_id],
                function (err, res) {
                    if (err) throw err;
                })
            // Updated data is then displayed onto the console log as a table
            connection.query("SELECT * FROM role", function (err, res) {
                if (err) throw err;
                console.table(res);
                viewDatabase();
            });

        });
};

function updateRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "idEmp",
                message: "Which employee is being updated? Please enter ID."
            },
            {
                type: "input",
                name: "newRole",
                message: "Which position is the employee being updated to? Please enter ID."
            },
        ])
        .then(function (data) {
            connection.query(
                // SQL feature that will change the selected employee and update them with a new role
                "UPDATE employee SET role_id = ? WHERE id = ?",
                [data.newRole, data.idEmp],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    viewDatabase();
                }
            );
        });
};

viewDatabase();