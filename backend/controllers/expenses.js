const Expense = require('../models/expenseDetails');

exports.getExpenseDetails = (req,res,next) => {
    Expense.findAll()
    .then(expenses => {
        res.status(200).json({expenses: expenses});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    })
}

exports.postExpenseDetails = (req,res,next) => {
    console.log(req.body);
    const amt = req.body.expenseAmt;
    const desc = req.body.description;
    const category = req.body.category;
    Expense.create({
        expenseAmount: amt,
        description: desc,
        category: category
    })
    .then(result => {
        res.status(201).json({expenses: result})
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

exports.deleteExpenseDetails = (req,res,next) => {
    const expenseId = req.params.id;
    Expense.findByPk(expenseId)
    .then(expense => {
        return expense.destroy();
    })
    .then(result => {
        res.status(200);
    })
    .catch(err => {
        res.status(500).json({error: err})
    })
}

// METHOD 2: USING GET AND DELETE
// exports.editGetExpenseDetails = (req,res,next) => {
//     const expenseId = req.params.id;
//     Expense.findByPk(expenseId)
//     .then(expense => {
//         res.status(200).json({expenses: expense});
//     })
//     .catch(err => {
//         res.status(500).json({error: err})
//     })
// }


// METHOD 1 OF EDIT: USING PUT: NOT WORKING: --------------------------------------------------
// exports.editExpenseDetails = (req,res,next) => {
//     const expenseId = req.params.id;
//     const updatedAmt = req.body.expenseAmt;
//     const updatedDesc = req.body.description;
//     const updatedCategory = req.body.category;
//     Expense.findByPk(expenseId)
//     .then(expense => {
//         expense.id = expenseId;
//         expense.expenseAmount = updatedAmt;
//         expense.description = updatedDesc;
//         expense.category = updatedCategory;
//         return expense.save();
//         // expense.destroy();
//     })
//     .then(result => {
//         res.status(200)
//         // .json({expenses: result})
//     })
//     .catch(err => {
//         res.status(500).json({error: err});
//     })        
// }


// --- BELOW CODE WAS NOT WORKING! ----------

exports.editExpenseDetails = (req,res,next) => {
    const editMode = req.query.edit;
    if(!editMode) {
        return res.redirect('/expenses/get-expenses');
    }
    const expenseId = req.params.id;
    Expense.findByPk(expenseId)
    .then(expenses => {
        if(!expenses) {
            return res.status(500).json({error: 'No product found'});
        }
        res.status(200).json({expenses: expenses})
    })
    .catch(err => {
        res.status(500).json({error: err});
    })
}

exports.submitEditExpenseDetails = (req,res,next) => {
    const expenseId = req.params.id;
    const updatedAmt = req.body.expenseAmt;
    const updatedDesc = req.body.description;
    const updatedCategory = req.body.category;
    Expense.findByPk(expenseId)
    .then(expense => {
        expense.expenseAmount = updatedAmt;
        expense.description = updatedDesc;
        expense.category = updatedCategory;
        return expense.save();
    })
    .then(result => {
        res.status(200).json({expenses: result})
    })
    .catch(err => {
        res.status(500).json({error: err});
    })
}