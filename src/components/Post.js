import React from 'react'
import Displaypost from './Displayposts';
import { useContext, useEffect, useState } from 'react'
import postContext from '../context/postContext'
import Masonry from "masonry-layout";

export default function Posts() {
  const { posts, getpost } = useContext(postContext);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  // Initial load
  useEffect(() => {   
    const fetchInitialPosts = async () => {
      console.log("fetching");
      setLoading(true);
      await getpost(1, true);  // Reset posts for initial load
      console.log("fetched");
      setLoading(false);
      setInitialLoad(false);
    };
    fetchInitialPosts();
  }, []);

  // Masonry layout
  useEffect(() => {
    if (posts.length > 0) {
      new Masonry(".masonry-grid", {
        itemSelector: ".masonry-item",
        columnWidth: ".masonry-item",
        percentPosition: true,
        gutter: 0,
      });
    }
  }, [posts]);

  // Load more function
  const loadMore = async () => {
    console.log("loading");
    setLoading(true);
    try {
      await getpost(page + 1, false);  // Don't reset posts for subsequent loads
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error("Error loading more posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // ... (rest of your code remains the same)

  return (
    <div className='row masonry-grid' style={{ marginLeft: "-10px", width: "80vw" }}>
      {initialLoad && loading ? (
        <div className="d-flex justify-content-center align-items-center py-5 my-5 w-100">
          <div className="text-center">
            <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="mt-3 text-muted">Loading posts...</h5>
          </div>
        </div>
      ) : (
        <>
          {posts.map((post) => <Displaypost key={post._id} post={post} />)}
          
          {posts.length > 0 && (
            <div className="text-center mt-4">
              <button 
                onClick={loadMore} 
                disabled={loading} 
                className="btn btn-primary btn-lg px-4"
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Loading...
                  </>
                ) : (
                  'Load More Posts'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}