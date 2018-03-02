import TestMain from '../component/test2.jsx';
import TestMain1 from '../component/test20.jsx';
import HelloHome from '../component/home/index.jsx';
import DeviceIndex from '../component/basic_device/index.jsx';
import DeviceAdd from '../component/basic_device/add.jsx';
import Materials from '../component/basic_materials/index.jsx';
import MaterialsAdd from '../component/basic_materials/add.jsx';
import MaterialsEdit from '../component/basic_materials/edit.jsx';
import Warehouse from '../component/basic_warehouses/index.jsx';
import WarehouseAdd from '../component/basic_warehouses/add.jsx';
import WarehouseEdit from '../component/basic_warehouses/edit.jsx';
export const pathMap = {
  '/': {
    text: 'HOME',
    parentPath: [],
    path: '/',
    component: HelloHome
  }
};
export const menuList = [
  {
    text: "基础数据",
    icon: "api",
    path: "/basic",
    children: [
      {
        text: "设备",
        path: "/device",
        component: DeviceIndex,
        children: [
          {
            text: "添加",
            path: "/add",
            component: DeviceAdd
          }
        ]
      }, {
        text: "物料",
        path: "/materials",
        component: Materials,
        children: [
          {
            text: "添加",
            path: "/add",
            component: MaterialsAdd
          }, {
            text: "修改",
            path: "/edit",
            component: MaterialsEdit
          }
        ]
      }, {
        text: "仓库",
        path: "/warehouse",
        component: Warehouse,
        children: [
          {
            text: "添加",
            path: "/add",
            component: WarehouseAdd
          }, {
            text: "修改",
            path: "/edit",
            component: WarehouseEdit,
            // disexact: true
          }
        ]
      }
    ]
  }, {
    text: "用户权限",
    icon: "user",
    path: "/usr",
    children: [
      {
        text: "opt1",
        icon: "user",
        path: "/opt1",
        component: TestMain,
        children: [
          {
            text: "opt1",
            icon: "user",
            path: "/opt1",
            component: TestMain1
          }, {
            text: "opt2",
            icon: "user",
            path: "/opt2",
            component: TestMain
          }, {
            text: "opt3",
            icon: "user",
            path: "/opt3",
            component: TestMain
          }
        ]
      }, {
        text: "opt2",
        icon: "user",
        path: "/opt2",
        component: TestMain
      }, {
        text: "opt3",
        icon: "user",
        path: "/opt3",
        component: TestMain
      }
    ]
  }, {
    text: "资产管理",
    icon: "laptop",
    path: "/subnav2",
    children: [
      {
        text: "opt1",
        icon: "user",
        path: "/opt1",
        component: TestMain
      }, {
        text: "opt2",
        icon: "user",
        path: "/opt2",
        component: TestMain
      }, {
        text: "opt3",
        icon: "user",
        path: "/opt3",
        component: TestMain
      }
    ]
  }, {
    text: "资产归属",
    icon: "notification",
    path: "/subnav3",
    children: [
      {
        text: "opt1",
        icon: "user",
        path: "/opt1",
        component: TestMain
      }, {
        text: "opt2",
        icon: "user",
        path: "/opt2",
        component: TestMain
      }, {
        text: "opt3",
        icon: "user",
        path: "/opt3",
        component: TestMain
      }
    ]
  }
]
const mapMake = ( parentPath, children ) => {
  return children.map( ( leaf ) => {
    let leafPath = parentPath[parentPath.length - 1] + leaf.path;
    let children = leaf.children
      ? mapMake( [
        ...parentPath,
        leafPath
      ], leaf.children )
      : [];
    let re = {};
    re[ leafPath ] = {
      text: leaf.text,
      parentPath: parentPath,
      path: leaf.path,
      component: leaf.component
    };
    children.forEach( ( c ) => Object.assign( re, c ) );
    return re
  } )
};
( () => {
  menuList.forEach( ( menu ) => {
    const menuPath = menu.path;
    pathMap[ menuPath ] = {
      text: menu.text,
      parentPath: []
    }
    let childrenMap = mapMake( [menuPath], menu.children );
    childrenMap.forEach( ( c ) => Object.assign( pathMap, c ) );
  } );
} )();
