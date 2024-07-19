import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, username }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        username
      );
      if (userAccount) {
        return this.login(email, password);
      } else {
        return null;
      }
    } catch (err) {
      console.log("auth - createAccount: ",err);
    }
    return null;
  }

  async login({email,password}){
    try{
        return await this.account.createEmailPasswordSession(email, password);
    }
    catch(err){
      console.log("auth - login: ",err);
    }
    return null;
  }

  async logout(){
    try{
        await this.account.deleteSessions();
    }
    catch(err){
        console.log("auth - logout: ",err);
    }
  }

  async getCurrentUser(){
    try{
        const user = await this.account.get();
        if(user)
          return user;
        else 
          return null;
    }
    catch(err){
        console.log("getCurrentUser: ",err);
    }
    return null;
  }
}


const authService = new AuthService();

export default authService;