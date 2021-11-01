import React, {useEffect, useState} from "react";
import { db } from "../firebase";


export const LinkForm = (props) => {

    const initialLinkData = {
        url: "",
        text: "",
        description: ""
    }
    const [linkData, setLinkData] = useState(initialLinkData)


    function validateUrl(str) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(str);
      }

    const handleSubmit = e => {
        e.preventDefault()
        if (validateUrl(linkData.url)) {
            props.addOrEditLink(linkData)
            setLinkData({...initialLinkData})
        } else {
            alert("url invalido")
        }
        
    }

    const handleInputChange = e => {
        const {name, value} = e.target
        setLinkData({...linkData, [name]: value})
    }

    const getLinkById = async (id) => {
        const data = await db.collection('links').doc(id).get()
        setLinkData(data.data())

    }
    useEffect(() => {
        if (props.currentId === "") {
            setLinkData({...initialLinkData})
        } else {
            getLinkById(props.currentId)
        }

    },[props.currentId])


    return (
        <form className="card card-body" onSubmit={handleSubmit}>
            <div className="form-group input-group">
                <div className="input-group-text bg-light"> <i className="material-icons">insert_link</i> </div>
                <input type="text" className="form-control" value={linkData.url} placeholder="https://someurl.com" name="url" onChange={handleInputChange}/>
            </div>
            <div className="form-group input-group">
                <div className="input-group-text bg-light"> <i className="material-icons">create</i> </div>
                <input type="text" className="form-control" value={linkData.text} name="text" placeholder="websiteName" onChange={handleInputChange}/>
            </div>
            <div className="form-group">
                <textarea name="description" rows="3" value={linkData.description} className="form-control" onChange={handleInputChange} placeholder="Website description....."></textarea>
            </div>

            <button className="btn btn-primary">{props.currentId == "" ? "Save" : "Edit"}</button>
        </form>
    )
}