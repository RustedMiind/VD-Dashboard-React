export enum TenderItemStatus {
  PENDING = -1,
  ENDED = 0,
  ONGOING = 1,
  EXCLUDED = 2,
  SENT = 3,
  FINANCIAL_EXCLUDE = 4,
  AWARDED = 5,
  TECHNICAL_REVIEW = 6,
}

export enum TenderApprovalStatus {
  NONE = TenderItemStatus.PENDING,
  ACCEPTED = TenderItemStatus.ONGOING,
  REJECTED = TenderItemStatus.ENDED,
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
  PAYED = TenderItemStatus.ONGOING,
  NOTPAYED = TenderItemStatus.PENDING,
}
