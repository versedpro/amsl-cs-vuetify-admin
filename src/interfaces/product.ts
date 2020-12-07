export interface Product {
  productId: number;
  productName: string;
  productLocalized: object;
  industryId: string;
  points: number;
  createdTimestamp: Date;
  createdBy: number;
  statusFlag: number;
  meta: object;
}
