"use client"

import { createElement, useState } from "react"
import { useEffect } from "react"

export default function CreateBlog() {
    const [arrOfFunctions, setArrOfFunctions] = useState([])

    function subtitleClicked() {
        setArrOfFunctions(prevItems => [...prevItems, createSubtitle()])
    }

    function textClicked() {
        setArrOfFunctions(prevItems => [...prevItems, createText()])
    }

    function imageClicked() {
        setArrOfFunctions(prevItems => [...prevItems, createImage()])
    }

    function createSubtitle() {
        return <input maxLength="32" className="creatingSubtitle" placeholder="Subtitle"></input>
    }

    function createText() {
        return <textarea className="creatingText" placeholder="Text"></textarea>
    }


    const [image, setImage] = useState(null)

    // useEffect(() => {
    //     createImage()
    // }, [image])

    function createImage() {
        if(image !== null) {
            setImage(null)
         }
        return (
        <>
        {image && <img src={image} alt="Preview" className="createdImage" />}
        <div className="createImage">
        <p>Upload image</p>
        <p>JPG, PNG, GIF</p>
        <input type="file" accept="image/*" onChange={uploadTheImage}/>
        </div>
        </> )
    }

    function uploadTheImage(e) {
        const file = e.target.files[0];
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setImage(objectUrl);
        }
    }

const [blogTitle, setBlogTitle] = useState("")

function titleOfTheBlog() {
    setBlogTitle(event.target.value)
}

    return (
        <div className="createBlog">
              <input onChange={titleOfTheBlog} maxLength="24" placeholder="Title of the blog" className="title"></input>

        <div className="functionalButtons">
            <button onClick={subtitleClicked}>Create subtitle</button>
            <button onClick={imageClicked}>Create image</button>
            <button onClick={textClicked}>Create text</button>
            </div>


          {  arrOfFunctions.map((func) => {
                return (
                    <div>
                    {func}
                    </div>
          )}
        )}
        </div>
    )
}