
import { useMemo, useState } from 'react'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'Salary', amount: 1, type: 'income' },
    { id: 2, name: 'Groceries', amount: 1850, type: 'expense' },
    { id: 3, name: 'Internet', amount: 1299, type: 'expense' },
  ])

  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [type, setType] = useState('expense')

  const income = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0),
    [transactions],
  )

  const expenses = useMemo(
    () =>
      transactions
        .filter((transaction) => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0),
    [transactions],
  )

  const balance = income - expenses

  const addTransaction = (event) => {
    event.preventDefault()

    if (!name.trim() || !amount || Number(amount) <= 0) return

    setTransactions((current) => [
      ...current,
      {
        id: Date.now(),
        name: name.trim(),
        amount: Number(amount),
        type,
      },
    ])

    setName('')
    setAmount('')
  }

  const deleteTransaction = (id) => {
    setTransactions((current) =>
      current.filter((transaction) => transaction.id !== id),
    )
  }

  const formatCurrency = (value) =>
    new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      maximumFractionDigits: 0,
    }).format(value)

  return (
    <main className="app">
      <div className="tracker">
        <header className="header">
          <div>
            <p className="eyebrow">PERSONAL FINANCE</p>
            <h1>Budget Tracker</h1>
          </div>

          <span className="month">September 2026</span>
        </header>

        <section className="balance-card">
          <div>
            <p>Current balance</p>
            <h2>{formatCurrency(balance)}</h2>
          </div>

          <div className="balance-mark">₱</div>
        </section>

        <section className="summary">
          <div>
            <span className="summary-label">Income</span>
            <strong className="income">
              {formatCurrency(income)}
            </strong>
          </div>

          <div>
            <span className="summary-label">Expenses</span>
            <strong className="expense">
              {formatCurrency(expenses)}
            </strong>
          </div>
        </section>

        <section className="add-section">
          <div className="section-heading">
            <h3>Add transaction</h3>
          </div>

          <form onSubmit={addTransaction} className="form">
            <input
              type="text"
              placeholder="Description"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <input
              type="number"
              placeholder="Amount"
              min="0"
              step="1"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
            />

            <select
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <button type="submit">Add</button>
          </form>
        </section>

        <section className="transactions">
          <div className="section-heading">
            <h3>Transactions</h3>
            <span>{transactions.length} items</span>
          </div>

          {transactions.length === 0 ? (
            <div className="empty">
              No transactions yet.
            </div>
          ) : (
            <div className="transaction-list">
              {transactions.map((transaction) => (
                <div
                  className="transaction"
                  key={transaction.id}
                >
                  <div className="transaction-icon">
                    {transaction.type === 'income' ? '+' : '−'}
                  </div>

                  <div className="transaction-info">
                    <strong>{transaction.name}</strong>
                    <span>
                      {transaction.type === 'income'
                        ? 'Income'
                        : 'Expense'}
                    </span>
                  </div>

                  <strong
                    className={
                      transaction.type === 'income'
                        ? 'amount income'
                        : 'amount expense'
                    }
                  >
                    {transaction.type === 'income' ? '+' : '−'}
                    {formatCurrency(transaction.amount)}
                  </strong>

                  <button
                    type="button"
                    className="delete"
                    aria-label={`Delete ${transaction.name}`}
                    onClick={() =>
                      deleteTransaction(transaction.id)
                    }
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}

export default App

