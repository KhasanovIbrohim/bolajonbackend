const { fetch, fetchAll } = require('../../lib/postgres')

const BRANCH = `
    SELECT
        *
    FROM
        branch
`

const USERS = `
    SELECT
        *
    FROM
        users
`

const STAFF = `
    SELECT
        *
    FROM
        staff
`

const PATIENTS = `
    SELECT
        *
    FROM
        patients
`

const SERVICES = `
    SELECT
        *
    FROM
        services
`

const SHEDULE = `
    SELECT
        *
    FROM
        schedule
`
const MEDECINES = `
    SELECT
        *
    FROM
        medecines
`

const DAILY_PATIENTS = `
    SELECT
        *
    FROM
        daily_patients
`

const DAILY_SERVICES = `
    SELECT
        *
    FROM
        daily_services
`

const NEW_BRANCH = `
    INSERT INTO branch(branch_id, branch_name, working_time, is_open, is_active, updated_time, created_date) 
    VALUES($1, $2, $3, $4, $5, now() + INTERVAL '5 hours', now() + INTERVAL '5 hours');
`

const NEW_USERS = `
    INSERT INTO users(user_id, user_name, user_secondname, user_phone, user_password, is_active, updated_time, created_date)
     VALUES($1, $2, $3, $4, crypt($5, gen_salt('bf')), $6, now() + INTERVAL '5 hours', now() + INTERVAL '5 hours');
`

const NEW_STAFF = `
    INSERT INTO staff VALUES($1, $2, $3, $4, crypt($5, gen_salt('bf')), $6, $7, $8, now() + INTERVAL '5 hours', now() + INTERVAL '5 hours')
    RETURNING staff_id as id, true as status; 
`   

const NEW_PATIENTS = `
    INSERT INTO patients(patient_id, patient_name, patient_surname, patient_lastname, patient_phone, patient_gender, patient_home, patient_age, is_active, updated_time, created_date)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, now() + INTERVAL '5 hours', now() + INTERVAL '5 hours');
`

const NEW_SERVICES = `
    INSERT INTO services VALUES($1, $2, $3, $4, now() + INTERVAL '5 hours', now() + INTERVAL '5 hours');
`

const NEW_SHEDULE = `
    INSERT INTO schedule VALUES($1, $2, $3, $4, now() + INTERVAL '5 hours', now() + INTERVAL '5 hours');
`
const NEW_MEDECINES = `
    INSERT INTO medecines VALUES($1, $2, $3, $4, $5, now() + INTERVAL '5 hours', now() + INTERVAL '5 hours');
`

const NEW_DAILY_PATIENTS = `
    INSERT INTO daily_patients(statistics_id, statistics_of, statistics_patient, statistics_status, statistics_branch, is_active) 
    VALUES($1, $2, $3, 'WAITING', $4, $5);
`

const NEW_DAILY_SERVICES = `
    INSERT INTO daily_services(statistics_id, statistics_of, statistics_service, statistics_status, service_staff, service_patient, statistics_branch, is_active) 
    VALUES($1, $2, $3, 'WAITING', $4, $5, $6, $7);
`

const UPDATE_BRANCH = `
    UPDATE branch SET branch_name = $1, working_time = $2, updated_time = now() WHERE branch_id = $3;
`

const UPDATE_USERS = `
    UPDATE users SET user_name = $1, user_secondname = $2, user_phone = $3,
    user_password = crypt($4, gen_salt('bf')), updated_time = now() 
    WHERE user_id = $5;
`

const UPDATE_STAFF = `
    UPDATE staff SET staff_name = $1, staff_secondname = $2, staff_phone = $3,
    staff_password = crypt($4, gen_salt('bf')), branch = $5,
    updated_time = now() WHERE staff_id = $6;
`

const UPDATE_PATIENTS = `
    UPDATE patients SET patient_name = $1, patient_surname = $2,
    patient_lastname = $3, patient_phone = $4, patient_home = $5,
    patient_age = $6, updated_time = now() WHERE patient_id = $7;
`

const UPDATE_SERVICES = `
    UPDATE services SET service_name = $1, service_price = $2,
    updated_time = now() WHERE service_id = $3;
`

const UPDATE_SCHEDULE = `
    UPDATE schedule SET schedule_time = $1, schedule_staff = $2,
    updated_time = now() WHERE schedule_id = $4;
`

const UPDATE_MEDECINES = `
    UPDATE medecines SET medecine_name = $1, medecine_price = $2, medecine_count = $3,
    updated_time = now() WHERE medecine_id = $4;
`

const UPDATE_DAILY_PATIENTS_STATUS = `
    UPDATE daily_patients SET statistics_status = $2 WHERE statistics_id = $1;
`

const UPDATE_DAILY_SERVICE_STATUS = `
    UPDATE daily_services SET statistics_status = $2 WHERE statistics_id = $1;
`

const branch = () => fetchAll(BRANCH)
const users = () => fetchAll(USERS)
const staff = () => fetchAll(STAFF)
const patients = () => fetchAll(PATIENTS)
const services = () => fetchAll(SERVICES)
const schedule = () => fetchAll(SHEDULE)
const medecines = () => fetchAll(MEDECINES)
const daily_patients = () => fetchAll(DAILY_PATIENTS)
const daily_services = () => fetchAll(DAILY_SERVICES)

const new_branch = (id, name, time, isOpen, isActive) => fetchAll(NEW_BRANCH, id, name, time, isOpen, isActive)
const new_users = (id, name, surname, phone, password, isActive) => fetchAll(NEW_USERS, id, name, surname, phone, password, isActive)
const new_staff = (id, name, secondname, phone, password, status, branch, isActive) => fetchAll(NEW_STAFF, id, name, secondname, phone, password, status, branch, isActive)
const new_patients = (id, name, secondname, lastname, phone, gender, home, age, isActive) => fetchAll(NEW_PATIENTS, id, name, secondname, lastname, phone, gender, home, age, isActive)
const new_services = (id, name, price, isActive) => fetchAll(NEW_SERVICES, id, name, price, isActive)
const new_schedule = (id, time, staff, isActive) => fetchAll(NEW_SHEDULE, id, time, staff, isActive)
const new_medecines = (id, name, price, count, isActive) => fetchAll(NEW_MEDECINES, id, name, price, count, isActive)
const new_daily_patients = (id, time, patient, branch, isActive) => fetchAll(NEW_DAILY_PATIENTS, id, time, patient, branch, isActive)
const new_daily_services = (id, time, service, staff, patient, branch, isActive) => fetchAll(NEW_DAILY_SERVICES, id, time, service, staff, patient, branch, isActive)

const update_branch = (name, time, id) => fetchAll(UPDATE_BRANCH, name, time, id)
const update_user = (name, secondname, phone, password, id) => fetchAll(UPDATE_USERS, name, secondname, phone, password, id)
const update_staff = (name, secondname, phone, password, branch, id) => fetchAll(UPDATE_STAFF, name, secondname, phone, password, branch, id)
const update_patient = (name, surname, lastname, phone, home, age, id) => fetchAll(UPDATE_PATIENTS, name, surname, lastname, phone, home, age, id)
const update_service = (name, price, id) => fetchAll(UPDATE_SERVICES, name, price, id)
const update_schedule = (time, task, status, branch, id) => fetchAll(UPDATE_SCHEDULE, time, task, status, branch, id)
const update_medecine = (name, price, count, branch, id) => fetchAll(UPDATE_MEDECINES, name, price, count, branch, id)

const update_daily_patients_status = (id, status, branch) => fetchAll(UPDATE_DAILY_PATIENTS_STATUS, id, status, branch)
const update_daily_service_status = (id, status, branch) => fetchAll(UPDATE_DAILY_SERVICE_STATUS, id, status, branch)

module.exports = {
    branch,
    users,
    staff,
    patients,
    services,
    schedule,
    medecines,
    daily_services,
    daily_patients,
    new_branch,
    new_users,
    new_staff,
    new_patients,
    new_services,
    new_schedule,
    new_medecines,
    new_daily_patients,
    new_daily_services,
    update_branch,
    update_user,
    update_staff,
    update_patient,
    update_service,
    update_schedule,
    update_medecine,
    update_daily_patients_status,
    update_daily_service_status
}