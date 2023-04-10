import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const cryptoNewsApiheaders = {
   'x-bingapis-sdk': 'true',
   'X-RapidAPI-Key': '8221637ce7msh365dbcad59b0cecp154cf5jsnb1922046493d',
   'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = (url) => ({ url, headers: cryptoNewsApiheaders });

export const cryptoNewsApi = createApi({
   reducerPath: 'cryptoNewsApi',
   baseQuery: fetchBaseQuery({ baseUrl }),
   endpoints: (builder) => ({
      getCryptoNews: builder.query({
         query: ({ newsCategory, count }) => (createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
         ),
      })
   }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;