import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

function PostsPage() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [message, setMessage] = useState('Loading posts...')

  useEffect(() => {
    getPosts()
  }, [])

  function getPosts() {
    setMessage('Loading posts...')

    axios.get(`${BASE_URL}/posts?_limit=10`)
      .then((response) => {
        setPosts(response.data)
        setMessage('')
      })
      .catch(() => setMessage('Unable to get posts.'))
  }

  function createPost(event) {
    event.preventDefault()

    axios.post(`${BASE_URL}/posts`, { title, body, userId: 1 })
      .then((response) => {
        setPosts([response.data, ...posts])
        setTitle('')
        setBody('')
        setMessage('Post created successfully. This test API does not save data permanently.')
      })
      .catch(() => setMessage('Unable to create post.'))
  }

  return (
    <>
      <section className="card">
        <h2>Posts</h2>
        {message && <p className="message">{message}</p>}

        <div className="post-list">
          {posts.map((post) => (
            <article key={post.id}>
              <b>Post #{post.id}</b>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
              <Link className="link-button" to={`/posts/${post.id}`}>View Details</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <h2>Create New Post</h2>
        <form onSubmit={createPost}>
          <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
          <textarea value={body} onChange={(event) => setBody(event.target.value)} placeholder="Post body" required />
          <button type="submit">Create Post</button>
        </form>
      </section>
    </>
  )
}

export default PostsPage
