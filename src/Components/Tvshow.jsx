import React from 'react';
import axios from '../utils/axios';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import Loading from './template/Loading';
import Topnav from './template/Topnav';
import Dropdown from './template/Dropdown';
import Cards from './template/Cards';

const Tvshow = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState("airing_today");
    const [tvshow, setTvshow] = useState([]);
    const [page, setpage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    document.title = "SCSDB | TV Shows";

    const getTvshow = async () => {
        try {
            const { data } = await axios.get(`/tv/${category}?page=${page}`);
            if (data.results.length > 0) {
                setTvshow((prev) => [...prev, ...data.results]);
                setpage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const refreshHandler = () => {
        if (tvshow.length === 0) {
            getTvshow();
        } else {
            setpage(1);
            setTvshow([]);
            getTvshow();
        }
    };

    useEffect(() => {
        refreshHandler();
    }, [category]);

    return tvshow.length > 0 ? (
        <div className='w-screen h-screen mt-3'>
            {/* Header Section */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 items-center px-5 py-5 sm:py-1'>
                <h1 className='text-2xl text-zinc-400 font-semibold flex items-center'>
                    <i
                        onClick={() => { navigate(-1) }}
                        className="hover:text-[#6556CD] ri-arrow-left-line mr-2"
                    ></i>
                    TV Shows
                </h1>

                {/* Ensure Topnav spans full width on its column */}
                <div className='col-span-1'>
                    <Topnav />
                </div>

                {/* Align Dropdown to the right */}
                <div className='flex justify-center '>
                    <Dropdown title="category" options={["on_the_air", "popular", "top_rated", "airing_today"]} func={(e) => setCategory(e.target.value)} />
                </div>
            </div>

            {/* Infinite Scroll Section */}
            <InfiniteScroll dataLength={tvshow.length} next={getTvshow} hasMore={hasMore} loader={<h1>Loading...</h1>}>
                <Cards data={tvshow} title="tv" />
            </InfiniteScroll>
        </div>
    ) : <Loading />;
};

export default Tvshow;
