import React, { useEffect, useRef, useState } from 'react';
import { Row, Col, Card, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import { Member, getUserInfo } from '../../services/member';

const HomePage: React.FC = () => {

    const topRightChartRef = useRef<HTMLDivElement>(null);
    const bottomLeftChartRef = useRef<HTMLDivElement>(null);
    const bottomRightChartRef = useRef<HTMLDivElement>(null);
    const [userInfo, setUserInfo] = useState<Member>({} as Member)
    const init = async () => {
        const data = await getUserInfo()
        if (data.code !== 200) {
            message.error(data.message)
        } else {
            setUserInfo(data.data)
        }

    };
    useEffect(() => {
        init()
    }, [])
    useEffect(() => {
        let topRightChart: echarts.ECharts | null = null;
        let bottomLeftChart: echarts.ECharts | null = null;
        let bottomRightChart: echarts.ECharts | null = null;

        // 初始化图表
        topRightChart = echarts.init(topRightChartRef.current!);
        bottomLeftChart = echarts.init(bottomLeftChartRef.current!);
        bottomRightChart = echarts.init(bottomRightChartRef.current!);

        // 模拟数据
        const mockData = {
            categories: ['A区', 'B区', 'C区', 'D区'],
            seriesData: [12000, 20000, 15000, 17000],
        };

        // 配置图表选项和数据
        const topRightOptions: echarts.EChartsOption = {
            title: {
                text: '各区房屋售出状态',
            },
            tooltip: {},
            xAxis: {
                type: 'category',
                data: mockData.categories,
            },
            yAxis:{},
            legend:{
                data:['未售出','已售出']
            },
            series: [
                {
                    name:'未售出',
                  type: 'bar',
                  data: [12,18,10,20]
                },
                {
                    name:'已售出',
                  type: 'bar',
                  data: [18,12,20,10]
                }
              ]
        };
        topRightChart.setOption(topRightOptions);

        const bottomLeftOptions: echarts.EChartsOption = {
            title: {
                text: '各会员等级人员数量',
            },
            tooltip: {},
            series: [
                {
                    type: 'pie',
                    data: [
                        { name: 'V1', value: 25 },
                        { name: 'V2', value: 20 },
                        { name: 'V3', value: 10 },
                    ],
                },
            ],
        };
        bottomLeftChart.setOption(bottomLeftOptions);

        const bottomRightOptions: echarts.EChartsOption = {
            title: {
                text: '近5次维修人员评价分数',
            },
            tooltip: {},
            xAxis: {
                data: ['A', 'B', 'C', 'D', 'E']
            },
            yAxis: {},
            legend: {
                bottom: 0,
                data:['weixiu1','weixiu2','weixiu3','weixiu4','weixiu5']
              },
            series: [
                {
                    name:'weixiu1',
                    data: [4.5, 5, 4, 5, 4.5],
                    type: 'line',

                },
                {
                    name:'weixiu2',
                    data: [5, 4, 3, 5, 4],
                    type: 'line',
                },
                {
                    name:'weixiu3',
                    data: [4, 4.5, 5, 5, 4],
                    type: 'line',
                    
                },
                {
                    name:'weixiu4',
                    data: [4.5, 4, 3, 5, 4],
                    type: 'line',
                    
                },
                {
                    name:'weixiu5',
                    data: [5, 3, 4, 3.5, 4],
                    type: 'line',
                    
                }
            ]
        };
        bottomRightChart.setOption(bottomRightOptions);

        // 在组件卸载时销毁图表
        return () => {
            if (topRightChart) {
                topRightChart.dispose();
            }
            if (bottomLeftChart) {
                bottomLeftChart.dispose();
            }
            if (bottomRightChart) {
                bottomRightChart.dispose();
            }
        };
    }, []);

    return (
        <div>
            <Row style={{ paddingBottom: '20px' }}>
                <Col span={12} style={{ paddingRight: '10px' }}>
                    <Card>
                        <Row>
                            <Col span={12} >
                                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div>
                                        <Avatar size={128} src={'https://img1.baidu.com/it/u=394464903,2518307484&fm=253&fmt=auto&app=138&f=PNG?w=547&h=500'}></Avatar>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12} style={{ paddingLeft: '-10px' }} >
                                <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div>
                                        <h3>{`用户名: ${userInfo.userName}`}</h3>
                                        <h3>{`会员等级: ${userInfo.vipLevel}`}</h3>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Card style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div>
                                        <h1>欢迎回家~~</h1>
                                    </div>
                                </Card>
                            </Col>

                        </Row>
                    </Card>
                </Col>
                <Col span={12} style={{ paddingLeft: '10px' }}>
                    <Card>
                        <div ref={topRightChartRef} style={{ height: '300px' }} />
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col span={12} style={{ paddingRight: '10px' }}>
                    <Card>
                        <div ref={bottomLeftChartRef} style={{ height: '300px' }} />
                    </Card>
                </Col>
                <Col span={12} style={{ paddingLeft: '10px' }}>
                    <Card>
                        <div ref={bottomRightChartRef} style={{ height: '300px' }} />
                    </Card>
                </Col>
            </Row>
        </div>



    );
};

export default HomePage;
