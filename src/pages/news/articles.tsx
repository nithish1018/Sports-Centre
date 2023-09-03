import { Link, Outlet } from "react-router-dom";
import { useArticlesState } from "../../context/Articles/context";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import { useArticlesDispatch } from "../../context/Articles/context";
import { fetchArticles } from "../../context/Articles/actions";



export default function Articles() {
    const ArticleDispatch = useArticlesDispatch();
    useEffect(() => {
        const test = fetchArticles(ArticleDispatch);
        console.log(test)

    }, [ArticleDispatch]);
    let state: any = useArticlesState();
    const { articles, isLoading, isError, errorMessage } = state || {};
    console.log(articles);
    if (articles.length === 0 && isLoading) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>{errorMessage}</span>;
    }

    return (
        <div>
            <h1 className="text-xl p-2 text-justify font-mono font-semibold">Sport Articles</h1>

            <div >
                {articles && articles.map((article: {
                    summary: ReactNode;
                    name: ReactNode;
                    thumbnail: string | undefined; id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined;
                }) => (
                    <Link to={`/articles/${article.id}`} key={article.id} className="flex-shrink-0 bg-white p-3 rounded-md text-black" >
                        <div className="container mx-auto">
                            <div className="flex flex-wrap">
                                <div className="w-full md:w-1/2 lg:w-1/2">
                                    <img src={article.thumbnail} alt="Image" className="w-full h-auto object-cover" />
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/2 p-4">
                                    <h1 className="text-4xl font-bold">{article.title}</h1>
                                    <p className="text-lg text-gray-700">{article.summary}</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                ))}
            </div>
            <Outlet />
        </div>

    )
}