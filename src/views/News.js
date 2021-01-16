import React, {useEffect,useState} from 'react';
import Article from "../components/Article";

const token = 'c7b62db4d6f75f5dbcb5764fd61587';
const query = `
                {
                allArticles{
                    title
                    content
                    id
                    image{
                        url
                        alt
                        }
                    }
                }
                `;


const News = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                query,
            }),
        })
            .then(res => res.json())
            .then(({data}) => setArticles(data.allArticles))
            .catch(err => console.log(err))
    },[])


    return (
        <div className={'p-3 pt-16'}>
            <h1 className={'text-center font-semibold text-2xl text-red-500 p-4'}>Artykuły</h1>
            {articles?.length ? articles.map(({id,title,image,content})=>(
                <Article key={id} title={title} imageUrl={image.url} content={content} imageAlt={image.alt}/>
            )): null}

        </div>
    );
};

export default News;
