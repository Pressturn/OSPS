import { useState, useEffect } from 'react'
import { getUserBalance } from "../../services/receiptService"
import "./BalanceSummary.css"

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
        return (
            < div className="balance-container" >
                <div className="balance-box">
                    <p className="Loading-message">Loading</p>
                </div>
            </div>
        )
    }

    return (
        <div className="balance-container">
            <div className="balance-box">
                <h1 className="balance-title">Balance Summary</h1>

                <div className="balance-summary">
                    <div className="balance-item">
                        <span className="balance-label">Total You Owe:</span>
                        <span className="balance-amount amount-owe">${balance.totalYouOwe}</span>
                    </div>

                    <div className="balance-item">
                        <span className="balance-label">Total Others Owe You:</span>
                        <span className="balance-amount amount-owed">${balance.totalOthersOwesYou}</span>
                    </div>

                    <div className="balance-item">
                        <span className="balance-label">Nett Balance:</span>
                        <span className={`balance-amount amount-net ${balance.nettBalance < 0 ? 'amount-owe' : 'amount-owed'}`}>
                            ${balance.nettBalance}
                        </span>
                    </div>
                </div>

                <div className="balance-section">
                    <h2 className="section-title">You Owe</h2>
                    {balance.youOwe.length > 0 ? (
                        <div className="debt-list">
                            {balance.youOwe.map((debt) => (
                                <div key={debt.userId} className="debt-item owe">
                                    <span className="debt-name">You owe {debt.name}</span>
                                    <span className="debt-amount">${debt.amount}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-message">Great stuff, you are debt free</p>
                    )}
                </div>

                <div className="balance-section">
                    <h2 className="section-title">Owes You</h2>
                    {balance.owesYou.length > 0 ? (
                        <div className="debt-list">
                            {balance.owesYou.map((debt) => (
                                <div key={debt.userId} className="debt-item owed">
                                    <span className="debt-name">{debt.name} owes you</span>
                                    <span className="debt-amount">${debt.amount}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="empty-message">No one owes you anything</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default BalanceSummary