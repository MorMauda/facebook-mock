import React, {useEffect, useState} from "react";
import axios from "axios";

const url = "http://localhost:4000";



export const DynamicSearchBar =({handleNewFriend}) =>{
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] =useState([]);


    useEffect(() => {
        axios.get(url  + "/users")
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                alert("Something went wrong when trying to fetch data from 'Likes' table.\n" + err);
            })
    }, []);

    useEffect(() => {
        const results = (searchTerm == '*' ? users : users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase())));
        setSearchResults(results);
    }, [searchTerm]);

    const handleChange = e => {
        setSearchTerm(e.target.value);
    };

    return (
        <React.Fragment>
        <input type="text" placeholder="Search afeka-book" value={searchTerm} onChange={handleChange}/>
        <div>

            {searchResults.map((item,i) => {

                return <a className="dropdown-item" onClick={()=>{handleNewFriend(item.user_id)}}>{item.name} {item.user_id}</a>;
            })}


        </div>
        </React.Fragment>

    );
}
