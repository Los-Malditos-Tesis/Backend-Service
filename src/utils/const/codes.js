export const CODES = {
    SUCCESS: {
        OK: 0o0,
        CREATED: 0o1,
    },
    AUTH: {
        NOT_FOUND: 1000,
        ALREADI_ALREADY_EXISTS: 1001,
        INVALID_CREDENTIALS: 1002,
        INAUTHORIZED: 1003,
        FORBIDDEN: 1004
    },
    VALIDATION: {
        INVALID_INPUT: 2000,
        MISSING_FIELDS: 2001,
    },
    RESOURCE: {
        NOT_FOUND: 3000,
        ALREADY_EXISTS: 3001,
        INVALID_OPERATION: 3002,
    },
    USER:{
        ALREADY_EXISTS: 4000,

    },
    SERVER: {
        INTERNAL_ERROR: 5000,
    },
    
}
