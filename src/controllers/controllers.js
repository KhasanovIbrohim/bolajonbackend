const { Pool } = require('pg')


const pool = new Pool({
    connectionString: 'postgres://uodzznyh:2-b7c05ilUUQhOP_v_06hK_MgRpDd7fr@satao.db.elephantsql.com/uodzznyh'
})

module.exports = {
    LOGIN: async(req, res) => {
        const client = await pool.connect()
        const {userphone, userpassword} = req.body
        console.log(userphone, userpassword)
        const { rows: user } = await client.query(` 
            SELECT staff_id as token, staff_name as name, staff_secondname as surname, staff_status as status, branch as branch FROM staff 
                WHERE staff_phone = $1 AND staff_password = crypt($2, staff_password) AND is_active = true;
        `, [userphone, userpassword])
        client.release()
        res.send(user)
    },
    GET_MONTHLY_SERVICE: async(req, res) => {
        const client = await pool.connect()
        const {startOfDayFormatted, endOfDayFormatted, token, branch} = req.body
        const { rows: service } = await client.query(`
            SELECT 
            d.statistics_id as id,
            d.statistics_of + INTERVAL '5 hours' as time,
            d.statistics_status as status,
            s.service_id as service,
            s.service_name as service_name,
            s.service_price as service_price,
            p.patient_id as patient,
            p.patient_surname as patient_surname,
            p.patient_name as patient_name,
            p.patient_lastname as patient_lastname,
            p.patient_phone as patient_phone,
            f.staff_id as staff,
            f.staff_name as staff_name,
            f.staff_phone as staff_phone,
            f.staff_status as staff_status
            FROM daily_services d
            JOIN services s ON d.statistics_service = s.service_id 
            JOIN patients p ON d.service_patient = p.patient_id
            JOIN staff f ON d.service_staff = f.staff_id
            WHERE d.statistics_of >= $1::timestamp 
            AND d.statistics_of < $2::timestamp AND (
            SELECT staff_status
            FROM staff
            WHERE staff_id = $3 
            ) IN ('ADMIN', 'SUPER_ADMIN')
            AND d.statistics_branch = (SELECT branch_id FROM branch WHERE branch_id = $4);
        `, [startOfDayFormatted, endOfDayFormatted, token, branch])
        client.release()
        res.send(service)
    },
    GET_MONTHLY_PATIENTS: async(req, res) => {
        const client = await pool.connect()
        const {startOfDayFormatted, endOfDayFormatted, token, branch} = req.body
        const { rows: patients } = await client.query(`
            SELECT
            d.statistics_id as id,
            d.statistics_of + INTERVAL '5 hours' as time,
            d.statistics_patient as patient,
            d.statistics_status as status,
            p.patient_name as name,
            p.patient_surname as surname,
            p.patient_lastname as lastname,
            p.patient_phone as phone,
            p.patient_home as home,
            p.patient_age as age,
            p.patient_gender as gender
        FROM
            daily_patients d
        JOIN
            patients p ON d.statistics_patient = p.patient_id
        WHERE
            d.statistics_of >= $1::timestamp
            AND d.statistics_of < $2::timestamp
            AND (
            SELECT staff_status
            FROM staff
            WHERE staff_id = $3
            ) IN ('ADMIN', 'SUPER_ADMIN')
            AND d.statistics_branch = (SELECT branch_id FROM branch WHERE branch_id = $4)
        GROUP BY
            d.statistics_id,
            d.statistics_of + INTERVAL '5 hours',
            d.statistics_patient,
            d.statistics_status,
            p.patient_name,
            p.patient_surname,
            p.patient_lastname,
            p.patient_phone,
            p.patient_home,
            p.patient_age,
            p.patient_gender;
        `, [startOfDayFormatted, endOfDayFormatted, token, branch])
        client.release()
        res.send(patients)
    },
    GET_MONTHLY_MONEY: async(req, res) => {
        const client = await pool.connect()
        const {startOfDayFormatted, endOfDayFormatted, token, branch} = req.body
        const { rows: money } = await client.query(`
            SELECT SUM(s.service_price) as overall, $1::timestamp + INTERVAL '5 hours' as from, $2::timestamp + INTERVAL '5 hours' as to, AGE($2::timestamp, $1::timestamp) as time 
            FROM daily_services d JOIN services s ON d.statistics_service = s.service_id WHERE d.statistics_of >= $1::timestamp
            AND d.statistics_of < $2::timestamp AND (SELECT staff_status FROM staff WHERE staff_id = $3) = 'ADMIN' OR (SELECT staff_status FROM staff WHERE staff_id = $3) = 'SUPER_ADMIN' AND d.statistics_branch = (SELECT branch_id FROM branch WHERE branch_id = $4);
        `, [startOfDayFormatted, endOfDayFormatted, token, branch])
        client.release()
        res.send(money)
    },
    SEARCH: async(req, res) => {
        const client = await pool.connect()
        const {text, startOfDayFormatted, endOfDayFormatted, token, branch} = req.body
        const { rows: patients } = await client.query(`
        SELECT
        d.statistics_of + INTERVAL '5 hours' as time,
        d.statistics_patient as patient,
        d.statistics_status as status,
        p.patient_name as name,
        p.patient_surname as surname,
        p.patient_lastname as lastname,
        p.patient_phone as phone,
        p.patient_home as home,
        p.patient_age as age,
        p.patient_gender as gender,
        ROW_NUMBER() OVER (ORDER BY d.statistics_patient) AS count
        FROM
        daily_patients d
        JOIN
        patients p ON d.statistics_patient = p.patient_id
        WHERE
        d.statistics_of >= $1::timestamp
        AND d.statistics_of < $2::timestamp
        AND (
        SELECT staff_status
        FROM staff
        WHERE staff_id = $3
        ) IN ('ADMIN', 'SUPER_ADMIN')
        AND
        p.patient_name ILIKE '${text}%' 
        AND d.statistics_branch = (SELECT branch_id FROM branch WHERE branch_id = $4)
        OR 
        p.patient_surname ILIKE '${text}%'
        AND d.statistics_of >= $1::timestamp
        AND d.statistics_of < $2::timestamp
        AND (
        SELECT staff_status
        FROM staff
        WHERE staff_id = $3
        ) IN ('ADMIN', 'SUPER_ADMIN')
        AND d.statistics_branch = (SELECT branch_id FROM branch WHERE branch_id = $4)
        GROUP BY
        d.statistics_of + INTERVAL '5 hours',
        d.statistics_patient,
        d.statistics_status,
        p.patient_name,
        p.patient_surname,
        p.patient_lastname,
        p.patient_phone,
        p.patient_home,
        p.patient_age,
        p.patient_gender;
        `, [startOfDayFormatted, endOfDayFormatted, token, branch])
        client.release()
        res.send(patients)
    },
    SEARCH_SERVICE: async(req, res) => {
        const client = await pool.connect()
        const {text, startOfDayFormatted, endOfDayFormatted, token, branch} = req.body
        const { rows: service } = await client.query(`
            SELECT 
            d.statistics_id as id,
            d.statistics_of + INTERVAL '5 hours' as time,
            d.statistics_status as status,
            s.service_id as service,
            s.service_name as service_name,
            s.service_price as service_price,
            p.patient_id as patient,
            p.patient_surname as patient_surname,
            p.patient_name as patient_name,
            p.patient_lastname as patient_lastname,
            p.patient_phone as patient_phone,
            f.staff_id as staff,
            f.staff_name as staff_name,
            f.staff_phone as staff_phone,
            f.staff_status as staff_status
            FROM daily_services d
            JOIN services s ON d.statistics_service = s.service_id 
            JOIN patients p ON d.service_patient = p.patient_id
            JOIN staff f ON d.service_staff = f.staff_id
            WHERE d.statistics_of >= $1::timestamp 
            AND d.statistics_of < $2::timestamp AND (
            SELECT staff_status
            FROM staff
            WHERE staff_id = $3
            ) IN ('ADMIN', 'SUPER_ADMIN') AND
            p.patient_name ILIKE '${text}%'
            AND d.statistics_branch = (SELECT branch_id FROM branch WHERE branch_id = $4) 
            OR 
            p.patient_surname ILIKE '${text}%'
            AND d.statistics_of >= $1::timestamp
            AND d.statistics_of < $2::timestamp
            AND (
            SELECT staff_status
            FROM staff
            WHERE staff_id = $3
            ) IN ('ADMIN', 'SUPER_ADMIN')
            AND d.statistics_branch = (SELECT branch_id FROM branch WHERE branch_id = $4);
        `, [startOfDayFormatted, endOfDayFormatted, token, branch])
        client.release()
        res.send(service)
    },
    GET_DAILY_SCHEDULE: async(req, res) => {
        const client = await pool.connect()
        const {startOfDayFormatted, token} = req.body
        const { rows: service } = await client.query(`
            SELECT 
            d.schedule_id as id,
            d.schedule_time as time,
            f.staff_name as name,
            f.staff_secondname as second_name
            FROM schedule d
            JOIN staff f ON d.schedule_staff = f.staff_id
            WHERE d.schedule_time = $1::date AND (
            SELECT staff_status
            FROM staff
            WHERE staff_id = $2
            ) IN ('ADMIN', 'SUPER_ADMIN');
        `, [startOfDayFormatted, token])
        client.release()
        res.send(service)
    }
}   