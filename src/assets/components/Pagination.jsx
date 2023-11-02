import React from 'react'
import styled from 'styled-components'
const Pagination = ({totalproduct,productPerPage,setCurrentPage}) => {

    const pages = [];
  for(let i=1; i<=Math.ceil(totalproduct/productPerPage); i++){
    pages.push(i);
  }
  return (
    <div>
        {pages.map((page,index)=>(
            <Button key={index} onClick={()=>setCurrentPage(page)}>{page}</Button>
        ))}
    </div>
  )
}

const Button = styled.button`
background-color:#3e87ec;
color:#ffffff;
border:none;
outline:none;
margin-right:10px;
padding:10px 12px;
font-size:17px;
cursor:pointer;
border-radius:3px;
&:hover{
    background-color:
#266fef;
}
`

export default Pagination