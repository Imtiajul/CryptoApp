import React, { useState } from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';


const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrencies');

  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? '6' : '15' })

  const { data: dataOption } = useGetCryptosQuery(100)

  if(!cryptoNews) return 'Loading ...';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a crypto"
            onChange={(value) => setNewsCategory(value)}
            optionFilterProp="children"
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())}
          >
            <Option value="Cryptocurrency">Cryptocurrency</Option>
            {dataOption?.data?.coins?.map((coin) => (<Option key={coin.name} value={coin.name}>{coin.name}</Option>))}
            </Select>
        </Col>
      )
      }
      {cryptoNews?.value?.map((news) => (
        <Col xs={24} sm={12} lg={8} key={news.name}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{news.name}</Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt={news.name} width="100" height="100" />
              </div>
              <p>
                {news.description > 100 ? `${news.description.substring(0, 100)} ...` : news.description}
              </p>
              <div className="provider-container">
                <div>
                  <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt={news.provider[0]?.name} />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News