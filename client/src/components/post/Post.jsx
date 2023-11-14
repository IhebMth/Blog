import React from 'react'
import './Posts.css'
import {format} from 'date-fns'
import {formatISO9075} from 'date-fns'
import { Link } from 'react-router-dom'

function Post({
  _id,
  title, 
  summary,
   cover, 
   content, 
   createdAt, author}) {
  return (
    <div className="post">

<div className="image">
  <Link to={`/post/${_id}`}>
  <img src={'http://localhost:4000/'+cover} alt="image"  />
  </Link>
  </div>

  <div className="texts">
  
  <Link to={`/post/${_id}`}>
  <h2><b>{title}</b></h2>
  </Link>
  
  <p className="info">
    <a className="author">{author?.userName}</a>

  <time>{formatISO9075(new Date(createdAt))}</time>
  </p>

  <p className='summary'>
    <i>{summary}</i>

</p>
</div>
</div>
  )
}

export default Post
