/*
  # Little Steps Preschool Portal — Initial Schema

  ## Overview
  Creates all core tables for the preschool management system.

  ## New Tables

  1. **students**
     - id (uuid, pk)
     - name (text)
     - age (integer)
     - program (text)
     - guardian_name (text)
     - guardian_phone (text)
     - guardian_email (text)
     - enrollment_date (date)
     - status (text: active | inactive)
     - created_at (timestamptz)

  2. **teachers**
     - id (uuid, pk)
     - name (text)
     - role (text)
     - speciality (text)
     - email (text, unique)
     - phone (text)
     - experience (integer)
     - status (text: active | on_leave)
     - created_at (timestamptz)

  3. **events**
     - id (uuid, pk)
     - title (text)
     - description (text)
     - date (date)
     - time (text)
     - location (text)
     - type (text)
     - created_at (timestamptz)

  4. **admissions**
     - id (uuid, pk)
     - child_name (text)
     - child_age (integer)
     - program (text)
     - parent_name (text)
     - parent_email (text)
     - parent_phone (text)
     - message (text)
     - status (text: pending | approved | rejected)
     - created_at (timestamptz)

  5. **contacts**
     - id (uuid, pk)
     - name (text)
     - email (text)
     - phone (text, nullable)
     - subject (text)
     - message (text)
     - child_age (text, nullable)
     - created_at (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Authenticated users can read all records
  - Authenticated users can insert/update/delete records
  - Anyone can insert into contacts and admissions (public forms)
  - Anyone can read events (public calendar)
*/

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  age integer NOT NULL DEFAULT 3,
  program text NOT NULL DEFAULT 'Nursery Stars',
  guardian_name text NOT NULL DEFAULT '',
  guardian_phone text NOT NULL DEFAULT '',
  guardian_email text NOT NULL DEFAULT '',
  enrollment_date date NOT NULL DEFAULT CURRENT_DATE,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE students ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view students"
  ON students FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert students"
  ON students FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update students"
  ON students FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete students"
  ON students FOR DELETE
  TO authenticated
  USING (true);

-- Teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL DEFAULT '',
  speciality text NOT NULL DEFAULT '',
  email text UNIQUE NOT NULL,
  phone text NOT NULL DEFAULT '',
  experience integer NOT NULL DEFAULT 1,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view teachers"
  ON teachers FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert teachers"
  ON teachers FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update teachers"
  ON teachers FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete teachers"
  ON teachers FOR DELETE
  TO authenticated
  USING (true);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  date date NOT NULL,
  time text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'Event',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

-- Admissions table
CREATE TABLE IF NOT EXISTS admissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  child_name text NOT NULL,
  child_age integer NOT NULL DEFAULT 3,
  program text NOT NULL DEFAULT '',
  parent_name text NOT NULL,
  parent_email text NOT NULL,
  parent_phone text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit admissions"
  ON admissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view admissions"
  ON admissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update admissions"
  ON admissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete admissions"
  ON admissions FOR DELETE
  TO authenticated
  USING (true);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text NOT NULL DEFAULT 'General Inquiry',
  message text NOT NULL,
  child_age text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contacts FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (true);
