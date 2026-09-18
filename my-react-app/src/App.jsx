import './App.css'

function App() {
  const categories = [
    {
      id: 1,
      name: 'Desktop',
      budget: 61083416,
      expense: 56432600,
    },
    {
      id: 2,
      name: 'Monitor',
      budget: 8821573,
      expense: 1527750,
    },
    {
      id: 3,
      name: 'Laptop',
      budget: 15333429,
      expense: 2775000,
    },
    {
      id: 4,
      name: 'Headset',
      budget: 2000000,
      expense: 1274120,
    },
  ]

  const transactions = [
    {
      code: 'EXP-001',
      group: 'IT Equipment',
      description: 'Desktop',
      date: '09/01/2026',
      status: 'Approved',
      amount: 56432600,
    },
    {
      code: 'EXP-002',
      group: 'IT Equipment',
      description: 'Monitor',
      date: '09/03/2026',
      status: 'Approved',
      amount: 1527750,
    },
    {
      code: 'EXP-003',
      group: 'IT Equipment',
      description: 'Laptop',
      date: '09/05/2026',
      status: 'Pending',
      amount: 2775000,
    },
  ]

  const formatMoney = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  const totalBudget = categories.reduce(
    (total, category) => total + category.budget,
    0
  )

  const totalExpense = categories.reduce(
    (total, category) => total + category.expense,
    0
  )

  const remaining = totalBudget - totalExpense

  return (
    <div className="app">

      {/* Header */}
      <header className="topbar">
        <div>
          <span className="label">FINANCE</span>
          <h1>Budget Tracker</h1>
          <p>Annual budget overview · 2026</p>
        </div>

        <button className="year-button">
          2026
        </button>
      </header>


      {/* Categories */}
      <section className="section">

        <div className="section-header">
          <div>
            <h2>Budget Categories</h2>
            <p>Track your allocated and spent budget.</p>
          </div>
        </div>


        <div className="category-grid">

          {categories.map((category) => {
            const remaining =
              category.budget - category.expense

            const percentage =
              (category.expense / category.budget) * 100

            return (
              <div className="category-card" key={category.id}>

                <div className="category-top">
                  <div className="category-icon">
                    {category.name.charAt(0)}
                  </div>

                  <div>
                    <h3>{category.name}</h3>
                    <span>Budget category</span>
                  </div>
                </div>


                <div className="category-amount">
                  <span>Remaining</span>

                  <strong>
                    ₱{formatMoney(remaining)}
                  </strong>
                </div>


                <div className="category-progress">
                  <div
                    style={{
                      width: `${Math.min(
                        percentage,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>


                <div className="category-details">

                  <div>
                    <span>Budget</span>
                    <strong>
                      ₱{formatMoney(category.budget)}
                    </strong>
                  </div>

                  <div>
                    <span>Expense</span>
                    <strong className="expense-text">
                      ₱{formatMoney(category.expense)}
                    </strong>
                  </div>

                </div>

              </div>
            )
          })}

        </div>

      </section>


      {/* Transactions */}
      <section className="section">

        <div className="section-header">
          <div>
            <h2>Recent Expenses</h2>
            <p>Latest recorded budget transactions.</p>
          </div>

          <button className="view-button">
            View all
          </button>
        </div>


        <div className="table-card">

          <table>

            <thead>
              <tr>
                <th>Item Code</th>
                <th>Expense Group</th>
                <th>Description</th>
                <th>Date</th>
                <th>Status</th>
                <th className="amount-column">
                  Amount
                </th>
              </tr>
            </thead>

            <tbody>

              {transactions.map((transaction) => (
                <tr key={transaction.code}>

                  <td className="code">
                    {transaction.code}
                  </td>

                  <td>
                    {transaction.group}
                  </td>

                  <td>
                    {transaction.description}
                  </td>

                  <td>
                    {transaction.date}
                  </td>

                  <td>
                    <span
                      className={
                        transaction.status === 'Approved'
                          ? 'status approved'
                          : 'status pending'
                      }
                    >
                      {transaction.status}
                    </span>
                  </td>

                  <td className="amount-column">
                    ₱{formatMoney(transaction.amount)}
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  )
}

export default App