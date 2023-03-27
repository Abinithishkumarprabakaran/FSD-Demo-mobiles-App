import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Home } from './Home';

function App() {

  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mobiles" element={
          <ProtectedRoute>
            <PhoneList />
          </ProtectedRoute>
          } />
      </Routes>
    </div>
  )
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  return (
    token ?
    <section>
      <h1>This is Protected Route</h1>
      { children } 
    </section> :
    <section>
      <Navigate repalce to="/" />
    </section>
  )
}

function PhoneList() {

  const [mobileList, setMobileList] = useState([])

  const getMobiles = () => {
    fetch("http://localhost:4000/mobiles")
      .then((res) => res.json())
      .then((data) => setMobileList(data));
  }

  useEffect(() => getMobiles(),[])

  // const mobileList = [
  //   {
  //     "model": "OnePlus 9 5G",
  //     "img": "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
  //     "company": "Oneplus"
  //   },
  //   {
  //     "model": "Iphone 13 mini",
  //     "img": "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
  //     "company": "Apple"
  //   },
  //   {
  //     "model": "Samsung s21 ultra",
  //     "img": "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
  //     "company": "Samsung"
  //   },
  //   {
  //     "model": "Xiomi mi 11",
  //     "img": "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
  //     "company": "Xiomi"
  //   }
  // ];

  return (
    <div className="phone-list-container">
      {mobileList.map((ph) => (
        <Phone 
          key = {ph.model}
          phone = {ph}/>
      ))}
    </div>
  )
}

function Phone({ phone }) {

  return (
    <div className= "phone-container">
      <img className="phone-picture" src={phone.img} alt={phone.model} />
      <h2 className="phone-name">{phone.model}</h2>
      <p className="phone-company">{phone.company}</p>
    </div>)

}

export default App
