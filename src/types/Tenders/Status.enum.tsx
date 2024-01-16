export enum TenderItemStatus {
  PENDING = -1,
  ENDED = 0,
  ONGOING = 1,
  EXCLUDED = 2,
  SENT = 3,
}

export enum TenderApprovalStatus {
  NONE = -1,
  ACCEPTED = 1,
  REJECTED = 0,
}

export enum TenderStep {
  ACCEPTION = "1",
  PURCHASE = "2",
  TECHNICAL = "3",
  FINANCIAL = "4",
  FILE = "5",
  APPLY = "6",
}
export enum TenderPay {
  PAYED = 1,
  NOTPAYED = -1,
}
