const { gql } = require('apollo-server-express')

module.exports = gql`
    type Branch {
        id: ID!
        name: String!
        time: String
        isOpen: Boolean!
        isActive: Boolean!
        updatedTime: String
        createdTime: String
    }

    type Users {
        id: ID!
        name: String!
        secondname: String!
        phone: String!
        password: String!
        isActive: Boolean!
        createdTime: String
        updatedTime: String
    }

    type Staff {
        id: ID!
        name: String!
        secondname: String!
        phone: String!
        password: String!
        status: String!
        branch: ID!
        isActive: Boolean!
        updatedTime: String
        createdTime: String
    }

    type Patients {
        id: ID!
        name: String!
        surname: String!
        lastname: String!
        phone: String!
        gender: Boolean!
        age: Int!
        isActive: Boolean!
        home: String!
        updatedTime: String
        createdTime: String
    }

    type Services{
        id: ID!
        name: String!
        price: Int!
        isActive: Boolean!
        updatedTime: String
        createdTime: String
    }

    type Schedule {
        id: ID!
        time: String!
        staff: ID!
        isActive: Boolean!
        updatedTime: String
        createdTime: String
    }

    type Medecines {
        id: ID!
        name: String!
        price: Int!
        count: Int!
        isActive: Boolean!
        updatedTime: String
        createdTime: String
    }

    type Dailypatients {
        id: ID!
        time: String!
        patient: ID!
        status: String!
        branch: ID!
        isActive: Boolean!
    }

    type Dailyservices {
        time: String!
        service: ID!
        status: String!
        staff: ID!
        patient: ID!
        branch: ID!
        isActive: Boolean!
    }

    type Query {
        branch: [Branch!]!
        users: [Users!]!
        staff: [Staff!]!
        patients: [Patients!]!
        services: [Services!]!
        schedule: [Schedule!]!
        medecines: [Medecines!]!
        daily_patients: [Dailypatients!]!
        daily_services: [Dailyservices!]!
        search_patients (text: String! token: ID!): [Patients]!
    }

    type Mutation {
        newBranch(name: String! time: String isOpen: Boolean! isActive: Boolean!): String
        newUsers(name: String! secondname: String! phone: String! password: String! isActive: Boolean!): String
        newStaff(name: String! secondname: String! phone: String! password: String! status: String! branch: ID! isActive: Boolean!): String
        newPatients(name: String! surname: String! lastname: String! phone: String! gender: Boolean! home: String! age: Int! isActive: Boolean!): String
        newServices(name: String! price: Int! isActive: Boolean!): String
        newSchedule(time: String! staff: ID! isActive: Boolean!): String
        newMedecines(name: String! price: Int! count: Int! isActive: Boolean!): String
        newDailyPatients(time: String! patient: ID! branch: ID! isActive: Boolean!): String
        newDailyServices(time: String! service: ID! staff: ID! patient: ID! branch: ID! isActive: Boolean!): String

        updateBranch(name: String! time: String! id: ID!): String
        updateUser(name: String! secondname: String! phone: String! password: String! id: ID!): String
        updateStaff(name: String! secondname: String! phone: String! password: String! branch: ID! id: ID!): String
        updatePatient(name: String! surname: String! lastname: String! phone: String! home: String! age: Int! id: ID!): String
        updateService(name: String! price: Int! id: ID!): String
        updateSchedule(time: String! task: String! status: String! id: ID!): String
        updateMedecines(name: String! price: Int! count: Int! id: ID!): String
        updateDailyPatientsStatus(id: ID! status: String! branch: String!): String
        updateDailyServiceStatus(id: ID! status: String! branch: String!): String
    }
`