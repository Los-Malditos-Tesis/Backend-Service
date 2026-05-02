export const VALIDATION_MESSAGES = {
  REQUIRED: {
    es: (field) => `${field} es un valor requerido`,
  },
  EMAIL: {
    es: (field) => `Debe ser un correo electrónico válido`,
  },
  PHONE: {
    es: (field) => `Debe ser un número de teléfono válido`,
  },
  PASSWORD: {
    es: (field) =>
      `La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número`,
  },
  ZONE: {
    es: (field) =>
      `La zona debe tener un formato valido (solo letras, números, ., _, -)`,
  },
  STRING: {
    es: (field) => `${field} debe ser una cadena de texto`,
  },
  UUID: {
    es: (field) => `${field} debe ser un id válido`,
  },
  LENGTH: {
    es: (field, min, max) =>
      `${field} debe tener entre ${min} y ${max} caracteres`,
  },
  INVALID_FORMAT: {
    es: (field) => `${field} tiene un formato inválido`,
  },
  UPPERCASE: {
    es: (field) => `${field} debe contener al menos una letra mayúscula`,
  },
  LOWERCASE: {
    es: (field) => `${field} debe contener al menos una letra minúscula`,
  },
  NUMBER: {
    es: (field) => `${field} debe contener al menos un número`,
  },
  EMPTY: {
    es: (field) => `${field} no puede estar vacío`,
  },
  MIN: {
    es: (field, min) => `${field} debe ser mayor o igual a ${min}`,
  },
  ORDER_TYPE: {
    es: (field) => `Debe ser un tipo de orden válido`,
  },
  UNIT_TYPE: {
    es: (field) => `Debe ser un tipo de unidad válido`,
  },
  STATUS: {
    es: (field) => `Debe ser un estado válido`,
  },
};
