import { H as defineStore } from "../server.mjs";
const MOCK_USERS = {
  admin: {
    username: "admin",
    password: "admin123",
    user: { id: "1", name: "Admin", permissions: ["menu_in_todos_show"] }
  },
  guest: {
    username: "guest",
    password: "guest123",
    user: { id: "2", name: "Guest", permissions: [] }
  }
};
const useAuthStore = defineStore("auth", {
  state: () => ({
    currentUser: null
  }),
  getters: {
    hasPermission: (state) => {
      return (perm) => {
        if (!state.currentUser) return false;
        return state.currentUser.permissions.includes(perm);
      };
    }
  },
  actions: {
    loginAs(userKey) {
      this.currentUser = MOCK_USERS[userKey].user;
    },
    loginWithCredentials(username, password) {
      const cred = Object.values(MOCK_USERS).find((c) => c.username === username && c.password === password);
      if (!cred) return false;
      this.currentUser = cred.user;
      return true;
    },
    logout() {
      this.currentUser = null;
    },
    loadFromStorage() {
      return;
    }
  }
});
export {
  useAuthStore as u
};
//# sourceMappingURL=auth-D63m7rqX.js.map
