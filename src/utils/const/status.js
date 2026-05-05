export const PALLETS_STATUS = {
  CREATED: "CRE", // when qr scanned initial state
  STORED: "STO", // located to each location (when scanned to the current location id cam)
  RESERVED: "RES", // reserved to some other warehouse or store
  PP_DISPATCHED: "PPD", // picked, packed and dispached (ready and in process to be delivered)
  DELIVERED: "DEL", // delivered to final location
  CANCELLED: "CAN", // canceled and returned to warehouse
};

export const ITEM_TYPES = {
  BOX: "BOX", // smallest item stored in warehouse box could contain 1 or more items
  PALLET: "PAL", // pallet contain 1 or more boxes stored inside
};

export const ENTITY_ACTIONS = {
  DELETE: "DEL",
  CREATE: "CRE",
  UPDATE: "UPD",
};

export const ENTITY_NAME = {
  SUPPLIER: "suppliers",
  WAREHOUSE: "warehouses",
  LOCATION: "locations",
  CAMERA: "cameras",
  PRODUCT: "products",
  ROLE: "roles",
  USER: "users",
};

export const MOVEMENT_TYPE = {
  EXIT: "SLD",
  ENTRY: "ENT",
};

export const SUCCESS_CODES = {
  OK: 0o0,
  CREATED: 0o1,
  UPDATED: 0o2,
  DELETED: 0o3,
};

export const ORDER_TYPES = {
  SALE: "SALE",
  TRANSFER: "TRANSFER",
};

export const ORDER_UNIT_TYPES = {
  PALLET: "PALLET",
  BOX: "BOX",
};

export const ORDER_STATUS = {
  PENDING: "PENDING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

export const DEVICE_STATUS = {
  OK: "OK",
  WARN: "WAR",
  ERROR: "ERR",
};
