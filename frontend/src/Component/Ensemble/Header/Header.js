import React from 'react'

function Header() {
  const handlesign =()=>  {
    window.location.href = '/login';
};
const handlesignup =()=>  {
  window.location.href = '/register_user';
};
  return (
    <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <nav class="navbar navbar-expand-lg blur border-radius-xl top-0 z-index-3 shadow  my-3 py-2 start-0 end-0 mx-4">
          <div class="container-fluid ps-2 pe-0">
            <p class="navbar-brand font-weight-bolder ms-lg-0 ms-3 ">
              AMR informatique               </p>
            <button class="navbar-toggler shadow-none ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navigation" aria-controls="navigation" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon mt-2">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </span>
            </button>
            <div class="collapse navbar-collapse" id="navigation">
              <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                  <a class="nav-link d-flex align-items-center me-2 active" aria-current="page" href="/">
                    <i class="fa fa-chart-pie opacity-6 text-dark me-1"></i>
                    Dashboard
                  </a>
                </li>
               
              </ul>
              <ul class="navbar-nav d-lg-flex d-none">
                <li class="nav-item d-flex align-items-center">
                  <p onClick={handlesignup} target="_blank" class="btn btn-outline-primary btn-sm mb-0 me-2">Sign Up</p>
                </li>
                <li class="nav-item d-flex align-items-center">
                  <p onClick={handlesign} target="_blank" class="btn btn-outline-primary btn-sm mb-0 me-2"> Sign In</p>
               
                </li>
              
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  )
}

export default Header