import axios from "axios";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

  //function for comparing strings (using jaccard similarity index)
export function jaccardCompare(str1: string, str2: string){
    let string1 = str1.toLowerCase().split(/\W+/)
    let string2 = str2.toLowerCase().split(/\W+/)
    let intersection = new Set([...string1].filter(x=>string2.includes(x)));
    let union = new Set([...string1, ...string2]);

    let similarity = intersection.size / union.size;

    return similarity;
}

export async function searchMovieID(searchUrl: string, title:string){
    try {
      const response = await axios.get(`${searchUrl}/movie`,{
        params:{
          api_key: TMDB_API_KEY,
          query:title
        }
      })
      return response.data.results[0].id;
    } catch (e) {
    //   console.error(`Error fetching movie ID for ${title} `,e)
      
    }
  }
export async function searchSeriesID(searchUrl: string, title:string){
try {
    const response = await axios.get(`${searchUrl}/tv`,{
    params:{
        api_key: TMDB_API_KEY,
        query:title
    }
    })

    for (let result in response.data.results){
    if (title === response.data.results[result].name || title === response.data.results[result].original_name){
        return response.data.results[result].id
    }
    }
} catch (e) {
    // console.error(`Error fetching series id for ${title}`,e)
}
}

//function for fetching series by id from TMDB
export async function findSeasons(findUrl:String, id:string|null){
try{
    const response = await findSeriesByID(findUrl, id)
    const seasonNumbers = response.seasons.map((x: { season_number: any; }) => x.season_number);

    return seasonNumbers;

}catch(e){
    // console.log(`Error fetching series data for ${id}`, e)
}
};

export async function findSeasonData(findUrl:String, id: string|null, season: string){
try {
    const response = await axios.get(`${findUrl}/tv/${id}/season/${season}`, {params:{
    api_key:TMDB_API_KEY
    }})
    
    return response.data
    
} catch (error) {
    // console.log(`Error fetching season Data for ${id} season: ${season}`)
    
}
}



//function for fetching movies by id from TMDB
export async function findMovieByID(findUrl:String, id:string |null){
try{
    const response = await axios.get(`${findUrl}/movie/${id}`, {
    params:{
        api_key: TMDB_API_KEY
    }
    })
    return response.data;

}catch(e){
    // console.log(`Error fetching movie data for ${id}`, e)
}

};
export async function findSeriesByID(findUrl:String, id:string |null){
try{
    const response = await axios.get(`${findUrl}/tv/${id}`, {
    params:{
        api_key: TMDB_API_KEY
    }
    })
    return response.data;

}catch(e){
    // console.log(`Error finding series data for ${id}`, e)
}

};

export async function findEpisode(findUrl:String, id:string | null, episodeName:string, season: string|null){
try {
    const response = await axios.get(`${findUrl}/tv/${id}/season/${season}`,{
    params:{
        api_key: TMDB_API_KEY
    }
    })

    for (let episodeNumber in response.data.episodes){
    let name = response.data.episodes[episodeNumber].name
    const index = jaccardCompare(name, episodeName);
    if (index>=0.5){
        return response.data.episodes[episodeNumber];
    }
    }

} catch (error) {
    // console.log(`Error finding ${id} season: ${season} : ${episodeName} `)
    
}
}