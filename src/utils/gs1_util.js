import { Log } from "../libs/logger/logger.js";
import { ITEM_TYPES, ORDER_UNIT_TYPES } from "../utils/const/status.js"

export const parseGS1 = (gs1Code = "") => {
  if (!gs1Code || typeof gs1Code !== "string") return null;

  const decodedGs1 = {
    raw: gs1Code,
    code: null,
    sscc: null, // AI (00)
    gtin: null, // AI (01)
    count30: 0, // AI (30) - Unidades por item
    count37: 0, // AI (37) - Cantidad de bultos
    unit_type: null,
    confidence: 0,
  };

  try {
    // Buscamos el SSCC (00) para determinar si es PALLET, tiene 18 dígitos después del (00)
    const ssccMatch = gs1Code.match(/\(00\)(\d{5})(?!\d)/);
    // Si no tiene (00) pero tiene (01), lo tratamos como BOX
    const gtinMatch = gs1Code.match(/\(01\)(\d{5})(?!\d)/);
    // serial could be alfa numeric only used for box (to add on tesis TODO )
    const serialMatch = gs1Code.match(/\(21\)([^\\(]+)/);

    const count30Match = gs1Code.match(/\(30\)(\d+)/);
    const count37Match = gs1Code.match(/\(37\)(\d+)/);

    if (ssccMatch) {
      if (!gtinMatch || !count30Match || !count37Match) {
        Log.error("GS1 Parsing Failed: Pallet lacks mandatory AIs (01, 30 or 37)");
        return null;
      }
      decodedGs1.sscc = ssccMatch[1];
      decodedGs1.code = ssccMatch[1];
      decodedGs1.unit_type = ITEM_TYPES.PALLET;
      decodedGs1.gtin = gtinMatch ? gtinMatch[1] : null;
      decodedGs1.count37 = parseInt(count37Match[1] || 0);
      decodedGs1.count30 = parseInt(count30Match[1] || 0);

    } else if (gtinMatch) {

      if (!serialMatch || !count30Match) {
        Log.error("GS1 Parsing Failed: Box lacks mandatory AIs (21 or 30)");
        return null;
      }
      decodedGs1.gtin = gtinMatch[1];
      decodedGs1.unit_type = ITEM_TYPES.BOX;
      decodedGs1.count30 = parseInt(count30Match[1] || 0);

      if (serialMatch) {
        decodedGs1.code = serialMatch[1];
      }
    }

    if (!decodedGs1.unit_type) {
      Log.error("GS1 Parsing Failed: Code does not strictly match 5-digit simulation formats.");
      return null;
    }

    return decodedGs1;
  } catch (error) {
    Log.errorCtx(null, "Error parsing GS1:", error);
    return null;
  }
};