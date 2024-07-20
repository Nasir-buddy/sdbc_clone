import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';

const Topnav = () => {

    const [query, setQuery] = useState("");
    const [searches, setSearches] = useState([]);

    const GetSearch = async () => {
        try {
            const { data } = await axios.get(`/search/multi?query=${query}`);
            setSearches(data.results);
            console.log("searches data is", searches)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        GetSearch();
    }, [query]);


    return (
        <div className='h-[10vh] w-full flex justify-center items-center relative'>
            <i class="ri-search-eye-line text-3xl text-zinc-300 "></i>
            <input type="text" onChange={(e) => setQuery(e.target.value)} value={query} placeholder='search anything' className='p-5 border-none outline-none bg-transparent w-[50%] text-zinc-300' />
            {(query.length > 0) &&
                (<i class="ri-close-large-line text-zinc-300 text-3xl" onClick={() => setQuery("")}></i>)
            }

            <div className='w-[50%] absolute max-h-[50vh] bg-zinc-400 rounded-lg top-[90%] overflow-auto' >
                {searches.map((item, index) => (
                    <Link key={index} className='w-full h-[20%] flex justify-start items-center p-10 border-b-2 border-zinc-600 hover:text-zinc-300 hover:bg-zinc-500 duration-300 hover:rounded-lg hover:border-b-black'>
                        <img src="" alt="" />
                        <span>{item.name || item.original_name || item.original_title}</span>
                    </Link>
                ))}

            </div>
        </div>

    )
}

export default Topnav