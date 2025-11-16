import { useState, useEffect } from 'react'
import { getUserBalance } from "../../services/receiptService"

function BalanceSummary() {
    const [balance, setBalance] = useState(null)

    useEffect(() => {
        fetchBalance()
    }, [])

    const fetchBalance = async () => {
        try {
            const data = await getUserBalance()
            setBalance(data)
        } catch (error) {
            console.error(error)
        }
    }

    if (!balance) {
        return <div> Loading</div>
    }

    return (
        <div>
            <h1>Balance Summary</h1>
            <p> Total You Owe: ${balance.totalYouOwe}</p>
            <p>Total Others Owe You: ${balance.totalOthersOwesYou}</p>
            <p>Nett Balance: ${balance.nettBalance}</p>

            <h2>You Owe:</h2>
            {balance.youOwe.length > 0 ? (
                balance.youOwe.map((debt) => (
                    <p key={debt.userId}>
                        You Owe {debt.name}${debt.amount}
                    </p>
                ))
            ) : (
                <p>Great stuff, you are debt free</p>
            )}

            <h2>Owes You:</h2>
            {balance.owesYou.length > 0 ? (
                balance.owesYou.map((debt) => (
                    <p key={debt.userId}>
                        {debt.name} owes you ${debt.amount}
                    </p>
                ))
            ) : (
                <p> No one owes you anything </p>
            )}
        </div>
    )
}

export default BalanceSummary