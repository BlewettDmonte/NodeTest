var express = require('express');
var router = express.Router();
var apiCalls = require('../Controller/apiCalls');
const {getCategoryDetails, getProductDetails,InsertData } = require('../Controller/fetchOps')

router.get('/getCategoryData', (req, res) => {
  apiCalls.getCategoryDetails(req, res);
})

router.post('/insertCategoryData', (req, res) => {
  console.log(req.body);
  InsertData(req, "Category");
})
router.post('/updateCategoryData', (req, res) => {
  apiCalls.UpdateData(req, res, "Category");
})
router.post('/deleteCategoryData', (req, res) => {
  apiCalls.deleteData(req, res, "Category");
})

//product routes
router.get('/product', (req, res) => {
  apiCalls.getProductData(req, res);
})
router.post('/insertProductData', (req, res) => {
  apiCalls.createData(req, res, "Product");
})

router.post('/updateProductData', (req, res) => {
  apiCalls.UpdateData(req, res, "Product");
})

router.post('/deleteProductData', (req, res) => {
  apiCalls.deleteData(req, res, "Product");
})
module.exports = router;
