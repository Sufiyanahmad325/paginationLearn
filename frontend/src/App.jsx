import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import axios from 'axios'

function App() {
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [totalPages, setTotalPages] = useState()

  async function fetchData() {
    const res = await axios.get(`http://localhost:8000/products?page=${page}`)
    if(res.data.success){
      setData(res.data.data)
      setTotalPages(res.data.totalPages)
      console.log(res.data.totalPages)
    }
  }

  useEffect(()=>{
      fetchData()
  },[page])

  return (
    <>
     <div className="container">
      <h1>Products</h1>

      {/* Cards */}
      <div className="card-container">
        {data.map((item) => (
          <div key={item._id} className="card">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <h4>₹{item.price}</h4>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>

        <span>Page {page}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
    </>
  )
}

export default App
