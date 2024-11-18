const expenseModel = require('../models/expenseModel');

//get expenses by user
exports.getExpenses = async (req, res) => {
    try {
        const expenses = await expenseModel.find({ userId: req.user.id });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//add expenses
exports.addExpense = async (req, res) => {
    try {
        const expense = await expenseModel.create({
            userId: req.user.id,
            ...req.body
        });
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//update expenses
exports.updateExpense = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the expense by ID
        const expense = await expenseModel.findOne({
            userId: userId
        });

        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }

        // Check authorization
        if (expense.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not authorized to update this expense' });
        }

        // Update the expense
        const updatedExpense = await expenseModel.findOneAndUpdate(
            { userId: userId },
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//delete expenses
exports.deleteExpense = async (req, res) => {
    try {
        await expenseModel.findOneAndDelete({
            userId : req.params.userId
        });
        res.status(200).json({ message: 'Expense deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}