import React, { useState, useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Row, Col, Input, Card } from 'antd'
import Loader from './Loader'

import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
   const count = simplified ? 10 : 100;
   const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
   const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
   const [searchTeam, setSearchTeam] = useState('');


   useEffect(() => {
      const filterdData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTeam.toLowerCase()));

      setCryptos(filterdData);
   }, [searchTeam, cryptosList]);

   // console.log('crypto', cryptos);


   if (isFetching) return <Loader/>

   return (
      <>
         {!simplified &&
            (<div className="search-crypto">
               <Input placeholder="Search Currency" onChange={(e) => setSearchTeam(e.target.value)}></Input>
            </div>)
         }

         <Row gutter={[32, 32]} className="crypto-card-container">
            {cryptos?.map(({ uuid, name, iconUrl, price, marketCap, change, rank }) => (
               <Col xs={24} sm={12} lg={6} className="crypto-card" key={uuid}>
                  <Link to={`/crypto/${uuid}`}>
                     <Card
                        title={`${rank}, ${name}`}
                        extra={<img className="crypto-image" src={iconUrl} alt={name} />}
                        hoverable>
                        <p>Price: {millify(price)}</p>
                        <p>Market Cap: {millify(marketCap)}</p>
                        <p>Daily Change: {millify(change)}</p>
                     </Card>
                  </Link>
               </Col>
            ))}

         </Row>
      </>
   )
}

export default Cryptocurrencies