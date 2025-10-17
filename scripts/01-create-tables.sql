-- Carbon Copy Database Schema
-- Run this script to create all necessary tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(100) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  last_login TIMESTAMP
);

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
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

-- Travel logs table
CREATE TABLE IF NOT EXISTS travel_logs (
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

CREATE INDEX IF NOT EXISTS idx_travel_logs_user_date ON travel_logs(user_id, travel_date DESC);

-- Scheduled travels table
CREATE TABLE IF NOT EXISTS scheduled_travels (
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

CREATE INDEX IF NOT EXISTS idx_scheduled_travels_user_date ON scheduled_travels(user_id, scheduled_date);

-- Emissions summary table
CREATE TABLE IF NOT EXISTS emissions_summary (
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

CREATE INDEX IF NOT EXISTS idx_emissions_summary_user_period ON emissions_summary(user_id, period_type, period_start DESC);

-- Smartwatch activities table
CREATE TABLE IF NOT EXISTS smartwatch_activities (
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

CREATE INDEX IF NOT EXISTS idx_smartwatch_activities_user_date ON smartwatch_activities(user_id, activity_date DESC);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
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

CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON notifications(user_id, is_read, created_at DESC);

-- SAGE AI conversations table
CREATE TABLE IF NOT EXISTS sage_conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sender VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sage_conversations_user ON sage_conversations(user_id, created_at);

-- User settings table
CREATE TABLE IF NOT EXISTS user_settings (
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
