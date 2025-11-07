const User = require('../models/user');
const Expense = require('../models/expense')
const { calculateBalances } = require('../util/balanceCalculator')

async function createUser(req, res) {
    try {
        const newUser = await User.create(req.body);
        return res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function getAllUsers(req, res) {
    try {
        const users = await User.find().select('-password');
        return res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getSpecificUser(req, res) {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function updateUser(req, res) {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        return res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function deleteUser(req, res) {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getUserBalance(req, res) {
    try {

        // Get User
        const userId = req.params.id
        const userFromDatabase = await User.findById(userId)
        if (!userFromDatabase) {
            return res.status(404).json({ error: 'User not found' })
        }

        // Calculate all debts
        const allExpensesFromDatabase = await Expense.find()
        const allDebtsCalculated = calculateBalances(allExpensesFromDatabase)

        // Filter this user
        const debtsThatUserOwes = allDebtsCalculated.filter(debt => debt.from === userId)
        const debtsThatUserIsOwed = allDebtsCalculated.filter(debt => debt.to === userId)

        //Calculate total
        const totalYouOwe = debtsThatUserOwes.reduce((sum, debt) => sum + debt.amoun, 0)
        const totalOthersOwesYou = debtsThatUserIsOwed.reduce((sum, debt) => sum + debt.amount, 0)
        const nettBalance = totalYouOwe - totalOthersOwesYou


        const youOwe = []

        for (let debt of debtsThatUserOwes) {
            const person = await User.findById(debt.to).select('name')
            youOwe.push({
                name: person.name,
                userId: debt.to,
                amount: debt.amount
            })
        }

        const owesYou = []

        for (let debt of debtsThatUserIsOwed) {
            const person = await User.findById(debt.from).select('name')
            owesYou.push({
                name: person.name,
                userId: debt.from,
                amount: debt.amount
            })
        }

        res.json({
            userId: userFromDatabase._id,
            userName: userFromDatabase.name,
            totalYouOwe: totalYouOwe,
            totalOthersOwesYou: totalOthersOwesYou,
            nettBalance: nettBalance,
            youOwe: youOwe,
            owesYou: owesYou
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getSpecificUser,
    deleteUser,
    updateUser,
    getUserBalance
}