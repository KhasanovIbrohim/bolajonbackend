SELECT * FROM branch;

SELECT * FROM users;

SELECT * FROM staff;

SELECT * FROM patients;

SELECT * FROM services;

SELECT * FROM schedule;

SELECT * FROM medecines;

SELECT * FROM daily_patients;

SELECT * FROM daily_services;

INSERT INTO branch VALUES('XXXX-XXXX-XXXX-XXXX', 'Name', 'XX:XX - XX:XX', true);

INSERT INTO users VALUES('XXXX-XXXX-XXXX-XXXX', 'Name', 'Surname', 'Phone', crypt('Password', gen_salt('bf')));

INSERT INTO staff VALUES('XXXX-XXXX-XXXX-XXXX', 'Name', 'Secondname', 'Phone', 'Password', 'Status', 'XXXX-XXXX-XXXX-XXXX'); 

INSERT INTO patients VALUES('XXXX-XXXX-XXXX-XXXX', 'Name', 'Secondname', 'Lastname', 'Phone', true, 'Home', 100);

INSERT INTO services VALUES('XXXX-XXXX-XXXX-XXXX', 'Name', 100000);

INSERT INTO schedule VALUES('XXXX-XXXX-XXXX-XXXX', 'Time', 'Task', 'Status');

INSERT INTO medecines VALUES('XXXX-XXXX-XXXX-XXXX', 'Name', 1000000, 1000);

INSERT INTO daily_services VALUES('2023-06-09 11:43:38.836169', 'XXXX-1234-XXXX-4321', 'WAITING', 'Staff', 'service_patient');

INSERT INTO daily_patients VALUES('2023-06-09 11:43:38.836169', 'XXXX-1234-XXXX-4321', 'WAITING');

UPDATE branch SET branch_name = $1 AND working_time = $2
  AND isOpen = true AND updated_time = now() WHERE branch_id = $3;

UPDATE users SET user_name = $1 AND user_secondname = $2 AND user_phone = $3
  AND user_password = crypt($4, gen_salt('bf')) AND updated_time = now() 
  WHERE user_id = $5;

UPDATE staff SET staff_name = $1 AND staff_secondname = $2 AND staff_phone = $3
  AND staff_password = crypt($4, gen_salt('bf')) AND branch = $5 AND updated_time = now() WHERE staff_id = $6;

UPDATE patients SET patient_name = $1 AND patient_surname = $2 AND patient_lastname = $3
  AND patient_phone = $4 AND patient_home = $5 AND patient_age = $6 AND updated_time = now() WHERE patient_id = $7;

UPDATE services SET service_name = $1 AND service_price = $2 AND updated_time = now() WHERE service_id = $3;

UPDATE schedule SET schedule_time = $1 AND schedule_task = $2 AND schedule_status = $3 AND updated_time = now() WHERE schedule_id = $4;

UPDATE medecines SET medecine_name = $1 AND medecine_price = $2 AND medecine_count = $3 AND updated_time = now() WHERE medecine_id = $4;

-- Login
SELECT u.user_id as userId, s.staff_status as userStatus, s.branch FROM users u JOIN staff s 
ON u.user_id = s.staff_user WHERE user_phone = '+998972658001' AND user_password = crypt('0777', user_password);

SELECT staff_id as token, staff_name as name, staff_secondname as surname, staff_status as status, branch as branch FROM staff 
WHERE user_phone = $1 AND user_password = crypt($2, user_password) AND isActive = true;

-- Get monthly service
SELECT *
FROM daily_services
WHERE statistics_of >= '2023-06-01'::timestamp
  AND statistics_of < '2023-07-01'::timestamp;

-- Get monthly money
SELECT SUM(s.service_price) as overall, '2023-06-01' as from, '2023-07-01' as to, AGE('2023-07-01', '2023-06-01') as time FROM daily_services d JOIN services s ON d.statistics_service = s.service_id WHERE d.statistics_of >= '2023-06-01'::timestamp
  AND d.statistics_of < '2023-07-01'::timestamp;

-- Get patients of month
SELECT *
FROM daily_patients
WHERE statistics_of >= '2023-06-01'::timestamp
  AND statistics_of < '2023-07-01'::timestamp;

INSERT INTO daily_services VALUES('2023-06-09 11:43:38.836169', 'XXXX-1234-XXXX-4321', 'WAITING', 'Staff', 'service_patient');


INSERT INTO patients(patient_id, patient_name, patient_surname, patient_lastname, patient_phone, patient_gender, patient_home, patient_age, is_active)
VALUES('XXXX-1234-XXXX-4321', 'Tester', '1', 'Test', '+998990009090', true, 'Kokcha', 17, true);