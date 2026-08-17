import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

function CommentsPage() {
  const { id } = useParams()
  const [comments, setComments] = useState([])
  const [message, setMessage] = useState('Loading comments...')

  useEffect(() => {
    getPostComments()
  }, [id])

  function getPostComments() {
    axios.get(`${BASE_URL}/posts/${id}/comments`)
      .then((response) => {
        setComments(response.data)
        setMessage('')
      })
      .catch(() => setMessage('Unable to get comments.'))
  }

  function getCommentsByPostId() {
    axios.get(`${BASE_URL}/comments?postId=${id}`)
      .then((response) => {
        setComments(response.data)
        setMessage('Comments loaded by post ID.')
      })
      .catch(() => setMessage('Unable to get comments.'))
  }

  return (
    <section className="card">
      <Link className="back-link" to={`/posts/${id}`}>Back to Post Details</Link>
      <h2>Post Comments</h2>
     
      {message && <p className="message">{message}</p>}

      <ul className="comments">
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.name}</strong>
            <span>{comment.email}</span>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default CommentsPage
