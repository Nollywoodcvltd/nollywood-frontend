// import React from "react";
import { Container, Row, Col, Button, Form, InputGroup } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import "../ManageJob/ManageJob.scss";

function RecommendedJob() {
  return (
    <div>
      <Container className="mt-5">
        <Row className="mb-4 g-1 g-md-2">
          <Col xs={5} md={6}>
            <Button
              variant="light"
              className="w-100 d-flex align-items-center justify-content-center"
              // onClick={() => setShowFilterModal(true)}
            >
              <FaFilter className="me-2" />
              Filters
            </Button>
          </Col>

          {/* Search with icon and submit button */}
          <Col xs={7} md={6}>
            <Form>
              {/* <Form onSubmit={handleSearchSubmit}> */}
              <InputGroup>
                <InputGroup.Text className="bg-light border-end-0">
                  <CiSearch />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search"
                  // value={searchTerm}
                  className="bg-light shadow-none outline-none border-none"
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button
                  variant="warning"
                  type="submit"
                  className="d-none d-md-block"
                >
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>

        <div className="container mt-5">
          <Row className="justify-content-center align-items-center">
            <Col xs={6} sm={5}>
              <div className="builder w-100 w-md-75 p-1 p-md-3 rounded shadow-md">
                <p className="bg-white w-50 w-md-25 py-1 kola">19 Feb, 2025</p>
                <h3 className="mb-1">Username</h3>
                <h6 className="mb-2 text-muted">Company Name</h6>
                <p className="mb-3 brace">Role: Director, Actor, Actress</p>

                <div className="d-flex flex-wrap align-items-center bg-transparent job-text gap-1">
                  <span className="">location</span>
                  <span className="">gender</span>
                  <span className="">language</span>
                  <span className="">experience</span>
                  <span className="">age</span>
                  <span className="">about the job</span>
                  <span className="">application time</span>
                  <a className="text-truncate text-capitalize text-warning fw-bold">
                    view more
                  </a>
                </div>
              </div>
            </Col>
            <Col xs={6} sm={5}>
              <div className="builder w-75 p-3 rounded shadow-md">
                <p className="bg-white w-25 py-1 kola">19 Feb, 2025</p>
                <h3 className="mb-1">Username</h3>
                <h6 className="mb-2 text-muted">Company Name</h6>
                <p className="mb-3">Role: Director, Actor, Actress</p>

                <div className="d-flex flex-wrap align-items-center bg-transparent job-text gap-1">
                  <span className="">location</span>
                  <span className="">gender</span>
                  <span className="">language</span>
                  <span className="">experience</span>
                  <span className="">age</span>
                  <span className="">about the job</span>
                  <span className="">application time</span>
                  <a className="text-truncate text-capitalize text-warning fw-bold">
                    view more
                  </a>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default RecommendedJob;
