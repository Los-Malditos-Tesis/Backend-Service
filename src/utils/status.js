export const PALLETS_STATUS = {
    CREATED: 'CRE',        // when qr scanned initial state
    STORED: 'STO',          // located to each location (when scanned to the current location id cam)
    RESERVED: 'RES',      // reserved to some other warehouse or store
    PP_DISPATCHED: 'PPD',          // picked, packed and dispached (ready and in process to be delivered)
    DELIVERED: 'DEL',    // delivered to final location
    CANCELLED: 'CAN'     // canceled and returned to warehouse
};