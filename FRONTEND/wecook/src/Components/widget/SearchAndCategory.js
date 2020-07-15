import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory} from 'react-router-dom'


export default function SearchAndCategory(){

    const [searchRedirect, setSearchRedirect] = useState(false)
    const [key, setKey] = useState(null)
    
    const onEnterSearch = (e) => {
        if(e.keyCode == 13){
            setSearchRedirect(true);
            // history.push(`/search?key=${key}`, {key: key})
        }
        
    }

    const onChangeSearch = (e) => {
        setKey(e.target.value)
    }

        return (
            searchRedirect ? <Redirect to={`/search?key=${key}`}/> :
            <div className=" blog-sidebar">
                <div className="right-side-blog">
                    <h3>Tìm kiếm</h3>
                    <div className="blog-search-form">
                        <input name="search" placeholder="Tìm kiếm blog" type="text" 
                        onKeyDown={onEnterSearch}
                        onChange={onChangeSearch}
                        value={key}/>
                        <button className="search-btn">
                            <i className="fa fa-search" aria-hidden="true" />
                        </button>
                    </div>
                    <h3>Danh mục</h3>
                    <div className="blog-categories" style={{color: '#d65106'}}>
                        <ul>
                            <li><span>Món nướng</span></li>
                            <li><span>Món chay</span></li>
                            <li><span>Tết nguyên đán</span></li>
                            <li><span>Tết hàn thực</span></li>
                            <li><span>Làm bánh</span></li>
                        </ul>
                    </div>
                    <h3>Blog gần đây</h3>
                    <div className="post-box-blog">
                        <div className="recent-post-box">
                        </div>
                    </div>
                </div>
            </div>
        )
}
