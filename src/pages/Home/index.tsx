// import UploadAvatar from "../../components/updateImage"

import { Carousel } from "antd"
import { Helmet } from 'react-helmet';

function HomePage() {
    return (
        <>
        <Helmet>
            <title>物业管理系统</title>
        </Helmet>
            <Carousel autoplay style={{width:'100%'}}>
                <div style={{width:'100%'}}> 
                    <img src="/images/1.jpg" style={{width:'100%' ,height:'500px'}} alt="" />
                </div>
                <div style={{width:'100%'}}>
                    <img src="/images/2.jpg" style={{width:'100%',height:'500px'}} alt="" />
                </div>
                <div style={{width:'100%'}}>
                    <img src="/images/3.jpg" style={{width:'100%',height:'500px'}} alt="" />
                </div>
                <div style={{width:'100%'}}>
                    <img src="/images/4.jpg" style={{width:'100%',height:'500px'}} alt="" />
                </div>
                <div style={{width:'100%'}}>
                    <img src="/images/5.jpg" style={{width:'100%',height:'500px'}} alt="" />
                </div>
            </Carousel>
        </>
    )
}
export default HomePage