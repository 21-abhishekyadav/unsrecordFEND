import React from 'react'
import '../App.css';
import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal';
import bg from './images/bg1.jpeg'
import Masonry from "masonry-layout";




export default function Displayposts(props) {
    const { post } = props;

    // get user details
    const host = "https://unsrecordbend.onrender.com"
    const userinfo = {}
    const [user, Setuser] = useState(userinfo)


    const userdetails = async (id) => {
        // API CALL
        const response = await fetch(`${host}/posts/getuser/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },

        });

        const json = await response.json()
        Setuser(json)
    }
    // map user details 
    useEffect(() => {
        userdetails(post.User);

    }, [])







    // for post as button
    const [modalShow, setModalShow] = React.useState(false);
    const handleshow = () => { 
        setModalShow(true) 
        let categoryData = JSON.parse(localStorage.getItem("categoryEngagement")) || {};
        categoryData[post.Category] = (categoryData[post.Category] || 0) + 1;
        localStorage.setItem("categoryEngagement", JSON.stringify(categoryData));
    };
    const handleclose = () => { setModalShow(false) };






    // like the post
    const [like, setlike] = React.useState("bi bi-heart");
    const [likenum, setlikenum] = React.useState(post.Likes);

    const handlelike = async () => {
        if (like == ("bi bi-heart")) {
            // api calling 
            const response = await fetch(`${host}/posts/addlike/${post._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json()
            setlike("bi bi-heart-fill");
            setlikenum(likenum +1);

            // recommender system
            let categoryData = JSON.parse(localStorage.getItem("categoryEngagement")) || {};
             categoryData[post.Category] = (categoryData[post.Category] || 0) + 2; 
             // Higher weight for likes
            localStorage.setItem("categoryEngagement", JSON.stringify(categoryData));


        }
        else { 
            const response = await fetch(`${host}/posts/removelike/${post._id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const json = await response.json()
            setlikenum(likenum -1);
            setlike("bi bi-heart") 
            // recommender system
            let categoryData = JSON.parse(localStorage.getItem("categoryEngagement")) || {};
             categoryData[post.Category] = (categoryData[post.Category] || 0) - 2; 
             // Higher weight for likes
            localStorage.setItem("categoryEngagement", JSON.stringify(categoryData));
        }

    };







    // masonary
    useEffect(() => {
        // Initialize Masonry after component mounts
        new Masonry(".masonry-grid", {
            columnWidth: ".masonry-item",
            percentPosition: true,
            gutter: 0, // Space between items
        });
    }, []);

    const masonryItemStyle = {
        paddingLeft: "10px",
        marginBottom: "10px",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",

    };







    const col = ["info", "warning", "primary", "success", "danger", "secondary"]
    return (

        <div className='col-md-4 masonry-item' style={masonryItemStyle} >
            <div className={`  my-3 p-3 bg-${col[Math.floor(Math.random() * 6)]} bg-opacity-10   rounded-end cursor-pointer `}
                style={{
                    width: "100%",
                }} >
                <div onClick={handleshow}
                    style={{
                        cursor: "pointer",
                        width: "100%",

                    }} className="text-wrap">
                    
                    <p className="card-title fs-4 "> <b>{post.Title}</b></p>
                    <p className="card-title fs-4 ">{post.Subheading}</p>  
                    <p className="fs-6 text-end ">{post.Category}</p>


                </div>
                <hr />
                <div>
                    <div className="  fs-5  d-flex flex-row" >
                        <p className={`${like} m-0 p-0 `}
                           style={{cursor: "pointer"}}
                           onClick={handlelike}>
                        </p>
                        <p className="  fs-5 px-2"
                        >{likenum}</p>

                    </div>
                </div>

            </div>

            <Modal
                show={modalShow}
                onHide={handleclose}
                backdrop="static"
                keyboard={false}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >


                <Modal.Body
                    className={`  m-2 my-2 p-3 bg-${col[Math.floor(Math.random() * 6)]} bg-opacity-10 border-info  rounded-end  my-0`}

                >
                    <button type="button" class="btn-close" aria-label="Close" onClick={handleclose}></button>
                    <br></br>
                    <br></br>

                    <div onClick={handleshow}>
                        <div >
                            <p className="card-title fs-2"> <b>{post.Title}</b></p>
                            <p className="card-title fs-4 ">{post.Subheading}</p>              
                            <p className="  box fs-6 lh-sm">{post.Description}</p>
                        </div>
                        <br />
                        <div className="  fs-5  d-flex flex-row" >
                            <p className={`${like} m-0 p-0 `}
                                style={{
                                    cursor: "pointer",
                                }}
                                onClick={handlelike} ></p>
                            <p className="  fs-5 px-2"
                            >{likenum}</p>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div className="  box fs-6 ">
                                <p className="card-title text-end"><b>{post.Category}</b></p>
                                <p className="card-title text-end"><b>{user.name}</b></p>
                                <p className="card-title text-end ">{user.email}</p>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
            </Modal>

        </div>

    )
}


