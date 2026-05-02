export const obfuscatePass = (data = {}) => {
  if (!data || typeof data !== "object") return data;
  const clone = { ...data };

  if ("password" in clone) {
    clone.password = "[PASSWORD]";
  }

  if ("roles" in clone) {
    clone.roles = "[ROLES]";
  }
  return clone;
};

export const obfuscateRoles = (data = {}) => {
  if (!data || typeof data !== "object") return data;
  const clone = { ...data };

  if ("roles" in clone) {
    clone.roles = "[ROLES]";
  }
  return clone;
};

export const obfuscateToken = (data = {}) => {
  if (!data || typeof data !== "object") return data;
  const clone = { ...data };

  if ("content" in clone) {
    clone.content = "[TOKEN]";
  }

  if ("token" in clone) {
    clone.token = "[TOKEN]";
  }

  return clone;
};

export const obfuscateApiKey = (data = {}) => {
  if (!data || typeof data !== "object") return data;
  const clone = { ...data };

  if ("content" in clone) {
    clone.content = "[APY_KEY]";
  }

  if ("token" in clone) {
    clone.token = "[APY_KEY]";
  }

  return clone;
};
