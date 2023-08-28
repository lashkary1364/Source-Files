import React from "react";
import {
  Form,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  FormInput
} from "shards-react";

export default () => (
  <Form className="main-navbar__search w-100 d-none d-md-flex d-lg-flex" >
    <InputGroup seamless className="ml-3" style={{visibility:"hidden"}}  >
      <InputGroupAddon type="prepend">
        <InputGroupText>
          <i className="material-icons">جستجو ...</i>
        </InputGroupText>
      </InputGroupAddon>
      <FormInput
        className="navbar-search"
        placeholder="جستجو..."
      />
    </InputGroup>
  </Form>
);
