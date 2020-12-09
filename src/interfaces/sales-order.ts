export interface Staff {
  salesOrderId: number;
  referloId: number;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactOtherInfo: object;
  supplierProductId: number;
  supplierSalesAdmin: number;
  supplierSalesAppointedTime: Date;
  supplierSalesId: number;
  supplierOtherInfo: object;
  pointsDefault: number;
  pointsFinal: number;
  pointsLevel0: number;
  pointsLevel1: number;
  pointsLevel2: number;
  salesOrderProcessTimestamp: Date;
  createdTimestamp: Date;
  statusFlag: number;
  meta: object;
}
