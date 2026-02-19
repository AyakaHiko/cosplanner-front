const STORAGE_KEY = 'token';

function safeGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch (_) {
    return null;
  }
}

function safeSet(storage, key, value) {
  try {
    storage.setItem(key, value);
  } catch (_) {
    // ignore quota or privacy mode errors
  }
}

function safeRemove(storage, key) {
  try {
    storage.removeItem(key);
  } catch (_) {
    // ignore
  }
}

export const TokenStorage = {
  getToken() {
    const fromLocal = typeof window !== 'undefined' ? safeGet(window.localStorage, STORAGE_KEY) : null;
    if (fromLocal) return fromLocal;
    return typeof window !== 'undefined' ? safeGet(window.sessionStorage, STORAGE_KEY) : null;
  },

  setToken(token, remember = false) {
    if (typeof window === 'undefined') return;
    safeRemove(window.localStorage, STORAGE_KEY);
    safeRemove(window.sessionStorage, STORAGE_KEY);
    if (remember) {
      safeSet(window.localStorage, STORAGE_KEY, token);
    } else {
      safeSet(window.sessionStorage, STORAGE_KEY, token);
    }
  },

  // Remove token from both storages
  removeToken() {
    if (typeof window === 'undefined') return;
    safeRemove(window.localStorage, STORAGE_KEY);
    safeRemove(window.sessionStorage, STORAGE_KEY);
  },

  // Convenience: build Authorization header value or return null
  getAuthHeader() {
    const token = this.getToken();
    return token ? `Bearer ${token}` : null;
  }
};
