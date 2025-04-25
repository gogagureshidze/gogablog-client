import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatISO9075 } from "date-fns";
import { UserContext } from "../context/userContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button, CircularProgress } from "@mui/material";
import { TiEdit } from "react-icons/ti";
import { LoadingScreen } from "../components/LoadingScreen";

function PostPage() {
  const { id } = useParams();
  const { userInfo } = useContext(UserContext);
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/post/${id}`)
      .then((response) => response.json())
      .then((postInfo) => {
        setPostInfo(postInfo);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div>
        <LoadingScreen></LoadingScreen>
      </div>
    );
  }

  if (!postInfo) {
    return <div>Error loading post.</div>;
  }

 return (
   <div
     style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
   >
     <Navbar />
     <div className="page-content" style={{ flex: 1 }}>
       <div className="post-page-container">
         <div className="post-page">
           <h1 style={{ marginBottom: "20px", marginTop: "25px" }}>
             {postInfo.title}
           </h1>
           <time>
             {postInfo.createdAt && formatISO9075(new Date(postInfo.createdAt))}
           </time>
           <div className="author">
             by {postInfo.author && postInfo.author.username}
           </div>

           {userInfo && userInfo.user._id === postInfo.author._id && (
             <div className="edit">
               <Link to={`/edit/${postInfo._id}`}>
                 <Button
                   variant="contained"
                   size="large"
                   sx={{
                     backgroundColor: "#14274E",
                     color: "#FFFFFF",
                     transition: "all 0.3s ease",
                     "&:hover": {
                       backgroundColor: "#FACC15",
                       color: "#14274E",
                       transform: "translateY(1px)",
                       fontWeight: "900",
                     },
                   }}
                   disabled={loading}
                 >
                   {loading ? (
                     <CircularProgress size={24} />
                   ) : (
                     <div
                       style={{
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                         gap: "10px",
                         textTransform: "capitalize",
                         fontWeight: "bold",
                       }}
                     >
                       Edit post
                       <TiEdit style={{ fontSize: "20px" }} />
                     </div>
                   )}
                 </Button>
               </Link>
             </div>
           )}

           <div className="image">
             <img
               src={`https://gogablog-api.onrender.com/${postInfo.cover}`}
               alt=""
             />
           </div>
           <div
             className="content"
             dangerouslySetInnerHTML={{ __html: postInfo.content }}
           ></div>
         </div>
       </div>
     </div>
     <Footer />
   </div>
 );

}

export default PostPage;
