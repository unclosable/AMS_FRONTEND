import {Collapse, Timeline} from 'antd';
import MainPanel from '../mainPanel.jsx';
const Panel = Collapse.Panel;

const summary = `
这是一个纯前端项目，用于“物资项目管理”，目前状态为开发中
`;
const technologyStack = `
webpack + React + React Route 4 + Ant Design + React Animation Add-Ons
`;

const participants = `
刘海宝，郑巍，冯涛，宋凯
`;
class HelloHome extends React.Component {
  render() {
    return <MainPanel>
      <Collapse defaultActiveKey={['1', '3']}>
        <Panel header="综述" key="1">
          <p>{summary}</p>
        </Panel>
        <Panel header="技术栈" key="2">
          <p>{technologyStack}</p>
        </Panel>
        <Panel header="项目更新记录" key="3">
          <Timeline>
            <Timeline.Item color="green">
              2018-01-23 项目创建</Timeline.Item>
            <Timeline.Item color="green">
              2018-01-24 基本框架搭建完成</Timeline.Item>
            <Timeline.Item color="green">
              2018-01-29 添加动画框架以及HOME页面</Timeline.Item>
          </Timeline>
        </Panel>
        <Panel header="参与人员" key="4">
          <p>{participants}</p>
        </Panel>
      </Collapse>
    </MainPanel>
  }
}
export default HelloHome;
