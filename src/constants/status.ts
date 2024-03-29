export const STATUS_CODE = {
    OK: 0,
    NETWORK_ERROR: -1,
    INTERNAL_SERVER_ERROR: 1000,
    UNKNOWN_SOCIAL: 1001,
    INVALID_TOKEN: 1002,
    NOT_FOUND_USER: 2000,
    NOT_FOUND_COURSE: 3000,
    NOT_ADMIN_COURSE: 3001,
    NOT_FOUND_PIN: 4000,
    EXCEED_PIN_LIMIT: 4001,
    NOT_FOUND_EDITOR: 5000,
    NOT_VALID_KEY: 5001,
    ALREADY_EXIST_EDITOR: 5002,
    FAILED_DELETE_EDITOR: 5003,
    EXCEED_EDITOR_LIMIT: 5004,
    FAILED_ENCRYPT: 6000,
    FAILED_DECRYPT: 6001,
} as const;
