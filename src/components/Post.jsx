import { formatISO9075 } from "date-fns";
import { Link } from "react-router-dom";

function Post({ _id, title, summary, cover, createdAt, author }) {
  // safely get username
  const username = author?.username;

  let authorClass = "author";

  if (username === "goga") {
    authorClass += " admin-goga";
  } else if (username === "Nippleman") {
    authorClass += " admin";
  }

  return (
    <div className="post-wrapper">
      <div className="post">
        <div className="image">
          <Link to={`/post/${_id}`}>
            <img src={cover || ""} alt={title} />
          </Link>
        </div>

        <div className="texts">
          <Link to={`/post/${_id}`}>
            <h2>{title}</h2>
          </Link>

          <p className="info">
            <span className={authorClass}>{username || "Unknown author"}</span>

            <time className="info-time">
              {createdAt ? formatISO9075(new Date(createdAt)) : ""}
            </time>
          </p>

          <p className="summary">{summary}</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
