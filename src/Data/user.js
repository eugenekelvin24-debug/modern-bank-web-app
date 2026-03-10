export const MOCK_DATA = {
  user: {
    name: "Kelvin",
    lastName: "Eugene",
    initials: "K",
    memberSince: "2023",
    status: "Premium Member",
    profileImage: null, 
  },
  
  accounts: [
    {
      id: "acc_1",
      label: "Main Savings",
      type: "Savings",
      balance: 24500.00,
      trend: "+2.5%",
      currency: "$",
      accountNumber: "**** 8829",
      color: "bg-indigo-600",
    },
    {
      id: "acc_2",
      label: "Checking Account",
      type: "Checking",
      balance: 1240.50,
      trend: "-1.2%",
      currency: "$",
      accountNumber: "**** 1102",
    },
    {
      id: "acc_3",
      label: "Investment Portfolio",
      type: "Investment",
      balance: 8900.00,
      trend: "+5.8%",
      currency: "$",
      accountNumber: "**** 4432",
      color: "bg-amber-600",
    }
  ],

  card: {
    number: "4290",
    fullNumber: "4290 8812 3341 0092",
    holder: "Kelvin",
    expiry: "12/28",
    cvv: "***",
    type: "Visa Platinum",
  },

  transactions: [
    {
      id: "tx_01",
      entity: "Amazon Marketplace",
      category: "Shopping",
      date: "Mar 05, 2026",
      amount: -84.99,
      status: "Completed",
      type: "debit",
      icon: "shopping-bag"
    },
    {
      id: "tx_02",
      entity: "Apple Services",
      category: "Entertainment",
      date: "Mar 04, 2026",
      amount: -14.99,
      status: "Completed",
      type: "debit",
      icon: "play"
    },
    {
      id: "tx_03",
      entity: "Monthly Salary",
      category: "Income",
      date: "Mar 02, 2026",
      amount: 4500.00,
      status: "Completed",
      type: "credit",
      icon: "dollar-sign"
    },
    {
      id: "tx_04",
      entity: "Starbucks Coffee",
      category: "Food & Drink",
      date: "Mar 02, 2026",
      amount: -6.50,
      status: "Pending",
      type: "debit",
      icon: "coffee"
    },
    {
      id: "tx_05",
      entity: "Adobe Creative Cloud",
      category: "Subscription",
      date: "Mar 01, 2026",
      amount: -52.99,
      status: "Completed",
      type: "debit",
      icon: "layers"
    },
    {
      id: "tx_06",
      entity: "Freelance Payment",
      category: "Income",
      date: "Feb 28, 2026",
      amount: 1200.00,
      status: "Completed",
      type: "credit",
      icon: "user"
    },
    {
      id: "tx_07",
      entity: "Netflix Inc.",
      category: "Subscription",
      date: "Feb 20, 2026",
      amount: -19.99,
      status: "Completed",
      type: "debit",
      icon: "tv"
    },
    {
      id: "tx_08",
      entity: "Shell Gas Station",
      category: "Transport",
      date: "Feb 19, 2026",
      amount: -55.00,
      status: "Completed",
      type: "debit",
      icon: "fuel"
    },
    {
      id: "tx_09",
      entity: "Uber Trip",
      category: "Transport",
      date: "Jan 25, 2026",
      amount: -22.40,
      status: "Completed",
      type: "debit",
      icon: "car"
    },
    {
      id: "tx_10",
      entity: "Whole Foods",
      category: "Groceries",
      date: "Jan 24, 2026",
      amount: -249.12,
      status: "Completed",
      type: "debit",
      icon: "shopping-cart"
    },
    {
      id: "tx_11",
      entity: "Dividend Payment",
      category: "Investment",
      date: "Jan 22, 2026",
      amount: 340.50,
      status: "Completed",
      type: "credit",
      icon: "trending-up"
    },
    {
      id: "tx_12",
      entity: "Rent Payment",
      category: "Housing",
      date: "Jan 01, 2026",
      amount: -1800.00,
      status: "Completed",
      type: "debit",
      icon: "home"
    }
  ]
};