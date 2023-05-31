import React from 'react';
import { Calendar } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import locale from 'antd/es/date-picker/locale/zh_CN';

import './ScheduleTableHome.css'; // 引入自定义样式文件

// 设置 dayjs 使用英文语言包
dayjs.locale("zh-cn");
dayjs.extend(require("dayjs/plugin/localeData"));

const ScheduleTableHome: React.FC = () => {
  // 负责人数据
  const persons = ['负责人:anbao1', '负责人:anbao2', '负责人:anbao3', '负责人:anbao4'];

  // 根据星期几获取负责人索引
  const getPersonIndexByDay = (day: number) => {
    const personIndex = day % persons.length;
    return personIndex;
  };

  // 渲染日期单元格
  const dateCellRender = (date: dayjs.Dayjs) => {
    const day = date.day();
    const personIndex1 = getPersonIndexByDay(day);
    const personIndex2 = personIndex1 + 1 > persons.length - 1 ? 0 : personIndex1 + 1;



    return (
      <div className="person">
        <ul>
          <li className={'main-person' }>
            <span className="bullet"></span>
            {`主${persons[personIndex1]}`}
          </li>
          <li className={'secondary-person'}>
            <span className="bullet"></span>
            {`次${persons[personIndex2]}`}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div className="schedule-table">
      <Calendar mode="month" dateCellRender={dateCellRender} locale={locale} />
    </div>
  );
};

export default ScheduleTableHome;
