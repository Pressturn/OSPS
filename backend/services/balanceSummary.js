const User = require('../models/user.js')
const Expense = require('../models/expense.js')
const { calculateBalances } = require('../util/balanceCalculator')


async function getUserBalanceSummary(userId) {

    // Calculate expenses and debts
    const allExpensesFromDatabase = await Expense.find()
    const allDebtsCalculated = calculateBalances(allExpensesFromDatabase)

    // Filter debts for this user
    const debtsThatUserOwes = allDebtsCalculated.filter(debt => debt.from === userId)
    const debtsThatUserIsOwed = allDebtsCalculated.filter(debt => debt.to === userId)

    //Calculate total
    const totalYouOwe = debtsThatUserOwes.reduce((sum, debt) => sum + debt.amount, 0)
    const totalOthersOwesYou = debtsThatUserIsOwed.reduce((sum, debt) => sum + debt.amount, 0)
    const nettBalance = totalOthersOwesYou - totalYouOwe


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
    return {
        totalYouOwe,
        totalOthersOwesYou,
        nettBalance,
        youOwe,
        owesYou,
    }
}

module.exports = { getUserBalanceSummary }