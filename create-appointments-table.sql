-- Create appointments table for custom booking system
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  appointment_id VARCHAR(255) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  customer_email VARCHAR(255),
  appointment_time TIMESTAMP WITH TIME ZONE NOT NULL,
  vehicle_interest VARCHAR(255),
  notes TEXT,
  status VARCHAR(50) DEFAULT 'scheduled',
  source VARCHAR(100) DEFAULT 'AI Assistant',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_appointments_time ON appointments(appointment_time);
CREATE INDEX IF NOT EXISTS idx_appointments_phone ON appointments(customer_phone);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- Enable Row Level Security (RLS)
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for authenticated users
CREATE POLICY "Enable all operations for authenticated users" ON appointments
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policy to allow read access for anon users (for API access)
CREATE POLICY "Enable read access for anon users" ON appointments
  FOR SELECT USING (true);

-- Create policy to allow insert for anon users (for API access)
CREATE POLICY "Enable insert for anon users" ON appointments
  FOR INSERT WITH CHECK (true);

-- Grant permissions
GRANT ALL ON appointments TO authenticated;
GRANT SELECT, INSERT ON appointments TO anon;
GRANT USAGE, SELECT ON SEQUENCE appointments_id_seq TO anon;
GRANT USAGE, SELECT ON SEQUENCE appointments_id_seq TO authenticated;
