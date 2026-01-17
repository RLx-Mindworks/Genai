```sql
-- db_schema.sql

-- Create the Users table
CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'viewer') NOT NULL
);

-- Create the Projects table
CREATE TABLE Projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INT NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES Users(id)
);

-- Create the Tasks table
CREATE TABLE Tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    status ENUM('todo', 'in_progress', 'done') NOT NULL,
    project_id INT NOT NULL,
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

-- Add indexes for foreign keys
CREATE INDEX idx_projects_owner_id ON Projects (owner_id);
CREATE INDEX idx_tasks_project_id ON Tasks (project_id);
```