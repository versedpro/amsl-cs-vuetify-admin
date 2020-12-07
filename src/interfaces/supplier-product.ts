export interface SupplierProduct {
  supplierProductId: number;
  supplierId: number;
  productId: number;
  remarks: string;
  pointsLimit: number;
  points: number;
  createdTimestamp: Date;
  createdBy: number;
  status: number;
  meta: object;
}
