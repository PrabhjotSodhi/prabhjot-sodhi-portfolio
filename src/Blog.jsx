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
    const {slug} = useParams();
    const [post, setPost] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            const data = await graphcms.request(QUERY, slug);
            setPost(data);
        } catch (error) {
            console.error(error);
        }
      };
      fetchData();
    }, [slug]);

    if (!post) {
        return <div>Loading...</div>
    }
  
    return (
        <main>
            <h1>{post.title}</h1>
            <p>{post.datePublished}</p>
            <p>{post.category}</p>
            <div dangerouslySetInnerHTML={{__html: post.content.html}}>
            </div>
        </main>
    )
}

export default Blog