export enum TenderItemStatus {
  PENDING = -1,
  ENDED = 0,
  ONGOING = 1,
}
export enum TenderEntityStatus {
  // PENDING = -1,
  ONGOING = 1,
  SENT = 2,
  NOT_SENT = -1,
  ENDED = 4,
  AWARDED = 5,
  TECHNICAL_REVIEW = 6,
  EXCLUDED = 7,
  FINANCIAL_EXCLUDE = 8,
}
export enum TenderApprovalStatus {
  NONE = TenderItemStatus.PENDING,
  ACCEPTED = TenderItemStatus.ONGOING,
  REJECTED = TenderItemStatus.ENDED,
}

export enum TenderStep {
  ACCEPTION = 1,
  PURCHASE = 2,
  TECHNICAL = 3,
  FINANCIAL = 4,
  FILE = 5,
  APPLY = 6,
}
export enum TenderPay {
  PAYED = TenderItemStatus.ONGOING,
  NOTPAYED = 0,
  PENDING = TenderItemStatus.PENDING,
}
