import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import PostsPage from './components/PostsPage'
import PostDetailsPage from './components/PostDetailsPage'
import CommentsPage from './components/CommentsPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PostsPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:id" element={<PostDetailsPage />} />
          <Route path="/posts/:id/comments" element={<CommentsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
