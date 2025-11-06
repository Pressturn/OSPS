
function calculateBalances(expenses) {
    const debts = {};
    let balance = {};

    expenses.forEach(expense => {
        expense.splitBetween.forEach(split => {
            const userId = split.user.toString();
            const amountPaid = (userId === expense.paidBy.toString()) ? expense.amount : 0;
            const share = split.amount;
            balance[userId] = (balance[userId] || 0) + (amountPaid - share)
        })

    });

    const allUserIds = Object.keys(balance);

    allUserIds.forEach(fromUser => {
        if (balance[fromUser] < 0) {

            allUserIds.forEach(toUser => {
                if (balance[toUser] > 0) {

                    const settleAmount = Math.min(
                        Math.abs(balance[fromUser]),
                        Math.abs(balance[toUser])
                    );

                    const debtKey = `${fromUser}-${toUser}`;
                    const oppositeKey = `${toUser}-${fromUser}`;

                    if (debts[oppositeKey]) {
                        debts[oppositeKey] -= settleAmount;

                        if (debts[oppositeKey] < 0) {
                            debts[debtKey] = Math.abs(debts[oppositeKey]);
                            debts[oppositeKey] = 0;
                        };

                    } else {
                        debts[debtKey] = (debts[debtKey] || 0) + settleAmount;
                    }

                    balance[fromUser] += settleAmount;
                    balance[toUser] -= settleAmount;
                }
            })
        }
    });

    const outstandingBalance = [];

    for (const key in debts) {
        const [from, to] = key.split('-');
        if (debts[key] > 0) {
            outstandingBalance.push({
                from: from,
                to: to,
                amount: debts[key]
            })
        }
    }

    return outstandingBalance;


};

module.exports = { calculateBalances };