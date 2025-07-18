import { useEffect, useRef, useState } from "react";
import { fetcher } from "./fetcher";

export function UserPublications() {
  const [lastPost, setLastPost] = useState(null);
  const [previousPosts, setPreviousPosts] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("journal");

    (async () => {
      const posts = await fetcher({
        url: `http://localhost:8080/api/posts/get`,
        method: "POST",
        body: { username: userData },
      });

      if (!posts.success) {
        console.error("someting went wrong");
      }

      const entries = posts.data;
      if (entries.length === 7) {
        const todayPost = entries.shift();
        setLastPost(todayPost);
      }
      setPreviousPosts(entries);
    })();
  }, []);

  console.log(lastPost);

  return (
    <>
      {lastPost ? (
        <SinglePost
          post_date={lastPost.post_date}
          post_text={lastPost.post_text}
          post_color={lastPost.post_color}
        />
      ) : (
        <PostForm updatePostCallbak={setLastPost} />
      )}
      {previousPosts.map((post, i) => (
        <SinglePost
          key={i}
          post_date={post.post_date}
          post_text={post.post_text}
          post_color={post.post_color}
        />
      ))}
    </>
  );
}

export function PostForm({ updatePostCallbak }) {
  const textRef = useRef(null);
  const [warn, setWarn] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = localStorage.getItem("journal");

    const response = await fetcher({
      url: `http://localhost:8080/api/posts/publish`,
      method: "POST",
      body: { username: userData, post: textRef.current.value },
    });

    if (!response) {
      setWarn("Something happen and cannot publish at this time, try later");
    }

    const { data } = response;
    updatePostCallbak(data[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      {warn && <div className="error">{warn}</div>}
      <label>
        ¿¿¿Qué sucedió hoy???
        <textarea name="post" ref={textRef}></textarea>
      </label>
      <button>Guardar</button>
    </form>
  );
}

function SinglePost({ post_date: date, post_text: text, post_color: color }) {
  if (!date || !text || !color) {
    return <></>;
  }

  const formattedDate = date.toLocaleString().slice(0, 10);
  return (
    <div className="post" data-color={color}>
      <div className="date">{formattedDate}</div>
      <div className="text">{text}</div>
    </div>
  );
}
