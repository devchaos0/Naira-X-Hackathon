export interface CrowdFundItem {
  id: string;
  name: string;
  details: string;
  duration: string;
  targetAmount: number;
  raisedAmount: number;
  code: string;
  createdAt: string;
  creatorId: string;
}

export interface CreateCrowdFundForm {
  name: string;
  details: string;
  duration: string;
  amount: string;
}
