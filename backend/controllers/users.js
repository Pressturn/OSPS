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
        const totalAmountUserOwes = debtsThatUserOwes.reduce((sum, debt) => sum + debt.amount)
        const totalAmountUserIsOwed = debtsThatUserIsOwed.reduce((sum, debt) => sum + debt.amount)
        const nettBalance = totalAmountUserIsOwed - totalAmountUserOwes


        const listOfPeopleUserOwes = []

        for (let debt of debtsThatUserOwes) {
            const personBeingOwed = await User.findById(debt.to).select('name')
            listOfPeopleUserOwes.push({
                owedTo: personBeingOwed.name,
                owedToId: debt.to,
                amount: debt.amount
            })
        }

        const listOfPeopleThatOwesThisUser = []

        for (let debt of debtsThatUserIsOwed) {
            const personThatOwes = await User.findById(debt.from).select('name')
            listOfPeopleThatOwesThisUser.push({
                owedBy: personThatOwes.name,
                owedToId: debt.from,
                amount: debt.amount
            })
        }

        res.json({
            userId: userFromDatabase._id,
            userName: userFromDatabase.name,
            nettBalance: nettBalance,
            owed: listOfPeopleUserOwes,
            isOwed: listOfPeopleThatOwesThisUser
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