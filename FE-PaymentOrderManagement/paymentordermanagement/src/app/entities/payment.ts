export interface Payment {
    id: string
    creditor_account: string
    debtor_account: string
    amount: number
    date: string
    currency: string
    is_deleted: boolean
  }