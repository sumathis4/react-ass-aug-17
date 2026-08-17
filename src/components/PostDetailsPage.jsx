import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

function PostDetailsPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [message, setMessage] = useState('Loading post details...')

  useEffect(() => {
    getPost()
  }, [id])

  function getPost() {
    axios.get(`${BASE_URL}/posts/${id}`)
      .then((response) => {
        setPost(response.data)
        setMessage('')
      })
      .catch(() => setMessage('Unable to get this post.'))
  }

  function updatePost() {
    axios.put(`${BASE_URL}/posts/${id}`, {
      id: Number(id),
      title: 'Updated post title',
      body: 'This post was updated.',
      userId: 1,
    })
      .then((response) => {
        setPost(response.data)
        setMessage('Post updated successfully.')
      })
      .catch(() => setMessage('Unable to update post.'))
  }

  function patchPost() {
    axios.patch(`${BASE_URL}/posts/${id}`, { title: 'Patched title' })
      .then((response) => {
        setPost(response.data)
        setMessage('Post  updated successfully.')
      })
      .catch(() => setMessage('Unable to patch post.'))
  }

  function deletePost() {
    axios.delete(`${BASE_URL}/posts/${id}`)
      .then(() => {
        setPost(null)
        setMessage('Post deleted successfully.')
      })
      .catch(() => setMessage('Unable to delete post.'))
  }

  return (
    <section className="card">
      <Link className="back-link" to="/">Back to Posts</Link>
      <h2>Post Details</h2>
      {message && <p className="message">{message}</p>}

      {post && (
        <div className="post-details">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <div className="button-group">
            <button className="delete-button" onClick={deletePost}>Delete Post</button>
          <Link className="link-button" to={`/posts/${id}/comments`}>View Post Comments</Link>

          </div>
        </div>
      )}
    </section>
  )
}

export default PostDetailsPage
