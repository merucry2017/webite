import ProLayout from '@ant-design/pro-layout';
import React from 'react';
import { connect, Link } from 'umi';

const BasicLayout = props => {
    const { dispatch, children, settings } = props;
    const handleMenuCollapse = payload => {
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload,
        });
    };
    return (
        <ProLayout
            onCollapse={handleMenuCollapse}
            /** 定义页面内面包屑的展示 */
            breadcrumbRender={(routers = []) => routers}
            /** 定义侧边菜单栏的展示 */
            menuItemRender={(menuItemProps, defaultDom) => {
                return <Link to={menuItemProps.path}>
                    {defaultDom}
                </Link>;
            }}
            {...props}
            {...settings}
        >
            {children}
        </ProLayout>
    );
};
export default connect(({ global, settings}) => ({
    collapsed: global.collapsed, settings
}))(BasicLayout);
