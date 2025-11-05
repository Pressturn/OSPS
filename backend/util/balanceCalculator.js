
function calculateBalances (expenses){
    const debts = {};

    expenses.forEach(expense => {

        balance = {};

        expense.splitBetween.forEach(split =>{
            const userId = split.user.toString();
            const amountPaid = (userId === expense.paidBy.toString()) ? expense.amount : 0;
            const share = split.amount; 
            balance[userId] = amountPaid - share; 
        })

    });
};

module.exports = {calculateBalances};