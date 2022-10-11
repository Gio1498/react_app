import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import { useState, useEffect } from "react";

function App() {
    const [animeList, SetAnimeList] = useState([]);
    const [topAnime, SetTopAnime] = useState([]);
    const [search, SetSearch] = useState("");

    const GetTopAnime = async () => {
        const temp = await fetch(`https://api.jikan.moe/v4/top/anime`)
            .then(res => res.json());
        SetTopAnime(temp.data.slice(0, 5));
        // log img_url
        // console.log(temp.data[0].img_url);
        // log temp
        console.log(temp);
        //log temp image
        console.log(temp.data[0].img_url);
    }

    const HandleSearch = (e) => {
        e.preventDefault();
        FetchAnime(search);
    }

    const FetchAnime = async (search) => {
        const temp = await fetch(`https://api.jikan.moe/v4/anime?q=${search}`)

            .then(res => res.json());
        SetAnimeList(temp.data);
    }

    useEffect(() => {
        GetTopAnime();
    }, []);


    return (
        <>
            <Navbar />
            <div className="container">
                <Header />
                <div className="content-wrap">
                    <Sidebar topAnime={topAnime} />
                    <MainContent
                        HandleSearch={HandleSearch}
                        search={search}
                        SetSearch={SetSearch}
                        animeList={animeList} />
                </div>
                <hr />
                <div className="row">
                
                </div>
            </div>
        </>
    );
}

export default App;
