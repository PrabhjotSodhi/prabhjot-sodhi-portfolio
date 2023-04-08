import { GraphQLClient, gql } from 'graphql-request'
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import './blog.css'

const graphcms = new GraphQLClient(import.meta.env.VITE_API_URL)
const QUERY = gql`
query Post($slug: String!) {
    post(where: {slug: $slug}) {
      datePublished
      description
      id
      slug
      title
      category
      content {
        html
      }
    }
  }
`
const SLUGLIST = gql`{posts {slug}}`

function Blog() {
    const slug = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await graphcms.request(QUERY, slug)
          setPost(data.post);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, []);

    return (
      <div className="App">
        <header className="nav_container border_bottom">
          <section className="container">
            <div className="nav_wrapper">
              <a href="/" className="logo_text"><h2>Prabhjot Sodhi</h2></a>
              <button className="mobile_nav_toggle" aria-controls="primary-navigation" aria-expanded="false">
                <img className="icon_hamburger" src="/hamburger.svg" alt=""></img>
                <img className="icon_close" src="/hamburger-close.svg"></img>
              </button>
              <nav className="primary_navigation" id="primary-navigation">
                  <ul className="nav_list">
                    <li><a href="#writing" data-id="writing">writing</a></li>
                    <li><a href="#projects" data-id="projects">projects</a></li>  
                  </ul>
              </nav>
            </div>
          </section>
        </header>
        <main>
          {post ? (
          <div className="container blog-container"> 
              <section className="padding-section">
                  <div className="article-topics" style={{display: "flex"}}>
                      <small>{new Date(post.datePublished).toLocaleDateString("en-US", {month: 'short', day: 'numeric', year: 'numeric'})} </small>
                      {post.category.map((topic) => (
                        <div style={{display: "flex"}}>
                          <div className="topic-separator" key={"1"+topic}>·</div>
                          <small key={topic}>{topic}</small>
                        </div>))}
                  </div>
                  <h1>{post.title}</h1>
              </section>
          </div>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      </div>
    )
}

export default Blog