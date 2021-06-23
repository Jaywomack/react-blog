import { useState } from 'react';
import { useHistory } from 'react-router-dom';
function Create() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };
    setIsPending(true);

    fetch('http://localhost:8000/blogs', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog)
    }).then(() => {
      console.log('new blog added!');
      setIsPending(false);
      history.push('/');
    });
  };

  return (
    <div className='create'>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <label>Blog Title:</label>
        <input
          type='text'
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {/* Body */}
        <label>Blog Body:</label>
        <textarea
          type='text'
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        ></textarea>
        {/* Author */}
        <label>Blog author:</label>
        <select
          selected='mario'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value='mario'>mario</option>
          <option value='yoshi'>yoshi</option>
        </select>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}

        <p>Title: {title}</p>
        <br></br>
        <p>Body: {body}</p>
        <p>
          <strong>By: {author}</strong>
        </p>
      </form>
    </div>
  );
}

export default Create;
