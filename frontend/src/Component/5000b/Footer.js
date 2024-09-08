import React from 'react'

function Footer() {
  return (
    <div>
         <footer class="footer py-4  ">
    <div class="container-fluid">
      <div class="row align-items-center justify-content-lg-between">
        <div class="col-lg-6 mb-lg-0 mb-4">
          <div class="copyright text-center text-sm text-muted text-lg-start">
            © <script>
              document.write(new Date().getFullYear())
            </script>
          </div>
        </div>
        <div class="col-lg-6">
          <ul class="nav nav-footer justify-content-center justify-content-lg-end">
            <li class="nav-item">
              <p  class="nav-link text-muted" target="_blank">tinalalaina14@gmail.com</p>
            </li>
            <li class="nav-item">
              <p class="nav-link text-muted" target="_blank">038064662</p>
            </li>
            <li class="nav-item">
              <p  class="nav-link text-muted" target="_blank">Facebook: tina lalaina Rakl</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Footer