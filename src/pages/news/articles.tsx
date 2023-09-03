import { Link, Outlet } from "react-router-dom";
import { useArticlesState } from "../../context/Articles/context";
import { useEffect } from "react";
import { useArticlesDispatch } from "../../context/Articles/context";
import { fetchArticles } from "../../context/Articles/actions";



export default function Articles() {
    const ArticleDispatch = useArticlesDispatch();
    useEffect(() => {
        const test = fetchArticles(ArticleDispatch);
        console.log(test)
    }, [ArticleDispatch]);
    let state: any = useArticlesState();
    const { articles, isLoading, isError, errorMessage } = state ||{};
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
                   id: number;
                   thumbnail: string;
                   sport: {
                    id: number;
                    name: string;
                   };
                   title: string;
                   summary: string;
                }) => (
                    <Link to={`/articles/${article.id}`} key={article.id} className=" p-3 rounded-md text-black" >
                        <div className="container flex-1 rounded mx-auto border border-black">
                            <div className="flex">                 
                                <img src={article.thumbnail} alt="Image" className="w-40 h-45 object-cover" />
                                <div className="px-4 py-4">
                                    <h1 className="text-4xl font-bold">{article.sport.name}</h1>
                                    <h1 className="text-3xl font-semibold">{article.title}</h1>
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