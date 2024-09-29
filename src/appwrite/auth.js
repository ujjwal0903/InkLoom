import conf from '../conf/conf';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            }
            return null;
        } catch (error) {
            console.error("Error creating account:", error);
            return null;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            console.error("Login error:", error);
            return null;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            if (error.code === 401) {
                console.log("User is logged out, cannot fetch current user.");
            } else {
                console.error("Error fetching current user:", error);
            }
            return null;
        }
    }
    

    async logout() {
        try {
            await this.account.deleteSessions();
            this.clearUserSession();
            console.log("User successfully logged out");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    }

    clearUserSession() {
        localStorage.removeItem('user'); 
        localStorage.removeItem('token'); 
    }
}

const authService = new AuthService();

export default authService;
