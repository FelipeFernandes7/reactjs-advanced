import P from "prop-types";
import { PostCard } from "../PostCard";
import "./styles.scss";

export function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          body={post.body}
          cover={post.cover}
        />
      ))}
    </div>
  );
}

Posts.defaultProps = {
  posts: [],
};

Posts.propTypes = {
  posts: P.array,
};
