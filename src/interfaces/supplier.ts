export interface Supplier {
  supplierId: number;
  supplierName: string;
  supplierLocalized: object;
  description: string;
  ranking: number;
  createdTimestamp: Date;
  createdBy: number;
  status: number;
  meta: object;
}
