'use strict';
const express = require('express')
const app = express();
const q = require('q');
const _ = require('underscore');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var mysql = require('mysql')

const conpool = mysql.createPool({
    connectionLimit: 200,
    connectTimeout: 5 * 60 * 1000,
    acquireTimeout: 5 * 60 * 1000,
    timeout: 5 * 60 * 1000,
    host: 'localhost',
    user: 'root',
    password: 'Blewett@1997',
    database: 'test',
    timezone: 'UTC+05:30',
    multipleStatements: true,
    insecureAuth: true

})

function getProductDetails(req) {
    let deferred = q.defer();
    let {categoryId,limit, page} = req.query
    let skip = (page - 1) * limit;
    try {
        conpool.getConnection((error, connection) => {
            if (error) {
                console.log(error);
                deferred.reject(error);
            } else {
                let selectQuery = `SELECT pm.product_id, pm.product_name, pm.category_id, cm.category_id, cm.category_name 
                                FROM test.product_master pm
                                left join test.category_master cm on pm.category_id=cm.category_id 
                                Limit ${limit} Offset ${skip}`
                connection.query(selectQuery, function (error, response) {
                    connection.destroy();
                    if (error) {
                        console.log(error)
                        deferred.reject(error);
                    } else {
                        deferred.resolve(response)
                    }
                })
            }
        })
    } catch (error) {
        deferred.reject(error)
    }
    return deferred.promise;
}

function getCategoryDetails(req) {
    let deferred = q.defer();
    try {
        conpool.getConnection((error, connection) => {
            if (error) {
                console.log(error);
                deferred.reject(error);
            } else {
                let selectQuery = `SELECT category_id, category_name FROM test.category_master WHERE is_deleted = 0`
                connection.query(selectQuery, function (error, response) {
                    connection.destroy();
                    if (error) {
                        console.log(error)
                        deferred.reject(error);
                    } else {
                        deferred.resolve(response)
                    }
                })
            }
        })
    } catch (error) {
        deferred.reject(error)
    }
    return deferred.promise;
}

function InsertData(req,table) {
    let deferred = q.defer();
    let insertQuery;
    if(table=='Product'){
        let {ProductName, categoryId} = req.body
        insertQuery = `Insert into test.product_master (product_name, category_id) Values ('${ProductName}',${categoryId})`
    }else if (table=='Category'){
        let {categoryName}= req.body
        console.log(req.body);
        insertQuery = `Insert into test.category_master (category_name) Values ('${categoryName}')`
    }
    try {
        conpool.getConnection((error, connection) => {
            if (error) {
                console.log(error);
                deferred.reject(error);
            } else {
                connection.query(insertQuery, function (error, response) {
                    connection.destroy();
                    if (error) {
                        console.log(error)
                        deferred.reject(error);
                    } else {
                        deferred.resolve(response)
                    }
                })
            }
        })
    } catch (error) {
        deferred.reject(error)
    }
    return deferred.promise;
}

function updateData(req,table) {
    let deferred = q.defer();
    let updateQuery;
    if(table=='Product'){
        let {productId, productName} = req.body
        updateQuery = `Update test.product_master SET product_name = '${productName}' where product_id = ${productId}` 
    }else if (table=='Category'){
        let {categoryName, categoryId}= req.body
        updateQuery = `Update test.category_master SET category_name = '${categoryName}' where category_id = ${categoryId}`
    }
    try {
        conpool.getConnection((error, connection) => {
            if (error) {
                console.log(error);
                deferred.reject(error);
            } else {
                connection.query(updateQuery, function (error, response) {
                    connection.destroy();
                    if (error) {
                        console.log(error)
                        deferred.reject(error);
                    } else {
                        deferred.resolve(response)
                    }
                })
            }
        })
    } catch (error) {
        deferred.reject(error)
    }
    return deferred.promise;
}

function deleteData(req,table) {
    let deferred = q.defer();
    let deleteQuery;
    if(table=='Product'){
        let {productId} = req.body
        deleteQuery = `Update test.product_master SET is_deleted = 1 where product_id = ${productId}`
    }else if (table=='Category'){
        let {categoryId}= req.body
        deleteQuery = `Update test.category_master SET is_deleted = 1 where category_id = ${categoryId}`
    }
    try {
        conpool.getConnection((error, connection) => {
            if (error) {
                console.log(error);
                deferred.reject(error);
            } else {
                connection.query(deleteQuery, function (error, response) {
                    connection.destroy();
                    if (error) {
                        console.log(error)
                        deferred.reject(error);
                    } else {
                        deferred.resolve(response)
                    }
                })
            }
        })
    } catch (error) {
        deferred.reject(error)
    }
    return deferred.promise;
}

module.exports.deleteData = deleteData;
module.exports.getProductDetails = getProductDetails;
module.exports.updateData = updateData;
module.exports.InsertData = InsertData;
module.exports.getCategoryDetails = getCategoryDetails;