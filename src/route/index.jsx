import TestMain from '../component/test2.jsx';
import TestMain1 from '../component/test20.jsx';
export const pathMap = {
  '/': {
    text: 'HOME'
  }
};
export const menuList = [
  {
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
const mapMake = (parentPath, children) => {
  return children.map((leaf) => {
    let leafPath = parentPath[parentPath.length - 1] + leaf.path;
    let children = leaf.children
      ? mapMake([
        ...parentPath,
        leafPath
      ], leaf.children)
      : [];
    let re = {};
    re[leafPath] = {
      text: leaf.text,
      parentPath: parentPath,
      component: leaf.component
    };
    children.forEach((c) => Object.assign(re, c));
    return re
  })
};
(() => {
  menuList.forEach((menu) => {
    const menuPath = menu.path;
    pathMap[menuPath] = {
      text: menu.text,
      parentPath: []
    }
    let childrenMap = mapMake([menuPath], menu.children);
    childrenMap.forEach((c) => Object.assign(pathMap, c));
  });
})();
