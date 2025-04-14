import React, { useState } from 'react'
import postContext from './postContext';


export default function NoteState(props) {
    const host = "https://unsrecordbend.onrender.com"
    
 
    const [posts, setPosts] = useState([]);
    const defaultCategories = {
        "Technology": 1,
        "Health & Wellness": 1,
        "Education & Learning": 1,
        "Lifestyle & Productivity": 1,
        "Entertainment & Pop Culture": 1,
        "General": 1
      };
    

    //something  
   
    const getpost = async (page = 1, reset = false) => {
        try {
            const categoryData = JSON.parse(localStorage.getItem("categoryEngagement")) || defaultCategories;
            const sortedCategories = Object.entries(categoryData)
            .sort(([, a], [, b]) => b - a)
            .map(([category]) => category);
            const totalEngagement = Object.values(categoryData).reduce((sum, count) => sum + count, 0) ||1;
            let allPosts = [];

            for (const category of sortedCategories) {
                let categoryLimit = categoryData[category]
                  ? Math.round((categoryData[category] / totalEngagement) * 10)
                  : 1;
              
                const response = await fetch(`${host}/posts?page=${page}&limit=${categoryLimit}&category=${encodeURIComponent(category)}`, {
                  method: "GET",
                  headers: { 'Content-Type': 'application/json' },
                });
              
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
              
                const json = await response.json();
                allPosts = [...allPosts, ...json];
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

