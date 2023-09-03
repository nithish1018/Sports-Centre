import { Link, Outlet } from "react-router-dom";
import { useArticlesState } from "../../context/Articles/context";
import  { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react";
import { useArticlesDispatch } from "../../context/Articles/context";
import { fetchArticles } from "../../context/Articles/actions";



export default function Articles() {
    const ArticleDispatch = useArticlesDispatch();
  useEffect(() => {
  const test=  fetchArticles(ArticleDispatch);
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
      
      <div className="flex gap-4 overflow-x-auto w-full">
            {articles && articles.map((article: { id: Key | null | undefined; title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; date: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
            <Link to={`/articles/${article.id}`} key={article.id} className="flex-shrink-0 bg-white p-3 rounded-md text-black" >
                <div className=" px-3 py-3 bg-white rounded-lg flex-shrink-0 shadow text-sm  border border-black" >
                    <div className="text-justify text-purple-500 text-sm">   {article.title} </div>
                    {/* <div className="text-xl py-2 font-medium">{Game.name.split("VS")[0]} VS { Game.name.split("VS")[1].split('at')[0]} </div> */}
                    <div className="text-justify text-xs  flex"> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>
 {article.date} </div>
                </div>
                </Link>

            ))}
        </div>
                <Outlet />
        </div>

    )
}