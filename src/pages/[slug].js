import { GraphQLClient, gql } from 'graphql-request'

const graphcms = new GraphQLClient(process.env.API_URL)

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

export async function getStaticPaths() {
    const {posts} = await graphcms.request(SLUGLIST)
    return {
        paths: posts.map((post) => ({params: {slug: post.slug}})),
        fallback: false,
    }
}

export async function getStaticProps({params}) {
    const slug = params.slug
    const data = await graphcms.request(QUERY, {slug})
    const post = data.post
    return {
        props: {
            post,
        },
        revalidate: 10,
    }
}

export default function BlogPost({post}) {
    return(
        <main>
            <h1>{post.title}</h1>
            <p>{post.datePublished}</p>
            <p>{post.category}</p>
            <div dangerouslySetInnerHTML={{__html: post.content.html}}>
            </div>
        </main>
    )
}