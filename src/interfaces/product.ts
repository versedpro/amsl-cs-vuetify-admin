export interface Product {
  productId: number;
  productName1: string;
  productName2:string;
  productLocalized: object;
  industryId: string;
  points: number;
  createdTimestamp: Date;
  createdBy: number;
  statusFlag: number;
  meta: object;
}
