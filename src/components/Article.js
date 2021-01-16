import React from 'react';

const Article = ({title,imageUrl,imageAlt,content}) => {
    return (
        <article className='max-w-3xl mx-auto overflow-hidden bg-white shadow-md rounded-lg mb-12'>
            <img src={imageUrl} className={'w-full h-64 object-cover'} alt={imageAlt}/>
            <div className={'p-6'}>
                <h2 className={'block text-gray-800 font-semibold text-2xl mt-2'}>{title}</h2>
                <p>{content}</p>
            </div>
        </article>
    );
};

export default Article;
