import react, { useState } from 'react'
import axios from 'axios'
import PostButton from '../postButton'
const PostButton = ({ userID }) => {
  const [text, setText] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // send POST request to create new tweet
      const response = await axios.post('/api/tweets', {
        text,
        author: userID
      })

      // handle successful response
      console.log(response.data)
      setText('')
    } catch (err) {
      // handle error
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-4">
      <input
        type="text"
        placeholder="What's happening?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 w-full"
      />
      <button
        type="submit"
        disabled={!text}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2 ${!text ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Tweet
      </button>
    </form>
  )
}

export default PostButton
