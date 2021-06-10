'use strict';
const fetchOps = require('./fetchOps');
const errorHandler = require('../utils/errorHandler');
const successHandler = require('../utils/successHandler');
const successCodeJson = require('../utils/successCode');
const errorCodeJson = require('../utils/errorCode');



function getProductData(req, res) {
    try {
        fetchOps.getProductDetails(req)
            .then(response => {
                return successHandler.success_200(response, res, successCodeJson.SUCCESS_MSG_DETAILS_FETCHED.msg)
            }).catch(error => {
                return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
            })
    } catch (error) {
        return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
    }
}

function UpdateData(req, res, table) {
    try {
        fetchOps.updateData(req, table)
            .then(response => {
                return successHandler.success_200(response, res, successCodeJson.SUCCESS_MSG_DETAILS_FETCHED.msg)
            }).catch(error => {
                return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
            })
    } catch (error) {
        return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
    }
}

function createData(req, res, table) {
    try {
        fetchOps.InsertData(req, table)
            .then(response => {
                return successHandler.success_200(response, res, successCodeJson.SUCCESS_MSG_DETAILS_FETCHED.msg)
            }).catch(error => {
                return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
            })
    } catch (error) {
        return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
    }
}

function deleteData(req, res, table) {
    try {
        fetchOps.deleteData(req, table)
            .then(response => {
                return successHandler.success_200(response, res, successCodeJson.SUCCESS_MSG_DETAILS_FETCHED.msg)
            }).catch(error => {
                return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
            })
    } catch (error) {
        return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
    }
}

function getCategoryDetails(req, res) {
    try {
        fetchOps.getCategoryDetails(req)
            .then(response => {
                console.log(response);
                return successHandler.success_200(response, res, successCodeJson.SUCCESS_MSG_DETAILS_FETCHED.msg)
            }).catch(error => {
                return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
            })
    } catch (error) {
        return errorHandler.errorHandler(error, res, errorCodeJson.ERROR_DETAILS_FETCHED.msg);
    }
}

module.exports.getProductData = getProductData;
module.exports.getCategoryDetails = getCategoryDetails;
module.exports.UpdateData = UpdateData;
module.exports.createData = createData;
module.exports.deleteData = deleteData;