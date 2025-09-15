import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";

class AuthStore {
  accessToken = (typeof window !== "undefined" && typeof localStorage !== "undefined" && localStorage.getItem("accessToken")) || null;
  user = null;
  loading = false;
  error = null;

  constructor() {
    makeAutoObservable(this);
    // Rehydrate user from token if available (browser only)
    if (typeof window !== "undefined" && this.accessToken) {
      this.user = this.parseJwt(this.accessToken);
    }
  }

  async login(email, password) {
    this.loading = true;
    this.error = null;
    try {
      const res = await axios.post("/api/auth/login", { email, password }, { withCredentials: true });
      runInAction(() => {
        this.accessToken = res.data.accessToken;
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
          localStorage.setItem("accessToken", this.accessToken);
        }
        this.user = this.parseJwt(this.accessToken);
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.response?.data?.error || "Login failed";
      });
    } finally {
      runInAction(() => { this.loading = false; });
    }
  }

  async register(email, password) {
    this.loading = true;
    this.error = null;
    try {
      const res = await axios.post("/api/auth/register", { email, password }, { withCredentials: true });
      runInAction(() => {
        this.accessToken = res.data.accessToken;
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
          localStorage.setItem("accessToken", this.accessToken);
        }
        this.user = this.parseJwt(this.accessToken);
      });
    } catch (err) {
      runInAction(() => {
        this.error = err.response?.data?.error || "Register failed";
      });
    } finally {
      runInAction(() => { this.loading = false; });
    }
  }

  async refresh() {
    try {
      const res = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
      runInAction(() => {
        this.accessToken = res.data.accessToken;
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
          localStorage.setItem("accessToken", this.accessToken);
        }
        this.user = this.parseJwt(this.accessToken);
      });
    } catch {
      this.logout();
    }
  }

  logout() {
  this.accessToken = null;
  this.user = null;
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      localStorage.removeItem("accessToken");
    }
  axios.post("/api/auth/logout", {}, { withCredentials: true });
  }

  get isAuthenticated() {
    return !!this.accessToken;
  }

  async checkAuth() {
    if (!this.accessToken) {
      await this.refresh();
    }
  }

  parseJwt(token) {
    if (!token) return null;
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  }
}

export const authStore = new AuthStore();
