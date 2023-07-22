CREATE TABLE branch (
    branch_id text PRIMARY KEY,
    branch_name VARCHAR(64) not null,
    working_time VARCHAR(64),
    is_open boolean not null,
    is_active boolean not null,
    updated_time TIMESTAMP not null,
    created_date TIMESTAMP not null
);

CREATE TABLE users (
    user_id text PRIMARY KEY,
    user_name VARCHAR(64) not null,
    user_secondname VARCHAR(64) not null,
    user_phone VARCHAR(64) not null,
    user_password VARCHAR(64) not null,
    is_active boolean not null,
    created_date TIMESTAMP not null,
    updated_time TIMESTAMP not null
);

CREATE TABLE staff (
    staff_id text PRIMARY KEY,
    staff_name VARCHAR(64) not null,
    staff_secondname VARCHAR(64) not null,
    staff_phone VARCHAR(64) not null,
    staff_password VARCHAR(64) not null,
    staff_status VARCHAR(64) not null,
    branch text REFERENCES branch(branch_id),
    is_active boolean not null,
    updated_time TIMESTAMP not null,
    created_date TIMESTAMP not null
);

CREATE TABLE patients(
    patient_id text PRIMARY KEY,
    patient_name VARCHAR(64) not null,
    patient_surname VARCHAR(64) not null,
    patient_lastname VARCHAR(64) not null,
    patient_phone VARCHAR(64) not null,
    patient_gender boolean not null,
    patient_home VARCHAR(64) not null,
    patient_age integer not null,
    is_active boolean not null,
    updated_time TIMESTAMP not null,
    created_date TIMESTAMP not null
);

CREATE TABLE services(
    service_id text PRIMARY KEY,
    service_name VARCHAR(64) not null,
    service_price integer not null,
    is_active boolean not null,
    updated_time TIMESTAMP not null,
    created_date TIMESTAMP not null
);

CREATE TABLE schedule(
    schedule_id text PRIMARY KEY,
    schedule_time date not null,
    schedule_staff text REFERENCES staff(staff_id),
    is_active boolean not null,
    updated_time TIMESTAMP not null,
    created_date TIMESTAMP not null
);

CREATE TABLE medecines(
    medecine_id text PRIMARY KEY,
    medecine_name VARCHAR(64) not null,
    medecine_price integer not null,
    medecine_count integer not null,
    is_active boolean not null,
    updated_time TIMESTAMP not null,
    created_date TIMESTAMP not null
);

CREATE TABLE daily_patients(
    statistics_id text PRIMARY KEY,
    statistics_of TIMESTAMP not null,
    statistics_patient text REFERENCES patients(patient_id),
    statistics_status VARCHAR(64) not null,
    is_active boolean not null
);

CREATE TABLE npm run dev
(
    statistics_id text PRIMARY KEY,
    statistics_of TIMESTAMP not null,
    statistics_service text REFERENCES services(service_id),
    statistics_status VARCHAR(64) not null,
    service_staff text REFERENCES staff(staff_id),
    service_patient text REFERENCES patients(patient_id),
    is_active boolean not null
);
