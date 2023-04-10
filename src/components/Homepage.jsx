import React from 'react'
import millify from 'millify'
import { Typography, Row, Col, Statistic } from 'antd'
import { Link  } from 'react-router-dom';
import {Cryptocurrencies, News } from './index'

import { useGetCryptosQuery } from '../services/cryptoApi';

const { Title } = Typography;

const Homepage = () => {
  const {data, isFetching } = useGetCryptosQuery(10);
console.log(data?.data);
  const globalStates = data?.data?.stats;

  if(isFetching) return "Loading ..."
  return (
    <>
      <Title level={1} className="heading">Global Crypto States</Title>
      <Row>
         <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStates.total}/></Col>
         <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStates.totalExchanges)}/></Col>
         <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStates.totalMarketCap)}/></Col>
         <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStates.total24hVolume)}/></Col>
         <Col span={12}><Statistic title="Total Markets" value={millify(globalStates.totalMarkets)}/></Col>
      </Row>
      <div className='home-heading-container'>
          <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title> 
          <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title> 
      </div>
      <Cryptocurrencies simplified/>
      <div className='home-heading-container'> 
          <Title level={2} className="home-title">Latest Crypto News</Title> 
          <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title> 
      </div>
      <News simplified/>
    </>
  )
}

export default Homepage