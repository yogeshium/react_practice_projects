import React from "react";
import appwriteService from "../appwrite/db";
import { Link } from "react-router-dom";
import "./App.css"

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div class="card">
        <img src={appwriteService.getFilePreview(featuredImage)} alt={`image of topic ${title}`} />
        <div class="card-content">
          <h2>{title}</h2>
          <p></p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard
