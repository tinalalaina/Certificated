import React from 'react'
import Footer from '../5000b/Footer'

function Premier() {
  return (
    <div>
       <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="true">
    <div class="container-fluid py-1 px-3">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb bg-transparent mb-0 pb-0 pt-1 px-0 me-sm-6 me-5">
          <li class="breadcrumb-item text-sm"><p class="opacity-5 text-dark">Pages</p></li>
          <li class="breadcrumb-item text-sm text-dark active" aria-current="page">Documentation</li>
        </ol>
        <h6 class="font-weight-bolder mb-0">Documentation</h6>
      </nav>
      
    </div>
  </nav>
  <div className='body'>
        <div class="w3-display-middle">
          <h1 class="w3-jumbo w3-animate-top">CERTIFICATE VALIDATION</h1>
          <hr />
          <a href="/login" class="btn btn-primary btn-lg">Voir les document</a>
       
        </div>
      </div>
 <Footer/>
    </div>
  )
}

export default Premier