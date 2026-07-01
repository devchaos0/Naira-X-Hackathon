// app/component/squadfund/squadfund.types.ts
//
// Replaces the CrowdFundItem / CreateCrowdFundForm shapes from api/type.ts.
// If those types are used elsewhere in your app (e.g. a detail screen),
// update those call sites to import from here, or merge these into
// api/type.ts and delete the old shapes.

export type SquadFundVisibility = 'public' | 'private';

export interface Contributor {
  id: string;
  name: string;
  initials: string;
  amount: number;
  isCurrentUser?: boolean;
}

export interface SquadFundItem {
  id: string;
  name: string;
  details: string;
  duration: string;
  targetAmount: number;
  raisedAmount: number;
  visibility: SquadFundVisibility;
  /** Only present when visibility === 'private'. Used to join. */
  inviteCode?: string;
  createdAt: string;
  creatorId: string;
  contributors: Contributor[];
}

export interface CreateSquadFundForm {
  name: string;
  details: string;
  duration: string;
  amount: string;
  visibility: SquadFundVisibility;
}