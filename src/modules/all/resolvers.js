const model = require('./model')
const generateID = require('../../lib/idGenerator')

module.exports = {
    Query: {
        branch: async() => {
            return await model.branch()
        },
        users: async() => {
            return await model.users()
        },
        staff: async() => {
            return await model.staff()
        },
        patients: async() => {
            return await model.patients()
        },
        services: async() => {
            return await model.services()
        },
        schedule: async() => {
            return await model.schedule()
        },
        medecines: async() => {
            return await model.medecines()
        },
        daily_patients: async() => {
            return await model.new_daily_patients()
        },
        daily_services: async() => {
            return await model.new_daily_services()
        },
        search_patients: async(text, token) => {
            return await model.search_patients(`${token.text}%`, token.token);
        }
    },
    Branch: {
        id: global => global.branch_id,
        name: global => global.branch_name,
        time: global => global.working_time,
        isOpen: global => global.is_open,
        isActive: global => global.is_active,
        updatedTime: global => global.updated_time,
        createdTime: global => global.created_date
    },
    Users: {
        id: global => global.user_id,
        name: global => global.user_name,
        secondname: global => global.user_secondname,
        phone: global => global.user_phone,
        password: global => global.user_password,
        isActive: global => global.is_active,
        createdTime: global => global.user_created_date,
        updatedTime: global => global.updated_time
    },
    Staff: {
        id: global => global.staff_id,
        name: global => global.staff_name,
        secondname: global => global.staff_secondname,
        phone: global => global.staff_phone,
        password: global => global.staff_password,
        status: global => global.staff_status,
        branch: global => global.branch,
        isActive: global => global.is_active,
        updatedTime: global => global.updated_time,
        createdTime: global => global.created_date
    },
    Patients: {
        id: global => global.patient_id,
        name: global => global.patient_name,
        surname: global => global.patient_surname,
        lastname: global => global.patient_lastname,
        phone: global => global.patient_phone,
        gender: global => global.patient_gender,
        age: global => global.patient_age,
        isActive: global => global.is_active,
        home: global => global.patient_home,
        updatedTime: global => global.updated_time,
        createdTime: global => global.created_date
    },
    Services: {
        id: global => global.service_id,
        name: global => global.service_name,
        price: global => global.service_price,
        isActive: global => global.is_active,
        updatedTime: global => global.updated_time,
        createdTime: global => global.created_date
    },
    Schedule: {
        id: global => global.schedule_id,
        time: global => global.schedule_time,
        staff: global => global.schedule_staff,
        isActive: global => global.is_active,
        updatedTime: global => global.updated_time,
        createdTime: global => global.created_date
    },
    Medecines: {
        id: global => global.medecine_id,
        name: global => global.medecine_name,
        price: global => global.medecine_price,
        count: global => global.medecine_count,
        isActive: global => global.is_active,
        updatedTime: global => global.updated_time,
        createdTime: global => global.created_date
    },
    Dailypatients: {
        id: global => global.statistics_id,
        time: global => global.statistics_of,
        patient: global => global.statistics_patient,
        status: global => global.statistics_status,
        isActive: global => global.is_active
    },
    Dailyservices: {
        id: global => global.statistics_id,
        time: global => global.statistics_of,
        service: global => global.statistics_service,
        status: global => global.statistics_status,
        staff: global => global.service_staff,
        patient: global => global.service_patient,
        isActive: global => global.is_active,
    },
    Mutation: {
        newBranch: async(_, { name, time, isOpen, isActive }, ) => {
            let id = generateID()
            model.new_branch(id, name, time, isOpen, isActive)
            return "New Branch Created!"
        },
        newUsers: async(_, { name, secondname, phone, password, isActive}, ) => {
            let id = generateID()
            model.new_users(id, name, secondname, phone, password, isActive)
            return "New User Created!"
        },
        newStaff: async(_, { name, secondname, phone, password, status, branch, isActive }, ) => {
            let id = generateID()
            let result = await model.new_staff(id, name, secondname, phone, password, status, branch, isActive)
            if (typeof result[0].id === "string" && result[0].status) {
                return "Staff Added!";
            } else {
                return "Something went wrong!";
            }
        },
        newPatients: async(_, { name, surname, lastname, phone, gender, home, age, isActive }, ) => {
            let id = generateID()
            console.log(name, surname, lastname, phone, gender, home, age, isActive)
            model.new_patients(id, name, surname, lastname, phone, gender, home, age, isActive)
            return "New Patient Created!"
        },
        newServices: async(_, { name, price, isActive }, ) => {
            let id = generateID()
            model.new_services(id, name, price, isActive)
            return "New Service Created!"
        },
        newSchedule: async(_, { time, staff, isActive }, ) => {
            let id = generateID()
            model.new_schedule(id, time, staff, isActive)
            return "New Schedule Created!"
        },
        newMedecines: async(_, { name, price, count, isActive }, ) => {
            let id = generateID()
            model.new_medecines(id, name, price, count, isActive)
            return "New Medecine Created!"
        },
        newDailyPatients: async(_, { time, patient, branch, isActive }, ) => {
            let id = generateID()
            model.new_daily_patients(id, time, patient, branch, isActive)
            return "New Daily Patient Added!"
        },
        newDailyServices: async(_, { time, service, staff, patient, branch, isActive }, ) => {
            let id = generateID()
            model.new_daily_services(id, time, service, staff, patient, branch, isActive)
            return "New Daily Service Added!"
        },
        updateBranch: async(_, { name, time, id }, ) => {
            model.update_branch(name, time, id)
            return "Updated User!"
        },
        updateUser: async(_, { name, secondname, phone, password, id }, ) => {
            model.update_user(name, secondname, phone, password, id)
            return "Updated User!"
        },
        updateStaff: async(_, { name, secondname, phone, password, branch, id }, ) => {
            model.update_staff(name, secondname, phone, password, branch, id)
            return "Updated Staff!"
        },
        updatePatient: async(_, { name, surname, lastname, phone, home, age, id }, ) => {
            model.update_patient(name, surname, lastname, phone, home, age, id)
            return "Updated Patient!"
        },
        updateService: async(_, { name, price, id }, ) => {
            model.update_service(name, price, id)
            return "Updated Service!"
        },
        updateSchedule: async(_, { time, staff, id }, ) => {
            model.update_schedule(time, staff, id)
            return "Updated Schedule!"
        },
        updateMedecines: async(_, { name, price, count, id }, ) => {
            model.update_medecine(name, price, count, id)
            return "Updated Medecine!"
        },
        updateDailyPatientsStatus: async(_, { id, status }, ) => {
            model.update_daily_patients_status(id, status)
            return "Status updated!"
        }
        ,
        updateDailyServiceStatus: async(_, { id, status }, ) => {
            model.update_daily_service_status(id, status)
            return "Status updated!"
        }
    }
}