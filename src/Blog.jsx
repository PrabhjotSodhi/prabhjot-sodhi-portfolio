import { GraphQLClient, gql } from 'graphql-request'
import { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import {load} from 'cheerio';
import { Helmet } from 'react-helmet';
import './blog.css'
import './window.css'


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
    const [content, setContent] = useState(null);

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
      if (post) {
        const loadContent = load(post.content.html)
        // Loop over the h2 elements and set their id attributes based on their contents
        loadContent('h2').each((i, el) => {
          const id = loadContent(el).text().replace(/\s+/g, '-').toLowerCase();
          loadContent(el).attr('id', id);
        });
        setContent(loadContent.html())
      }
    }, [post]);

    return (
      <div className="App">
        <Helmet>
          <title>{`${post?.title} | Prabhjot Sodhi's Portfolio`}</title>
        </Helmet>
        <header className="nav_container border_bottom">
          <section className="container">
            <div className="nav_wrapper">
              <Link to="/" className="logo_text"><h2>Prabhjot Sodhi</h2></Link>
              <button className="mobile_nav_toggle" aria-controls="primary-navigation" aria-expanded="false">
                <img className="icon_hamburger" src="/hamburger.svg" alt=""></img>
                <img className="icon_close" src="/hamburger-close.svg"></img>
              </button>
              <nav className="primary_navigation" id="primary-navigation">
                  <ul className="nav_list">
                    <li><Link to="/" data-id="writing">writing</Link></li>
                    <li><Link to="/" data-id="projects">projects</Link></li>  
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
                  <article className="content" dangerouslySetInnerHTML={{__html: content}}></article>
              </section>
              <section className="sticky-column padding-section" id="toc">
                <div className="toc-window">
                    <small><strong>TABLE OF CONTENTS</strong></small>
                    <div className="headings">
                    {load(post.content.html)('h2').map((i, el) => (
                    <a href={`#${load(post.content.html)(el).text().replace(/\s+/g, '-').toLowerCase()}`}>{load(post.content.html)(el).text()}</a>
                    ))}
                        </div>
                </div>
            </section>
          </div>
          ) : (
            <p>Loading...</p>
          )}
        </main>
        <footer className="clr-neutral-100" style={{borderTop: "3px solid #000000", borderBottom: "3px solid #000000", padding: "1rem 0"}}>
          <div className="container even-columns" style={{padding: "1.5rem 0"}}>
              <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                <h2>Prabhjot Sodhi</h2>
                <p>Thanks for reading. Feel free to chat with me through my socials!</p>
                <p className="fw-bold">My Links</p>
                  <div className="social-list">
                      <a href="https://www.linkedin.com/in/prabhjotsodhi/" target="_blank" rel="noopener noreferrer"><svg className="social-icon"><use href="/social-icons.svg#linkedin"></use></svg></a>
                      <a href="https://github.com/PrabhjotSodhi" target="_blank" rel="noopener noreferrer"><svg className="social-icon"><use href="/social-icons.svg#github"></use></svg></a>
                      <a href="https://www.instagram.com/prabhjotsodhi/" target="_blank" rel="noopener noreferrer"><svg className="social-icon"><use href="/social-icons.svg#instagram"></use></svg></a>
                      <a href="mailto:sodhiprabhjot23@gmail.com" target="_blank" rel="noopener noreferrer"><svg className="social-mail"><use href="/social-icons.svg#mail"></use></svg></a>
                  </div>
              </div>
              <div className="push-right"  style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                  <h2>How I built this</h2>
                  <p className="fw-bold">Stack</p>
                  <p><a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="footer-link">React JS</a> + <a href="https://vitejs.dev/" target="_blank" rel="noopener noreferrer" className="footer-link">Vite JS</a> + <a href="https://hygraph.com/" target="_blank" rel="noopener noreferrer" className="footer-link">Hygraph</a></p>
                  <p className="fw-bold">Miscellaneous</p>
                  <p><a href="https://github.com/PrabhjotSodhi/prabhjot-sodhi-portfolio" target="_blank" rel="noopener noreferrer" className="footer-link">Github Repository</a> + <a href="https://www.figma.com/file/gMWEqPuwOzDr9Ngu4ajcr1/%5BPUBLIC%5D-Portfolio-Design?node-id=0%3A1&t=n2SMN0UF24hTuPkY-1" target="_blank" rel="noopener noreferrer" className="footer-link">Figma Design</a></p>
              </div>
          </div>
        </footer>
        <section className="container even-columns" style={{padding: "1.5rem 0", display: "flex"}}>
            <p>© 2022 - Prabhjot Sodhi</p><p style={{marginLeft: "auto"}}>Deployed on <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className="footer-link">Vercel</a></p>
        </section>
      </div>
    )
}

export default Blog