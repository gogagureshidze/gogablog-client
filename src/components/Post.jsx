import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

function Post({ _id, title, summary, cover, createdAt, author }) {

  let authorClass = "";

if(author.username === 'goga') {
  authorClass = "author admin-goga"
}
if (author.username === "Nippleman") {
  authorClass = "author admin";
}



  return (
    <div className="post-wrapper">
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={cover ? "" + cover : ""} alt={title} />
          </Link>
        </div>

        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>
          <p className="info">
            <span className={authorClass}>
              {author?.username || "Unknown author"}
            </span>
            <time className="info-time">
              {formatISO9075(new Date(createdAt), "MMM d, yyyy HH:mm")}
            </time>
          </p>
          <p className="summary">{summary}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
