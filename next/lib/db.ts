import Dexie, { IndexableType, Table } from "dexie";

export interface Mortgage {
  id?: IndexableType;
  lender: string;
  interestRate: number | "";
  monthlyPandI: number | "";
  discountPointPayment: number | "";
  otherUpfrontCosts: number | "";
  upfrontCredits: number | "";
  isNew: boolean;
}

export class MySubClassedDexie extends Dexie {
  // 'mortgages' is added by dexie when declaring the stores()
  // I need a non-null assertion here.
  mortgages!: Table<Mortgage>;

  constructor() {
    super("mortgageAppDatabase");
    this.version(1).stores({
      mortgages:
        "++id, lender, interestRate, monthlyPandI, discountPointPayment, otherUpfrontCosts, upFrontCredits", // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
