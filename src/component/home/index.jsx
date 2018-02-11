import { Collapse, Timeline } from 'antd';
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
      <Collapse defaultActiveKey={[ '1', '3' ]}>
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
            <Timeline.Item color="green">
              2018-01-31 路由全部OK，登出DONE</Timeline.Item>
            <Timeline.Item color="green">
              2018-02-05 对接后端登陆接口，心跳接口，用户信息获取接口以及前端界面动作</Timeline.Item>
            <Timeline.Item color="green">
              2018-02-09 基础数据维护界面查询展示功能，包含在URL中的query信息</Timeline.Item>
            <Timeline.Item color="green">
              2018-02-12 基础数据维护界面交互操作完善，添加，失效，跳转，动画等细节</Timeline.Item>
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
