import { useState, useEffect, useCallback } from "react";
import "./styles.scss";

import { Posts } from "../../components/Posts";
import { loadPosts } from "../../utils/load-posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export function Home() {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? posts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  });

  function loadMorePosts() {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts({
      posts,
      page: nextPage,
    });
    setPosts(posts);
    setPage(nextPage);
    console.log("adicionei");
  }
  function handleChange(e) {
    const { value } = e.target;
    setSearchValue(value);
  }

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>{searchValue}</h1>}
        <TextInput
          searchValue={searchValue}
          handleChange={(e) => handleChange(e)}
        />
      </div>
      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && (
        <p>
          {"Oops.. parece que não foi encontrado nenhum post com este nome :("}
        </p>
      )}
      <div className="button-container">
        {!searchValue && (
          <Button
            value={searchValue}
            disabled={noMorePosts}
            text={"Load More"}
            onClick={loadMorePosts}
          />
        )}
      </div>
    </section>
  );
}
