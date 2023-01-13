USE tracker_db;

INSERT INTO department(name)
VALUES ( "Mortgage"),
       ( "Customer Service"),
       ( "Insurance"),
       ( "Human Resources"),
       ( "Technology Connection");

INSERT INTO role(title, salary, department_id)
VALUES ( "Mortgage Compliance Manager", 70000, 1),
       ( "Loan Servicing Specialist", 32000, 1),
       ( "Quality Administrator", 45000, 1),
       ( "Escalation Representative", 30000, 2),
       ( "Escalation Manager", 60000, 2),
       ( "Insurance Manager", 65000, 3),
       ( "Claims Adjuster", 49000, 3),
       ( "Underwriter", 53000, 3),
       ( "Human Resource Manager", 65000, 4),
       ( "Employment Specialist", 40000, 4),
       ( "IT Manager", 150000, 5),
       ( "Software Developer", 120000, 5),
       ( "IT Support Specialist", 89000, 5);
   


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ( "John", "Smith", 1, 1),
       ( "Vanessa", "Mendez", 3, 1),
       ( "Megan", "Fox", 2, 1),
       ( "Tom", "Cruise", 5, 4),
       ( "Steve", "Harvey", 4, 4),
       ( "Rudy", "Garza", 3, Null),
       ( "Klarissa", "Luna", 9, 7),
       ( "George", "Lopez", 10, 9),
       ( "Nicholas", "Rios", 11, 9),
       ( "Michael", "Jordan", 13, 9);

