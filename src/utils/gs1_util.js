import { Log } from "../libs/logger/logger.js";
import { ORDER_UNIT_TYPES } from "../utils/const/status.js";

const AI_CODES = {
  SSCC: "(00)",
  GTIN: "(01)",
  COUNT30: "30",
  COUNT37: "37",
};

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
    const ssccMatch = gs1Code.match(/\(00\)(\d{18})/);

    // Si no tiene (00) pero tiene (01), lo tratamos como BOX
    const gtinMatch = gs1Code.match(/\(01\)(\d{14})/);

    // serial could be alfa numeric only used for box (to add on tesis TODO )
    const serialMatch = gs1Code.match(/\(21\)([\w\d]+)/);

    if (ssccMatch) {
      decodedGs1.sscc = ssccMatch[1];
      decodedGs1.code = ssccMatch[1];
      decodedGs1.unit_type = ORDER_UNIT_TYPES.PALLET;
      decodedGs1.productCode = gtinMatch ? gtinMatch[1] : null;
    } else if (gtinMatch) {
      decodedGs1.productCode = gtinMatch[1];
      decodedGs1.gtin = gtinMatch[1];
      decodedGs1.unit_type = ORDER_UNIT_TYPES.BOX;

      if (serialMatch) {
        decodedGs1.code = serialMatch[1];
      }
    }
    // Extraer cantidades dinámicamente
    decodedGs1.count30 = parseInt(extractAI(gs1Code, AI_CODES.COUNT30) || 0);
    decodedGs1.count37 = parseInt(extractAI(gs1Code, AI_CODES.COUNT37) || 1);

    // Fallback: si no se detectó por AI, intentamos inferir por longitud o formato
    if (!decodedGs1.unit_type) {
      decodedGs1.unit_type = inferUnitType(gs1Code);
    }

    return decodedGs1;
  } catch (error) {
    Log.errorCtx(null, "Error parsing GS1:", error);
    return null;
  }
};

const extractAI = (code, ai) => {
  const regex = new RegExp(`\\(${ai}\\)(\\d+)`);
  const match = code.match(regex);
  return match ? match[1] : null;
};

const inferUnitType = (code) => {
  // códigos muy largos suelen ser Pallets (SSCC)
  return code.length > 20 ? ORDER_UNIT_TYPES.PALLET : ORDER_UNIT_TYPES.BOX;
};
