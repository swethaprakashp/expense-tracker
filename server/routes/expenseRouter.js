const express = require('express');
const { getExpenses, addExpense, updateExpense, deleteExpense } = require('../controllers/expenseController')
const { protect } = require('../middlewares/authMiddlewear')
const router = express();

router.get('/',protect, getExpenses);
router.post('/',protect, addExpense);
router.put('/:userId',protect, updateExpense);
router.delete('/:userId',protect, deleteExpense)

module.exports = router;