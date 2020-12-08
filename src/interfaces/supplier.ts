export interface Supplier {
  supplierId: number;
  supplierName: string;
  displayName: string;
  ranking: number;
  createdTimestamp: Date;
  createdBy: number;
  status: number;
  meta: object;
}
