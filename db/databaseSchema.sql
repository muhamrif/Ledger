DROP DATABASE IF EXISTS ledger;
CREATE DATABASE IF NOT EXISTS ledger;

USE ledger;

CREATE TABLE users (
    user_id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE profiles (
    user_id INT NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(200) NOT NULL,
    address VARCHAR(200) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS transactions (
	transaction_id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT,
    transaction_date DATE,
    transaction_time TIME,
    transaction_description VARCHAR(255),
    vendor_name VARCHAR(255),
    amount DECIMAL(10, 2)
);

/*  INSERT Users  */
INSERT INTO users (username, hashed_password, role) 
VALUES  ('user','$2a$10$NkufUPF3V8dEPSZeo1fzHe9ScBu.LOay9S3N32M84yuUM2OJYEJ/.','ROLE_USER'),
        ('admin','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_ADMIN'),
        ('george','$2a$10$lfQi9jSfhZZhfS6/Kyzv3u3418IgnWXWDQDk7IbcwlCFPgxg9Iud2','ROLE_USER');

/* INSERT Profiles */
INSERT INTO profiles (user_id, first_name, last_name, phone, email, address, city, state, zip)
VALUES  (1, 'Joe', 'Joesephus', '800-555-1234', 'joejoesephus@email.com', '789 Oak Avenue', 'Dallas', 'TX', '75051'),
        (2, 'Adam', 'Admamson', '800-555-1212', 'aaadamson@email.com', '456 Elm Street','Dallas','TX','75052'),
        (3, 'George', 'Jetson', '800-555-9876', 'george.jetson@email.com', '123 Birch Parkway','Dallas','TX','75051')     ;
INSERT INTO transactions (user_id, transaction_date, transaction_time, transaction_description, vendor_name, amount)
VALUES
    ('3','2021-07-15', '12:45:23', 'Grocery Shopping', 'FreshMart', 125.45),
    ('3','2005-11-03', '09:15:32', 'Gasoline', 'PetroCo', 55.60),
    ('3','2018-02-19', '18:30:10', 'Dinner with Friends', 'The Bistro', 89.75),
    ('3','1999-08-27', '15:22:56', 'Electronics Purchase', 'Gadget World', -799.99),
    ('3','2015-03-08', '03:11:05', 'Movie Tickets', 'Cinemaplex', 27.50),
    ('3','1978-06-12', '14:40:17', 'Clothing Shopping', 'Fashion Zone', -49.99),
    ('3','2003-04-29', '08:59:44', 'Coffee and Pastry', 'JavaCafe', 7.80),
    ('3','2012-09-14', '20:37:12', 'Home Improvement', 'BuildItAll', -349.99),
    ('3','1987-12-22', '11:55:30', 'Bookstore Purchase', 'ReadItAll', 32.99),
    ('3','2010-05-06', '07:20:18', 'Gym Membership Renewal', 'FitnessLife', -89.00),
    ('3','2007-01-17', '16:03:27', 'Lunch with Colleagues', 'TastyBites', 28.75),
    ('3','1995-10-01', '22:50:36', 'Car Maintenance', 'AutoCare', -175.25),
    ('3','2019-04-02', '13:29:41', 'Concert Tickets', 'MusicArena', 95.00),
    ('3','2002-08-09', '05:16:54', 'Home Internet', 'ConnectNet', -69.99),
    ('3','2014-12-11', '19:45:09', 'Movie Night', 'StarCinema', 18.50),
    ('3','1980-07-07', '10:08:02', 'Electronics Purchase', 'GizmoTech', -299.95),
    ('3','2000-06-23', '02:37:48', 'Dinner Date', 'La Trattoria', 68.75),
    ('3','2009-03-15', '21:14:31', 'Clothing Shopping', 'TrendyStyles', -120.00),
    ('3','1992-01-25', '08:23:20', 'Groceries', 'SuperMart', 43.25),
    ('3','2016-10-30', '14:59:37', 'Movie Tickets', 'Cinemaplex', 14.50),
    ('3','1997-09-05', '17:50:07', 'Coffee and Pastry', 'CafeMocha', 5.20),
    ('3','1985-04-14', '03:11:45', 'Home Improvement', 'HomeDepot', -499.99),
    ('3','2004-05-18', '22:05:56', 'Lunch with Colleagues', 'FoodZone', 36.75),
    ('3','2011-11-26', '10:42:28', 'Concert Tickets', 'LiveMusicHall', 75.00),
    ('3','1973-03-19', '18:30:05', 'Gasoline', 'QuickFuel', 40.25),
    ('3','2017-08-07', '07:08:54', 'Dinner with Friends', 'The Grill', 62.95),
    ('3','1991-02-13', '13:27:02', 'Gym Membership Renewal', 'FitLife', -75.00),
    ('3','2006-06-02', '16:20:11', 'Bookstore Purchase', 'BookHaven', 21.99),
    ('3','1989-11-10', '08:41:16', 'Movie Night', 'CineMagic', 16.50),
    ('3','1996-12-04', '02:10:29', 'Car Maintenance', 'AutoCare', -210.75),
    ('3','2013-07-01', '19:59:03', 'Home Internet', 'WebConnect', -79.99),
    ('3','2018-03-29', '21:40:38', 'Electronics Purchase', 'GizmoWorld', -149.99),
    ('3','2008-04-14', '15:15:50', 'Groceries', 'MegaMart', 79.10),
    ('3','1983-09-20', '04:28:22', 'Dinner Date', 'BellaCucina', 42.75),
    ('3','1998-08-22', '09:55:18', 'Coffee and Pastry', 'CafeBella', 6.80),
    ('3','2015-06-16', '23:37:14', 'Clothing Shopping', 'TrendyWear', -99.99),
    ('3','2012-12-30', '12:48:32', 'Lunch with Colleagues', 'YummyBites', 32.50),
    ('3','1975-05-03', '17:09:27', 'Gasoline', 'QuickFuel', 34.25),
    ('3','1990-07-26', '07:22:40', 'Movie Tickets', 'CineWorld', 14.50),
    ('3','2001-10-10', '19:15:07', 'Home Improvement', 'BuildRight', -199.99),
    ('3','2016-02-05', '13:30:55', 'Concert Tickets', 'MusicHall', 89.00),
    ('3','1986-08-18', '14:42:10', 'Bookstore Purchase', 'ReadItAll', 28.99),
    ('3','2019-09-09', '05:55:44', 'Gym Membership Renewal', 'FitClub', -79.00),
    ('3','2003-01-22', '16:27:59', 'Home Internet', 'ConnectNet', -59.99),
    ('3','1979-04-28', '08:18:22', 'Dinner with Friends', 'The Bistro', 54.75),
    ('3','2014-04-07', '20:37:45', 'Coffee and Pastry', 'JavaCafe', 9.80),
    ('3','2010-08-01', '12:59:16', 'Clothing Shopping', 'Fashionista', -59.99),
    ('3','2005-02-14', '22:10:30', 'Electronics Purchase', 'GizmoTech', -199.95),
    ('3','1993-03-11', '11:22:05', 'Groceries', 'SuperMart', 58.25);
