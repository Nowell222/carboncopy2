-- ============================================
-- CARBON COPY - COMPLETE DATABASE SETUP
-- ============================================
-- Run this script to create all tables and seed initial data
-- Usage: psql -U postgres -d carbon_copy -f scripts/complete-database-setup.sql

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS sage_conversations CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS smartwatch_activities CASCADE;
DROP TABLE IF EXISTS emissions_summary CASCADE;
DROP TABLE IF EXISTS scheduled_travels CASCADE;
DROP TABLE IF EXISTS travel_logs CASCADE;
DROP TABLE IF EXISTS user_settings CASCADE;
DROP TABLE IF EXISTS user_profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- 1. USERS TABLE
-- ============================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);

-- ============================================
-- 2. USER PROFILES TABLE
-- ============================================
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  age INTEGER,
  sex VARCHAR(20),
  birthday DATE,
  avatar_url TEXT,
  travel_frequency VARCHAR(50),
  travel_reason VARCHAR(100),
  travel_distance VARCHAR(50),
  preferred_mode VARCHAR(50),
  actively_reducing BOOLEAN DEFAULT false,
  traveler_type VARCHAR(50) DEFAULT 'Occasional Explorer',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_user_profiles_user_id ON user_profiles(user_id);

-- ============================================
-- 3. TRAVEL LOGS TABLE
-- ============================================
CREATE TABLE travel_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  location VARCHAR(255) NOT NULL,
  start_point VARCHAR(255),
  end_point VARCHAR(255),
  travel_date DATE NOT NULL,
  mode_outbound VARCHAR(50) NOT NULL,
  mode_return VARCHAR(50),
  distance_outbound DECIMAL(10, 2) NOT NULL,
  distance_return DECIMAL(10, 2),
  total_distance DECIMAL(10, 2) NOT NULL,
  fuel_consumption DECIMAL(10, 2),
  co2_emission DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_travel_logs_user_date ON travel_logs(user_id, travel_date DESC);
CREATE INDEX idx_travel_logs_date ON travel_logs(travel_date DESC);

-- ============================================
-- 4. SCHEDULED TRAVELS TABLE
-- ============================================
CREATE TABLE scheduled_travels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  location VARCHAR(255) NOT NULL,
  start_point VARCHAR(255),
  end_point VARCHAR(255),
  scheduled_date DATE NOT NULL,
  mode_outbound VARCHAR(50) NOT NULL,
  mode_return VARCHAR(50),
  distance_outbound DECIMAL(10, 2) NOT NULL,
  distance_return DECIMAL(10, 2),
  total_distance DECIMAL(10, 2) NOT NULL,
  fuel_consumption DECIMAL(10, 2),
  expected_co2_emission DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_scheduled_travels_user_date ON scheduled_travels(user_id, scheduled_date);
CREATE INDEX idx_scheduled_travels_status ON scheduled_travels(status);

-- ============================================
-- 5. EMISSIONS SUMMARY TABLE
-- ============================================
CREATE TABLE emissions_summary (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  period_type VARCHAR(20) NOT NULL,
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  total_trips INTEGER DEFAULT 0,
  total_distance DECIMAL(10, 2) DEFAULT 0,
  total_emissions DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, period_type, period_start)
);

CREATE INDEX idx_emissions_summary_user_period ON emissions_summary(user_id, period_type, period_start DESC);

-- ============================================
-- 6. SMARTWATCH ACTIVITIES TABLE
-- ============================================
CREATE TABLE smartwatch_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  activity_type VARCHAR(50) NOT NULL,
  activity_date DATE NOT NULL,
  distance DECIMAL(10, 2) NOT NULL,
  steps INTEGER,
  duration INTEGER,
  co2_saved DECIMAL(10, 2) DEFAULT 0,
  synced_at TIMESTAMP DEFAULT NOW(),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_smartwatch_activities_user_date ON smartwatch_activities(user_id, activity_date DESC);

-- ============================================
-- 7. NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  icon VARCHAR(50),
  is_read BOOLEAN DEFAULT false,
  action_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_read ON notifications(user_id, is_read, created_at DESC);

-- ============================================
-- 8. SAGE AI CONVERSATIONS TABLE
-- ============================================
CREATE TABLE sage_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sender VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_sage_conversations_user ON sage_conversations(user_id, created_at);

-- ============================================
-- 9. USER SETTINGS TABLE
-- ============================================
CREATE TABLE user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  notifications_enabled BOOLEAN DEFAULT true,
  email_notifications BOOLEAN DEFAULT true,
  smartwatch_sync_enabled BOOLEAN DEFAULT false,
  data_sharing BOOLEAN DEFAULT false,
  theme VARCHAR(20) DEFAULT 'light',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id)
);

CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);

-- ============================================
-- SEED DATA
-- ============================================

-- Insert test user
INSERT INTO users (id, email, username, password_hash, created_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'test@carboncopy.com', 'testuser', '$2a$10$abcdefghijklmnopqrstuvwxyz123456', NOW());

-- Insert user profile
INSERT INTO user_profiles (user_id, first_name, last_name, age, sex, birthday, travel_frequency, travel_reason, travel_distance, preferred_mode, actively_reducing, traveler_type)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Christian James', 'Aguila', 25, 'Male', '1999-03-15', 'Weekly', 'Work', '10-50 km', 'Bicycle', true, 'Occasional Explorer');

-- Insert travel logs (past trips)
INSERT INTO travel_logs (user_id, location, start_point, end_point, travel_date, mode_outbound, mode_return, distance_outbound, distance_return, total_distance, fuel_consumption, co2_emission)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Laiya, San Juan, Batangas', 'Manila', 'Laiya Beach', '2025-04-16', 'Tricycle, Jeepney', 'Tricycle', 25.00, 25.00, 50.00, 5.0, 6.00),
  ('550e8400-e29b-41d4-a716-446655440000', 'Putingbuhangin, San Juan, Batangas', 'Muzon, San Juan', 'Putingkahoy, Rosario', '2025-04-01', 'Bicycle', 'Bicycle', 1.08, 1.08, 2.16, 0, 0.00),
  ('550e8400-e29b-41d4-a716-446655440000', 'Taal Vista Hotel, Tagaytay', 'Manila', 'Tagaytay', '2025-03-20', 'Car', 'Car', 30.00, 30.00, 60.00, 6.0, 7.20),
  ('550e8400-e29b-41d4-a716-446655440000', 'SM Mall of Asia, Pasay', 'Quezon City', 'Pasay', '2025-03-05', 'Bus', 'Bus', 15.00, 15.00, 30.00, 0, 1.50);

-- Insert scheduled travels (upcoming trips)
INSERT INTO scheduled_travels (user_id, location, start_point, end_point, scheduled_date, mode_outbound, mode_return, distance_outbound, distance_return, total_distance, fuel_consumption, expected_co2_emission, status)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Balai Ising Resort', 'San Juan', 'Balai Ising', '2025-05-02', 'Bicycle', 'Bicycle', 0.80, 0.80, 1.60, 0, 0.00, 'scheduled'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Lobo, Batangas', 'San Juan', 'Lobo', '2025-08-18', 'Motorcycle', 'Motorcycle', 25.00, 25.00, 50.00, 3.0, 4.00, 'scheduled');

-- Insert emissions summary
INSERT INTO emissions_summary (user_id, period_type, period_start, period_end, total_trips, total_distance, total_emissions)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'month', '2025-03-01', '2025-03-31', 2, 90.00, 8.70),
  ('550e8400-e29b-41d4-a716-446655440000', 'month', '2025-04-01', '2025-04-30', 2, 52.16, 6.00);

-- Insert smartwatch activities
INSERT INTO smartwatch_activities (user_id, activity_type, activity_date, distance, steps, duration, co2_saved)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Walking', '2025-04-12', 7.70, 10000, 90, 1.85),
  ('550e8400-e29b-41d4-a716-446655440000', 'Cycling', '2025-04-12', 5.00, 0, 25, 0.60);

-- Insert notifications
INSERT INTO notifications (user_id, title, message, type, icon, is_read, action_url)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'S.A.G.E just finished reviewing your carbon footprint', 'Check out personalized recommendations for reducing your emissions', 'info', 'leaf', false, '/sage-ai'),
  ('550e8400-e29b-41d4-a716-446655440000', 'You logged a May 2 travel to Balai Ising for a birthday celebration', 'Great job tracking your trips!', 'success', 'check', false, '/history'),
  ('550e8400-e29b-41d4-a716-446655440000', 'We regret to inform you that the smartwatch feature is currently under maintenance', 'We are working to restore it soon', 'warning', 'alert', false, '/profile/smartwatch');

-- Insert user settings
INSERT INTO user_settings (user_id, notifications_enabled, email_notifications, smartwatch_sync_enabled, data_sharing, theme)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', true, true, false, false, 'light');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Count records in each table
SELECT 'users' as table_name, COUNT(*) as record_count FROM users
UNION ALL
SELECT 'user_profiles', COUNT(*) FROM user_profiles
UNION ALL
SELECT 'travel_logs', COUNT(*) FROM travel_logs
UNION ALL
SELECT 'scheduled_travels', COUNT(*) FROM scheduled_travels
UNION ALL
SELECT 'emissions_summary', COUNT(*) FROM emissions_summary
UNION ALL
SELECT 'smartwatch_activities', COUNT(*) FROM smartwatch_activities
UNION ALL
SELECT 'notifications', COUNT(*) FROM notifications
UNION ALL
SELECT 'sage_conversations', COUNT(*) FROM sage_conversations
UNION ALL
SELECT 'user_settings', COUNT(*) FROM user_settings;

-- Show sample data
SELECT 'Sample User:' as info;
SELECT email, username, first_name, last_name FROM users u
JOIN user_profiles up ON u.id = up.user_id;

SELECT 'Sample Travel Logs:' as info;
SELECT location, travel_date, total_distance, co2_emission FROM travel_logs ORDER BY travel_date DESC LIMIT 3;

SELECT 'Sample Scheduled Travels:' as info;
SELECT location, scheduled_date, expected_co2_emission FROM scheduled_travels ORDER BY scheduled_date LIMIT 2;

-- Success message
SELECT '✅ Database setup complete! All tables created and seeded with test data.' as status;
