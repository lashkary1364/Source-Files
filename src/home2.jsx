import React from 'react'
import { useState } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Badge,
    Button
} from "shards-react";
import PageTitle from './components/common/PageTitle';
//import '../src/images/home/'
export const Home2 = () => {


    const [PostsListOne] = useState([
        {
            backgroundImage: require("../src/images/content-management/1.jpeg"),
            category: "Business",
            categoryTheme: "dark",
            author: "Anna Kunis",
            authorAvatar: require("../src/images/avatars/1.jpg"),
            title: "Conduct at an replied removal an amongst",
            body:
                "However venture pursuit he am mr cordial. Forming musical am hearing studied be luckily. But in for determine what would see...",
            date: "28 February 2019"
        },
        {
            backgroundImage: require("../src/images/content-management/2.jpeg"),
            category: "Travel",
            categoryTheme: "info",
            author: "James Jamerson",
            authorAvatar: require("../src/images/avatars/2.jpg"),
            title: "Off tears are day blind smile alone had ready",
            body:
                "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking learning my...",
            date: "29 February 2019"
        },
        {
            backgroundImage: require("../src/images/content-management/3.jpeg"),
            category: "Technology",
            categoryTheme: "royal-blue",
            author: "Jimmy Jackson",
            authorAvatar: require("../src/images/avatars/2.jpg"),
            title: "Difficult in delivered extensive at direction",
            body:
                "Is at purse tried jokes china ready decay an. Small its shy way had woody downs power. To denoting admitted speaking my...",
            date: "29 February 2019"
        },
        {
            backgroundImage: require("../src/images/content-management/4.jpeg"),
            category: "Business",
            categoryTheme: "warning",
            author: "John James",
            authorAvatar: require("../src/images/avatars/3.jpg"),
            title: "It so numerous if he may outlived disposal",
            body:
                "How but sons mrs lady when. Her especially are unpleasant out alteration continuing unreserved ready road market resolution...",
            date: "29 February 2019"
        }
    ])

    return (
        <div>


            <Container fluid className="main-content-container px-4" >
                <Row></Row>
                {/* Page Header */}
                <Row className="page-header py-4 " dir="rtl">
                    <PageTitle sm="4" title="شرکت نرم افزاری دکا" subtitle="Components" className="text-sm-right" />
                </Row>

                {/* First Row of Posts */}
                <Row>
                    {PostsListOne.map((post, idx) => (
                        <Col lg="3" md="6" sm="12" className="mb-4" key={idx}>
                            <Card small className="card-post card-post--1">
                                <div
                                    className="card-post__image" 
                                    style={{ backgroundImage: `url(${post.backgroundImage})` , height:"300px" }}
                                >
                                    <Badge
                                        pill
                                        className={`card-post__category bg-${post.categoryTheme}`}
                                    >
                                        {post.category}
                                    </Badge>
                                    <div className="card-post__author d-flex">
                                        <a
                                            href="#"
                                            className="card-post__author-avatar card-post__author-avatar--small"
                                            style={{ backgroundImage: `url('${post.authorAvatar}')` }}
                                        >
                                            Written by {post.author}
                                        </a>
                                    </div>
                                </div>
                                <CardBody>
                                    <h5 className="card-title">
                                        <a href="#" className="text-fiord-blue">
                                            {post.title}
                                        </a>
                                    </h5>
                                    <p className="card-text d-inline-block mb-3">{post.body}</p>
                                    <span className="text-muted">{post.date}</span>
                                </CardBody>
                                <CardFooter className="text-muted border-top py-3">
                                    <span className="d-inline-block">
                                        By
                                        <a className="text-fiord-blue" href="/login">
                                            Login to Tankhash
                                        </a>{" "}
                                        {/* in
                    <a className="text-fiord-blue" href={post.categoryUrl}>
                      {post.category}
                    </a> */}
                                    </span>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <footer className="main-footer d-flex p-2 px-3 bg-white border-top" style={{position:"fixed",bottom:"0",left:"0", width:"100%",height: "50px"}}><div className="container"><div className="row">
                {/* <ul class="nav"><li class="nav-item"><a class="nav-link" href="/customer-crud">Home</a></li><li class="nav-item"><a class="nav-link" href="/customer-crud">Services</a></li><li class="nav-item"><a class="nav-link" href="/customer-crud">About</a></li><li class="nav-item"><a class="nav-link" href="/customer-crud">Products</a></li><li class="nav-item"><a class="nav-link" href="/customer-crud">Blog</a></li></ul><span class="copyright ml-auto my-auto mr-2"> */}
                    <span>Copyright © 2018 DesignRevision</span></div></div></footer>
        </div>

    )


    // return(<div style={{backgroundImage:'require("../src/images/home/webdeka.png")',width:"100%",height:"100%"}}>Hello World</div>)

}
