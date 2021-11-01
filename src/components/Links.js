import React, { useEffect, useState } from "react";
import { LinkForm } from './LinkForm';
import { db } from "../firebase";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const Links = () => {

    const [linksList, setLinksList] = useState([])
    const [currentId, setCurrentId] = useState("")
    

    const addOrEditLink = async linkObject => {
        if (currentId === ""){
            swalert("Saved", "success")
            await db.collection('links').doc().set(linkObject)
            console.log("new link added to db")    

        } else {
            swalert("Edited", "info")
            await db.collection('links').doc(currentId).update(linkObject)
            console.log("new link edited!!")
            setCurrentId("")
        }
    }

    const getLinkData = async () => {
        db.collection('links').onSnapshot((querySnapshot) => {
            const docs = []
            querySnapshot.forEach(link => {
                docs.push({...link.data(), id:link.id})
        })
        console.log("Fetched all links")
        setLinksList(docs)
    })}

    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
              if (result.isConfirmed) {
                swalert("Deleted", "error")
                db.collection('links').doc(id).delete()
                console.log("link deleted")
              }
          })
        }


    




    useEffect(() => {
        console.log("fetching data")
        getLinkData()
    },[])


    const swalert = async (typeOfChange, icon) => {
        const MySwal = withReactContent(Swal)
 
        await MySwal.fire({
          title: <strong>{typeOfChange}</strong>,
          html: <i>succesfully!</i>,
          icon: icon
        })
    }

    
    return (
        <>
        <LinkForm {...{addOrEditLink, currentId, linksList}}/>
        {linksList.map(link => (
            <div className="card mb-1" key={link.id}>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                        <h4>{link.text}</h4>
                        <div>
                        <i className="material-icons text-primary" onClick={() => setCurrentId(link.id)}>create</i>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <i className="material-icons text-danger" onClick={() => handleDelete(link.id)}>close</i>
                        </div>
                    </div>
                    
                    <p>{link.description}</p>
                    <a href={link.url} target="_blank">Go to Website</a>
                </div>
            </div>
        ))}
        </>
    )
}