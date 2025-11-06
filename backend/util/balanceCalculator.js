
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

    const allUserIds = Object.keys(balance);

    allUserIds.forEach(fromUser => {
        if (balance[fromUser] <0){

            allUserIds.forEach(toUser => {
                if(balance[toUser] > 0){

                    const settleAmount = Math.min(
                        Math.abs([balances[fromUser], balances[toUser]])
                    );

                    const debtKey = `${fromUser}-${toUser}`;
                    const oppositeKey = `${toUser}-${fromUser}`;

                    if (debts[oppositeKey]){
                        debts[oppositeKey] -= settleAmount;

                        if (debts[oppositeKey] < 0){
                            debts[debtKey] = Math.abs(debts[oppositeKey]);
                            debts[oppositeKey] = 0;
                        };

                    } else {
                        debts[debtKey] = (debts[debtKey] || 0) + settleAmount;
                    }

                    balances[fromUser] += settleAmount;
                    balances[toUser] -= settleAmount; 
                }
            })
        } 
    });

    const outstandingBalance = [];

    for (const key in debts){
        const [from, to] = key.split('-');
        if (debts[key] > 0){
            outstandingBalance.push({
                from: from, 
                to: to, 
                amount: debts[key]
            })
        }
    }

    return outstandingBalance;


};

module.exports = {calculateBalances};