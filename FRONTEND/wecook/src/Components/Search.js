import React, {useState, useEffect} from 'react'
import SearchAPI from '../api/search'
import {useHistory} from 'react-router-dom'

export default function Search(props) {

    let history = useHistory()

    const [blogs, setBlogs] = useState([])
    const [users, setUsers] = useState([])
    useEffect(() => {
        console.log("hihi: ", history.location.state.key)
        rechieveSearch()
    }, [history.location.state.key])

    const rechieveSearch = (key) => {
        SearchAPI.searchKey(key)
        console.log("key: ", key)
        .then(res => {
            console.log("search: ", res.data)
            
        })
        .catch(err => {
            console.log(err);
        })
    }
    return (

        <div>
            <h1 className="bg-success" style={{height: '1000px'}}>Helo search</h1>
        </div>
    )
}
