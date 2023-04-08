import './window.css'
import { GraphQLClient, gql } from 'graphql-request'
import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const graphcms = new GraphQLClient(import.meta.env.VITE_API_URL);
const QUERY = gql`
      { posts {
          datePublished
          description
          id
          slug
          title
          category
      }}`;

function App() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await graphcms.request(QUERY);
        setPosts(data.posts);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log(posts && posts.map(post => (post.title)))
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
        <section className="padding-section border_bottom">
          <div className="container">
            <h2 style={{marginBottom: "0.625rem"}}>👋 Hi, I&apos;m Prabhjot! </h2>
            <h1>Unleashing creativity through <span>words</span> and bringing ideas to life through <span>code</span>.</h1>
          </div>
        </section>

        <section className="container padding-section">
          <div className="even-columns">
            <div style={{display: "flex", flexDirection: "column", gap: "1.75rem"}}>
              <h2>I&apos;m a Part I Engineering Student at the University of Auckland</h2>
              <p>As an engineering student, I am constantly learning new skills and expanding my knowledge to adopt a engineering approach to problem solving.</p>
              <p>In my spare time, I enjoy using programming languages and tools to create various projects that solve a real world problem. I find great satisfaction in bringing my ideas to life through code, and I am always looking for new challenges and opportunities to learn and grow.</p> 
              <div style={{display: "flex"}}>
                <button className="btn-primary" style={{marginRight: "1rem"}}>Let&apos;s get in touch!</button>
                <a href="#" className="arrow-button">PDF Resume<svg className="arrow"><use href="./arrow.svg#arrow"></use></svg></a>
              </div>
            </div>
            <div>
              <div className="fun-fact">
                <div>
                  <h2>Fun facts about me</h2>
                  <p>Favourite book genre is self-development</p>
                  <p>Korean TV shows are the best! #ItaewonClass</p>
                  <p>Love all things entrepreneurship!</p>
                  <p>I like giving inspirational talks to myself</p>
                  <p>Mechanical keyboards are awesome</p>
                  <div className="face"><img src="./avatar.svg" alt="avatar"></img></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="padding-section" style={{paddingTop: "0rem"}} id="writing">
            <h2>From my blog</h2>
              {posts ? (
                <div className="carousel" style={{marginTop: "1.5rem"}}>
                {posts.map((post) => (
                  <div className="content_window" key={post.id}>
                    <div className="topics">
                      {post.category.map((topic) => (<small className="topic" key={topic}>{topic}</small>))}
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <small style={{fontWeight: 700, textTransform: "uppercase", textAlign: "right", marginTop: "auto"}}>{new Date(post.datePublished).toLocaleDateString("en-US", {month: 'short', day: 'numeric', year: 'numeric'})}</small>
                    <Link to={`blog/${post.slug}`}></Link>
                  </div>
                ))}
                </div>
                ):(
                  <p>Loading...</p>
                )}
          </div>
          <div className="padding-section" id="projects">
            <h2>My projects</h2>
            <div className="carousel even-columns" style={{marginTop: "1.5rem"}}>
              <div className="writing_window">
                <h2>Hanguk Drama List</h2>
                <div>
                    <img src="/logo.svg" alt="Hanguk Drama List"></img>
                </div>
                <a href="#"></a>
              </div>

            </div>
          </div>
        </section>
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

export default App
