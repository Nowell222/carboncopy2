-- ============================================
-- CARBON COPY - DATABASE INITIALIZATION
-- ============================================
-- This script creates all necessary tables for the Carbon Copy application
-- Run this script first to set up your database

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
-- SUCCESS MESSAGE
-- ============================================
SELECT '✅ Database tables created successfully!' as status;
