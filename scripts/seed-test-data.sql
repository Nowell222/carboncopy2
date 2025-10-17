-- ============================================
-- CARBON COPY - SEED TEST DATA
-- ============================================
-- This script adds sample data for testing
-- Run this after init-database.sql

-- Insert test user (password is 'password123' - properly hashed with bcrypt)
-- Hash generated using bcrypt with 10 rounds
INSERT INTO users (id, email, username, password_hash, created_at)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'test@carboncopy.com', 'testuser', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', NOW())
ON CONFLICT (id) DO NOTHING;

-- Insert user profile
INSERT INTO user_profiles (user_id, first_name, last_name, age, sex, birthday, travel_frequency, travel_reason, travel_distance, preferred_mode, actively_reducing, traveler_type)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Christian James', 'Aguila', 25, 'Male', '1999-03-15', 'Weekly', 'Work', '10-50 km', 'Bicycle', true, 'Occasional Explorer')
ON CONFLICT (user_id) DO NOTHING;

-- Insert travel logs (past trips)
INSERT INTO travel_logs (user_id, location, start_point, end_point, travel_date, mode_outbound, mode_return, distance_outbound, distance_return, total_distance, fuel_consumption, co2_emission)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Laiya, San Juan, Batangas', 'Manila', 'Laiya Beach', '2025-04-16', 'Tricycle, Jeepney', 'Tricycle', 25.00, 25.00, 50.00, 5.0, 6.00),
  ('550e8400-e29b-41d4-a716-446655440000', 'Putingbuhangin, San Juan, Batangas', 'Muzon, San Juan', 'Putingkahoy, Rosario', '2025-04-01', 'Bicycle', 'Bicycle', 1.08, 1.08, 2.16, 0, 0.00),
  ('550e8400-e29b-41d4-a716-446655440000', 'Taal Vista Hotel, Tagaytay', 'Manila', 'Tagaytay', '2025-03-20', 'Car', 'Car', 30.00, 30.00, 60.00, 6.0, 7.20),
  ('550e8400-e29b-41d4-a716-446655440000', 'SM Mall of Asia, Pasay', 'Quezon City', 'Pasay', '2025-03-05', 'Bus', 'Bus', 15.00, 15.00, 30.00, 0, 1.50)
ON CONFLICT DO NOTHING;

-- Insert scheduled travels (upcoming trips)
INSERT INTO scheduled_travels (user_id, location, start_point, end_point, scheduled_date, mode_outbound, mode_return, distance_outbound, distance_return, total_distance, fuel_consumption, expected_co2_emission, status)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Balai Ising Resort', 'San Juan', 'Balai Ising', '2025-05-02', 'Bicycle', 'Bicycle', 0.80, 0.80, 1.60, 0, 0.00, 'scheduled'),
  ('550e8400-e29b-41d4-a716-446655440000', 'Lobo, Batangas', 'San Juan', 'Lobo', '2025-08-18', 'Motorcycle', 'Motorcycle', 25.00, 25.00, 50.00, 3.0, 4.00, 'scheduled')
ON CONFLICT DO NOTHING;

-- Insert emissions summary
INSERT INTO emissions_summary (user_id, period_type, period_start, period_end, total_trips, total_distance, total_emissions)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'month', '2025-03-01', '2025-03-31', 2, 90.00, 8.70),
  ('550e8400-e29b-41d4-a716-446655440000', 'month', '2025-04-01', '2025-04-30', 2, 52.16, 6.00)
ON CONFLICT (user_id, period_type, period_start) DO NOTHING;

-- Insert smartwatch activities
INSERT INTO smartwatch_activities (user_id, activity_type, activity_date, distance, steps, duration, co2_saved)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'Walking', '2025-04-12', 7.70, 10000, 90, 1.85),
  ('550e8400-e29b-41d4-a716-446655440000', 'Cycling', '2025-04-12', 5.00, 0, 25, 0.60)
ON CONFLICT DO NOTHING;

-- Insert notifications
INSERT INTO notifications (user_id, title, message, type, icon, is_read, action_url)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'S.A.G.E just finished reviewing your carbon footprint', 'Check out personalized recommendations for reducing your emissions', 'info', 'leaf', false, '/sage-ai'),
  ('550e8400-e29b-41d4-a716-446655440000', 'You logged a May 2 travel to Balai Ising for a birthday celebration', 'Great job tracking your trips!', 'success', 'check', false, '/history'),
  ('550e8400-e29b-41d4-a716-446655440000', 'We regret to inform you that the smartwatch feature is currently under maintenance', 'We are working to restore it soon', 'warning', 'alert', false, '/profile/smartwatch')
ON CONFLICT DO NOTHING;

-- Insert user settings
INSERT INTO user_settings (user_id, notifications_enabled, email_notifications, smartwatch_sync_enabled, data_sharing, theme)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', true, true, false, false, 'light')
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================
SELECT '✅ Test data seeded successfully!' as status;

-- Show record counts
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
SELECT 'user_settings', COUNT(*) FROM user_settings;
