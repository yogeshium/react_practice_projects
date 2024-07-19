import { Client, Databases, Storage, ID, Query } from "appwrite";
import config from "../config/config";

export class DbService {
  client = new Client();
  database;
  storage;

  constructor() {
    this.client.setEndpoint(appwriteUrl).setProject(appwriteProjectId);
    this.database = new Databases(client);
    this.storage = new Storage(client);
  }

  async createPost({ title, content, featuredImage, slug, status, userId }) {
    try {
      return await this.database.createDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (err) {
      console.log("createPost: ", err);
    }

    return null;
  }

  async updatePost(
    slug,
    { title, content, featuredImage, slug, status, userId }
  ) {
    try {
      return await this.database.updateDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (err) {
      console.log("updatePost: ", err);
    }
    return null;
  }

  async deletePost(slug) {
    try {
      await this.database.deleteDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (err) {
      console.log("deletePost: ", err);
    }
  }

  async getPost(slug) {
    try {
      return await this.database.getDocument(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        slug
      );
    } catch (err) {
      console.log("getPost: ", err);
    }

    return null;
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.database.listDocuments(
        config.appwriteDatabaseId,
        config.appwriteCollectionId,
        queries
      );
    } catch (err) {
      console.log("getPosts: ", err);
    }

    return null;
  }


  // Storage methods 

  async uploadFile(file){
    try{
       await this.storage.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file   
      )
      return true;
    }
    catch(err){
      console.log("uploadFile: ",err)
    }
    return null;
  }

  async deleteFile(fileId){
    try{
      return await this.storage.deleteFile(
        config.appwriteBucketId,
        fileId
      )
    }
    catch(err){
      console.log("DeleteFile: ",err);
    }
    return null;
  }

  getFilePreview(fileId)
  {
    return this.storage.getFilePreview(
      config.appwriteBucketId,
      fileId
    )
  }
}
