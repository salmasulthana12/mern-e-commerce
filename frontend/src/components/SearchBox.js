import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
    const navigate = useNavigate();
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5 form-control'
      ></input>
      <button type='submit' className='p-2 outline-success'>
        Search
      </button>
    </form>
  )
}

export default SearchBox