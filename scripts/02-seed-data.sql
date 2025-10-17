-- Sample seed data for testing
-- Replace the user_id with your actual user ID after creating a user

-- Insert sample user (password is 'password123' hashed with bcrypt)
INSERT INTO users (id, email, username, password_hash) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'user@example.com', 'testuser', '$2a$10$rKvVLZ8Z8Z8Z8Z8Z8Z8Z8OqKvVLZ8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8Z8');

-- Insert user profile
INSERT INTO user_profiles (user_id, first_name, last_name, age, sex, birthday, travel_frequency, travel_reason, preferred_mode, actively_reducing, traveler_type) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Christian James', 'Aguila', 25, 'Male', '1999-01-15', 'Weekly', 'Work', 'Bicycle', true, 'Occasional Explorer');

-- Insert sample travel logs
INSERT INTO travel_logs (user_id, location, start_point, end_point, travel_date, mode_outbound, mode_return, distance_outbound, distance_return, total_distance, co2_emission) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Laiya, San Juan, Batangas', 'Muzon, San Juan', 'Poblacion San Juan', '2025-04-16', 'Tricycle, Jeepney', 'Tricycle', 9, 41, 50, 6.00),
('550e8400-e29b-41d4-a716-446655440000', 'Putingbuhangin, San Juan, Batangas', 'Muzon, San Juan', 'Putingkahoy, Rosario', '2025-04-01', 'Bicycle', 'Bicycle', 0.8, 0.8, 1.6, 0.00),
('550e8400-e29b-41d4-a716-446655440000', 'Manila City', 'San Juan', 'Manila', '2025-03-15', 'Bus', 'Bus', 25, 25, 50, 2.16);

-- Insert scheduled travels
INSERT INTO scheduled_travels (user_id, location, start_point, end_point, scheduled_date, mode_outbound, mode_return, distance_outbound, distance_return, total_distance, expected_co2_emission) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Balai Ising Resort', 'San Juan', 'Balai Ising', '2025-05-02', 'Bicycle', 'Bicycle', 0.8, 0.8, 1.6, 0.00),
('550e8400-e29b-41d4-a716-446655440000', 'Lobo, Batangas', 'San Juan', 'Lobo', '2025-08-18', 'Car', 'Car', 35, 35, 70, 8.40);

-- Insert smartwatch activities
INSERT INTO smartwatch_activities (user_id, activity_type, activity_date, distance, steps, duration, co2_saved) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'Walking', '2025-04-12', 7.7, 10000, 90, 1.85),
('550e8400-e29b-41d4-a716-446655440000', 'Cycling', '2025-04-12', 5, 0, 25, 0.12);

-- Insert notifications
INSERT INTO notifications (user_id, title, message, type, icon) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'S.A.G.E just finished reviewing your carbon footprint', 'Check out your personalized sustainability recommendations!', 'info', '🤖'),
('550e8400-e29b-41d4-a716-446655440000', 'You logged a May 2 travel to Balai Ising for a birthday celebration', 'Great job tracking your trips!', 'success', '🎉'),
('550e8400-e29b-41d4-a716-446655440000', 'We regret to inform you that the smartwatch feature is currently under maintenance', 'We''re working to restore it soon.', 'warning', '⚠️');

-- Insert user settings
INSERT INTO user_settings (user_id) VALUES
('550e8400-e29b-41d4-a716-446655440000');

-- Insert emissions summary
INSERT INTO emissions_summary (user_id, period_type, period_start, period_end, total_trips, total_distance, total_emissions) VALUES
('550e8400-e29b-41d4-a716-446655440000', 'month', '2025-03-01', '2025-03-31', 2, 75, 2.16),
('550e8400-e29b-41d4-a716-446655440000', 'month', '2025-04-01', '2025-04-30', 2, 51.6, 6.16);
