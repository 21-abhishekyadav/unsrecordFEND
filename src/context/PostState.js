import React, { useState } from 'react'
import postContext from './postContext';


export default function NoteState(props) {
    const host = "https://unsrecordbend.onrender.com"
    
 
    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    

    //something  
   
    const getpost = async (page = 1, reset = false) => {
        try {
            const categoryData = JSON.parse(localStorage.getItem("categoryEngagement")) || {};
            let totalEngagement = Object.values(categoryData).reduce((sum, count) => sum + count, 0) || 1;
            let allPosts = [];
    
            // Sort categories by engagement count (descending order)
            const sortedCategories = Object.entries(categoryData)
                .sort(([, a], [, b]) => b - a) // Sort by highest engagement first
                .map(([category]) => category);
    
            for (const category of sortedCategories) {
                let categoryLimit = Math.round((categoryData[category] / totalEngagement) * 10) || 1; // Distribute 10 posts
    
                const response = await fetch(`${host}/posts?page=${page}&limit=${categoryLimit}&category=${encodeURIComponent(category)}`, {
                    method: "GET",
                    headers: { 'Content-Type': 'application/json' },
                });
    
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
                const json = await response.json();
                allPosts = [...allPosts, ...json]; // Append posts from each category
            }
    
            setPosts(prevPosts => {
                const newPosts = reset ? allPosts : [...prevPosts, ...allPosts];
    
                // Remove duplicates based on unique post _id
                const uniquePosts = Array.from(new Map(newPosts.map(post => [post._id, post])).values());
                return uniquePosts;
            });
    
        } catch (error) {
            console.error("Error fetching posts:", error.message);
        }
    };
    

    // add a post
    const addpost = async (newpost) => {
        const Title = newpost.Title;
        const Subheading = newpost.Subheading;
        const Description = newpost.Description;
        const Category = newpost.Category;


        //API CALL
        const resposne = await fetch(`${host}/posts/newpost`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ Title,Subheading, Description,Category })

        });
        const json = resposne.json()
        getpost()
    }

    



    return (
        <postContext.Provider value={{ posts,addpost,getpost}}>
            {props.children}
        </postContext.Provider>
    )
}

