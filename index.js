
const inquirer = require('inquirer');

const mysql = require('mysql2');

require("console.table");
require("dotenv").config();


const PORT = process.env.PORT || 3001;

//creates a connection to mysql
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "tracker_db"
});
//using inquire to list options to select
function menuOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "response",
                message: "Select an option?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a new employee",
                    "Add department",
                    "Add a new role",
                    "Update employee role",
                    "quit",
                ],
            },
        ])
        //use switch case and functions to add functionality to the above choices
        .then(function ({ response }) {
            switch (response) {

                case "View all departments":
                    viewDpts();
                    break;
                case "View all roles":
                    viewRoles();
                    break;
                case "View all employees":
                    viewEmployees();
                    break;
                case "Add a new employee":
                    addEmployee();
                    break;
                case "Add department":
                    addDpt();
                    break;
                case "Add a new role":
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
//using the connection.query to connect to mysql


function viewDpts() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;

        console.table(res);
        menuOptions();
    });
};


function viewRoles() {

    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;

        console.table(res);
        menuOptions();
    });
};

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
            menuOptions();
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
                type: "list",
                name: "role",
                message: "Please select a role",
                choices:
                    [
                        {
                            value: 1,
                            name: 'Mortgage Compliance Manager',
                        },
                        {
                            value: 2,
                            name: 'Loan Servicing Specialist',
                        },
                        {
                            value: 3,
                            name: 'Quality Administrator',
                        },
                        {
                            value: 4,
                            name: 'Escalation Representative',
                        },
                        {
                            value: 5,
                            name: 'Escalation Manager',
                        },
                        {
                            value: 6,
                            name: 'Insurance Manager',
                        },
                        {
                            value: 7,
                            name: 'Claims Adjuster',
                        },
                        {
                            value: 8,
                            name: 'Underwriter',
                        },
                        {
                            value: 9,
                            name: 'Human Resource Manager',
                        },
                        {
                            value: 10,
                            name: 'Employment Specialist',
                        },
                        {
                            value: 11,
                            name: 'IT Manager',
                        },
                        {
                            value: 12,
                            name: 'Software Developer',
                        },
                        {
                            value: 13,
                            name: 'IT Support Specialist',
                        },
                     
                 
            ,],

            },
{
        type: "input",
        name: "manager",
        message: "Please enter manager ID",
        choices: [{
            value: 1,
            name: "Mortgage Compliance Manager",
        },
        {
            value: 5,
            name: "Escalation Manager",
        },
        {
            value: 6,
            name: "Insurance Manger",
        },
        {
            value: 9,
            name: "Human Resource Manager",
        },
        {
            value: 11,
            name: "IT Manager",
        },
        ]
            },
        ])
        .then(function (data) {

                connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
                    [data.first_name, data.last_name, data.role, data.manager],
                    function (err, result) {
                        if (err) throw err;
                        console.table(data);
                        menuOptions();
                    });
            });
};

function addDpt() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "new_dept",
                message: "What is the new department name?",
            },
        ])
        .then(function (data) {
            connection.query("INSERT INTO department (name) VALUES (?)",
                [data.new_dept],
                function (err, res) {
                    if (err) throw err;

                })

            connection.query("SELECT * FROM department", function (err, res) {
                if (err) throw err;
                console.table(res);
                menuOptions();
            });
        });
};

function addNewRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "new_title",
                message: "What is the new role name?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the base salary?"
            },
            {
                type: "input",
                name: "department_id",
                message: "Which department does this position belong to? Please enter Dept. ID"
            },
        ])
        .then(function (data) {
            connection.query("INSERT INTO role(title, salary, department_id) VALUES (?,?,?);",
                [data.new_title, data.salary, data.department_id],
                function (err, res) {
                    if (err) throw err;
                })

            connection.query("SELECT * FROM role", function (err, res) {
                if (err) throw err;
                console.table(res);
                menuOptions();
            });

        });
};
// update selected employee 
function updateRole() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "employee_id",
                message: "Which employee is being updated? Please enter ID."
            },
            {
                type: "rawlist",
                name: "roleUpdate",
                message: "What is the employees new role?",
                choices:
                [
                    {
                        value: 1,
                        name: 'Mortgage Compliance Manager',
                    },
                    {
                        value: 2,
                        name: 'Loan Servicing Specialist',
                    },
                    {
                        value: 3,
                        name: 'Quality Administrator',
                    },
                    {
                        value: 4,
                        name: 'Escalation Representative',
                    },
                    {
                        value: 5,
                        name: 'Escalation Manager',
                    },
                    {
                        value: 6,
                        name: 'Insurance Manager',
                    },
                    {
                        value: 7,
                        name: 'Claims Adjuster',
                    },
                    {
                        value: 8,
                        name: 'Underwriter',
                    },
                    {
                        value: 9,
                        name: 'Human Resource Manager',
                    },
                    {
                        value: 10,
                        name: 'Employment Specialist',
                    },
                    {
                        value: 11,
                        name: 'IT Manager',
                    },
                    {
                        value: 12,
                        name: 'Software Developer',
                    },
                    {
                        value: 13,
                        name: 'IT Support Specialist',
                    },
                 
             
        ,],

            },
        ])
        .then(function (data) {
            connection.query("UPDATE employee SET role_id = ? WHERE id = ?",
                [data.roleUpdate, data.employee_id],
                function (err, res) {
                    if (err) throw err;
                    console.table(res);
                    menuOptions();
                }
            );
        });
};

menuOptions();