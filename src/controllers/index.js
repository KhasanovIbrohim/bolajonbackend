const express = require('express')
const router = express.Router()
const controllers = require('./controllers')

router
    .post('/login', controllers.LOGIN)
    .post('/get_monthly_money', controllers.GET_MONTHLY_MONEY)
    .post('/get_monthly_patients', controllers.GET_MONTHLY_PATIENTS)
    .post('/get_monthly_service', controllers.GET_MONTHLY_SERVICE)
    .post('/search', controllers.SEARCH)
    .post('/search_service', controllers.SEARCH_SERVICE)
    .post('/get_daily_schedule', controllers.GET_DAILY_SCHEDULE)

module.exports = router