import { useEffect, useState } from 'react'
import './App.css'
import styled from 'styled-components'
import Pagination from './assets/components/Pagination';
import axios from 'axios';
function App() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('asc');
  const [category, setCategory] = useState("all");
  const productPerPage = 6;


  useEffect(() => {
    if (category === "all") {
      axios.get(`https://fakestoreapi.com/products/`).then((response) => {
        setProducts(response.data);
      });
    } else {
      axios
        .get(`https://fakestoreapi.com/products/category/${category}`)
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [category]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // const sortProducts = () => {
  //   const sortedProducts = [...currentProducts];

  //   if (order === 'asc') {
  //     sortedProducts.sort((a, b) => a.price - b.price);
  //   }
  //   else {
  //     sortedProducts.sort((a, b) => b.price - a.price);
  //   }

  //   setProducts(sortedProducts);
  // }
  // sortProducts();

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1); // Reset page to 1 when category changes
  };



  return (
    <>
      <BannerImage src='https://static.vecteezy.com/system/resources/thumbnails/004/299/806/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg'>
      </BannerImage>

      <Button onClick={() => handleCategoryChange("all")}>All</Button>
      <Button onClick={() => handleCategoryChange("electronics")}>
        Electronics
      </Button>
      <Button onClick={() => handleCategoryChange("jewelery")}>
        Jewelery
      </Button>
      <Button onClick={() => handleCategoryChange("men's clothing")}>
        men's Clothing
      </Button>
      <Button onClick={() => handleCategoryChange("women's clothing")}>
        women's Clothing
      </Button>

      <DIV>
        {currentProducts.map((item) => (
          <Detail>
            <Image src={item.image} alt=""></Image>
            <Title>{item.title.substring(0, 30) + "..."}</Title>
            <Desc>{item.description.substring(0, 150) + "..."}</Desc>
            <Price>$ {item.price}</Price>
          </Detail>
        ))}


      </DIV>
      <Pagination totalproduct={products.length} productPerPage={productPerPage} setCurrentPage={setCurrentPage} />
    </>
  )
}

export default App

const BannerImage = styled.img`
  width:100%;
  margin-bottom:30px;
  background:url('https://static.vecteezy.com/system/resources/thumbnails/004/299/806/small/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-vector.jpg') no-repeat cover;
  overflow:hidden;
  @media screen and (min-width:481px) and  (max-width:992px) {
    width:100%;
  }
  @media screen and (min-width:481px) and  (max-width:992px) {
    width:100%;
  }
 
 
`

const Button = styled.button`
  background-color:#3e87ec;
  color:#ffffff;
  border:none;
  outline:none;
  margin-right:10px;
  margin-bottom:30px;
  padding:10px 12px;
  font-size:17px;
  cursor:pointer;
  border-radius:3px;
  &:hover{
      background-color:
  #266fef;
}
`
const DIV = styled.div`
  display:grid;
  grid-template-rows:repeat(2,1fr);
  grid-template-columns:repeat(3,1fr);
  width:30px;
  margin-left:40px;
  margin-bottom:30px;
  gap:30px;
  @media screen and (min-width:320px) and (max-width:480px){
    grid-template-rows:repeat(1,1fr);
    grid-template-columns:repeat(1,1fr);
    
  }

  @media screen and (min-width:481px) and  (max-width:992px) {
    grid-template-rows:repeat(3,1fr);
    grid-template-columns:repeat(2,1fr);
    
  }

`
const Detail = styled.div`
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius:10px;
  padding:10px;
`
const Image = styled.img`
  padding:10px 80px;
  width:200px;
  height:200px;
`
const Title = styled.h2`
  font-size:18px;
  font-family:sans-serif;
  color:#535353;
`
const Desc = styled.p`
  font-size:14px;
  font-family:sans-serif;
  color:
  #636363;
`
const Price = styled.h3`
  color:#0c2232;
  font-size:15px;
  font-weight:bold;
`