import React from 'react'
import { Container, Button } from "shards-react";
import { Link} from "react-router-dom";
export const NotFound = () => {
  return (
    <Container fluid className="main-content-container px-4 pb-4" style={{ fontFamily: "IRANSans"}}>
    <div className="error">
      <div className="error__content">
        <h2>404 </h2>
        {/* <h3>خطای 404</h3> */}
        <p>صفحه مورد نظر یافت نشد</p>
        <Link type="button" className="btn btn-primary" to="/">&larr; برگشت به صفحه لاگین</Link>
      </div>
    </div>
  </Container>
  )
}
