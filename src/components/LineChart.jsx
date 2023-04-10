import React from 'react'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd'
import { current } from '@reduxjs/toolkit';

const { Title } = Typography;


const LineChart = ({ coinHistory, currentPrice, coinName }) => {
   // const 
   console.log(coinHistory)

   
   return (
      <>
         <Row className="chart-header">
            <Title level={2} className="chart-title">{coinName} Price Chart</Title>
            <Col className="price-container">
               <Title level={5} className="price-change">{coinHistory?.data?.change}%</Title>
               <Title level={5} className="current-price">Current Price: $ {currentPrice}</Title>
            </Col>
         </Row>
         {/* <Line data={data} options={options}/> */}
      </>
   ) 
}

export default LineChart