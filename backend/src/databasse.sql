CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP DEFAULT now()
);

-- Employees table
CREATE TABLE IF NOT EXISTS employees (
  employee_id SERIAL PRIMARY KEY,
  employee_number TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  dob DATE,
  nic TEXT,
  address TEXT,
  role TEXT NOT NULL,
  designation TEXT,
  tax TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  project_id SERIAL PRIMARY KEY,
  projects_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  description TEXT,
  initial_cost_budget NUMERIC NOT NULL,
  extra_budget_allocation NUMERIC NOT NULL,
  payment_type TEXT NOT NULL,
  status TEXT NOT NULL
);

