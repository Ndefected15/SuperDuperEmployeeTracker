INSERT INTO department (name)
VALUES 
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
values 
('Mike', 'Michaelson', 1, 2),
('Jeff', 'Jefferson', 2, 3),
('Sam', 'Samuelson', 3, 4),
('Christina', 'Christinalson', 4, 5)
('Stacy', 'Stacelson', 5, 6),
('Hannah', 'Hamburger', 6, 7);