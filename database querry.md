use formmaster;

CREATE TABLE IF NOT EXISTS countries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL);
        
INSERT INTO countries (name)
	VALUES ('India'), ('USA'), ('Canada'), ('Australia');
    
    select * from countries;

        
CREATE TABLE IF NOT EXISTS states (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        countryId INT NOT NULL,
        FOREIGN KEY (countryId) REFERENCES countries(id) ON DELETE CASCADE
      );
      
INSERT INTO states (name, countryId) VALUES
('Maharashtra', 1),
('Karnataka', 1),
('California', 2),
('Texas', 2),
('Ontario', 3),
('British Columbia', 3),
('New South Wales', 4),
('Victoria', 4);

select * from states;


CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  gender ENUM('Male','Female') NOT NULL,
  department VARCHAR(100) NOT NULL,
  countryId INT NOT NULL,
  stateId INT NOT NULL,
  address VARCHAR(255),
  profileImage VARCHAR(255),
  password VARCHAR(255),
  role ENUM('admin', 'user') DEFAULT 'user',
  FOREIGN KEY (countryId) REFERENCES countries(id) ON DELETE CASCADE,
  FOREIGN KEY (stateId) REFERENCES states(id) ON DELETE CASCADE
);

INSERT INTO users (name, gender, department, countryId, stateId, address, profileImage, password, role)
VALUES
('Pranav Kewate', 'Male', 'IT', 1, 1, 'Nagpur', 'uploads/pranav.jpg', 'pass123', 'admin'),
('Riya Sharma', 'Female', 'HR', 1, 2, 'Bangalore', 'uploads/riya.jpg', 'pass456', 'user'),
('Ankur Malviya', 'Male', 'Sales', 2, 3, 'Los Angeles', 'uploads/ankur.jpg', 'pass789', 'user'),
('Sneha Patil', 'Female', 'Marketing', 2, 4, 'Houston', 'uploads/sneha.jpg', 'pass321', 'user'),
('Aaditya Joshi', 'Male', 'Finance', 1, 2, 'Pune', 'uploads/aaditya.jpg', 'pass654', 'admin'),
('Nikita Rao', 'Female', 'IT', 3, 5, 'Toronto', 'uploads/nikita.jpg', 'pass987', 'user'),
('Rahul Singh', 'Male', 'Sales', 3, 6, 'Vancouver', 'uploads/rahul.jpg', 'pass111', 'user'),
('Pooja Kulkarni', 'Female', 'HR', 1, 1, 'Mumbai', 'uploads/pooja.jpg', 'pass222', 'user'),
('Vikas Yadav', 'Male', 'Marketing', 4, 7, 'Sydney', 'uploads/vikas.jpg', 'pass333', 'user'),
('Aisha Khan', 'Female', 'IT', 4, 8, 'Melbourne', 'uploads/aisha.jpg', 'pass444', 'admin');
INSERT INTO users (name, gender, department, countryId, stateId, address, profileImage, password, role)
VALUES
('Aniket Mishra', 'Male', 'Finance', 1, 2, 'Pune', 'uploads/aniket.jpg', 'pass555', 'user'),
('Shreya Ghosh', 'Female', 'Sales', 1, 1, 'Nagpur', 'uploads/shreya.jpg', 'pass666', 'user'),
('Mohit Sharma', 'Male', 'Marketing', 2, 3, 'Los Angeles', 'uploads/mohit.jpg', 'pass777', 'user'),
('Priya Verma', 'Female', 'HR', 2, 4, 'Houston', 'uploads/priya.jpg', 'pass888', 'user'),
('Kunal Jain', 'Male', 'IT', 3, 5, 'Toronto', 'uploads/kunal.jpg', 'pass999', 'admin'),
('Meera Desai', 'Female', 'Finance', 3, 6, 'Vancouver', 'uploads/meera.jpg', 'pass000', 'user'),
('Yash Patil', 'Male', 'Sales', 4, 7, 'Sydney', 'uploads/yash.jpg', 'pass112', 'user'),
('Ananya Gupta', 'Female', 'IT', 4, 8, 'Melbourne', 'uploads/ananya.jpg', 'pass113', 'user'),
('Deepak Tiwari', 'Male', 'Finance', 1, 1, 'Mumbai', 'uploads/deepak.jpg', 'pass114', 'user'),
('Snehal Joshi', 'Female', 'HR', 3, 5, 'Toronto', 'uploads/snehal.jpg', 'pass115', 'admin');

select * from users;

 SELECT 
        u.id, u.name, u.gender, u.department, u.address, u.profileImage, u.createdAt,
        c.name AS countryName,u.role,
        s.name AS stateName
      FROM users u
      JOIN countries c ON u.countryId = c.id
      JOIN states s ON u.stateId = s.id;
      
      ALTER TABLE users ADD COLUMN password VARCHAR(255) NOT NULL;
      
      ALTER TABLE users MODIFY password VARCHAR(255) NULL;
      
      ALTER TABLE users ADD role ENUM('admin', 'user') DEFAULT 'user';
      
      delete from users where id =2;
      
      truncate table users;
      
      SELECT id, name, role FROM users;
      
      UPDATE users SET role = 'admin' WHERE id = 1;
      
      SELECT * FROM users LIMIT 10 OFFSET 0;  -- page 1
      
  select * from users    
WHERE name LIKE '%%'
LIMIT 5 OFFSET 3;

SELECT * FROM states WHERE countryId = 1;

delete from states where id in (9,10,17,18);
truncate table states;
drop table users;
select * from users;
SET SQL_SAFE_UPDATES = 1;

DELETE FROM users;
delete from countries;




