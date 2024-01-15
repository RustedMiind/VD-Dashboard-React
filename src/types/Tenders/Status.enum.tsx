export enum TenderItemStatus {
  SENT = -1,
  ENDED = 0,
  ONGOING = 1,
  EXCLUDED = 2,
}

export enum TenderApprovalStatus {
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
