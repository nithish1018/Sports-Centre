import { Link, Outlet } from "react-router-dom";
import { useArticlesState } from "../../context/Articles/context";
import { useContext, useEffect, useState } from "react";
import { useArticlesDispatch } from "../../context/Articles/context";
import { fetchArticles } from "../../context/Articles/actions";
import { ThemeContext } from "../../context/theme";



export default function Articles() {
    const { theme, setTheme } = useContext(ThemeContext)
    const [enabled, setEnabled] = useState(theme === 'dark')
    const toggleTheme = () => {
      if(theme==="light"){
       var newTheme = "dark";
  document.documentElement.classList.add("dark");
  }
  else{
  newTheme="light";
  document.documentElement.classList.remove("dark");
  }
      setEnabled(!enabled)
      setTheme(newTheme)
    }
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
                    id: number;
                    thumbnail: string;
                    sport: {
                        id: number;
                        name: string;
                    };
                    title: string;
                    summary: string;
                    date: string;
                }) => (
                    <Link to={`/matches/articles/${article.id}`} key={article.id} className=" p-3 rounded-md text-black" >
                        <div className="container flex-1 rounded mx-auto border-2 border-black">
                            <div className="flex">
                                <img src={article.thumbnail} alt="Image" className="w-40 h-45 rounded object-cover" />
                                <div className="px-4 py-4">
                                    <h1 className="text-4xl bg-red-300 rounded px-2 py-2 font-bold">{article.sport.name}</h1>
                                    <h1 className="text-3xl font-semibold">{article.title}</h1>
                                    <p className="text-lg text-gray-700">{article.summary}</p>
                                    <div className="flex gap-2 py-2 px-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                        </svg>

                                        <p className="text-sm font-medium bg-red-300 px-2 rounded text-gray-700">{article.date.split('T')[0]}</p>
                                    </div>

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