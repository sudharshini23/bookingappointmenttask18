const path = require('path');
const express = require('express');

const expensesController = require('../controllers/expenses');

const router = express.Router();

router.get('/get-expenses', expensesController.getExpenseDetails);

router.post('/post-expenses', expensesController.postExpenseDetails);

router.delete('/delete-expenses/:id', expensesController.deleteExpenseDetails);

// METHOD 3 OF EDITING: USING DELETE AND GET;
// router.get('/get-expenses/:id', expensesController.editGetExpenseDetails);

// ---- METHOD 2;

router.get('/edit-expenses/:id', expensesController.editExpenseDetails);

router.post('/edit-expenses', expensesController.submitEditExpenseDetails)

// METHOD 3:
// router.put('/edit-expenses/:id', expensesController.editExpenseDetails);

module.exports = router;
