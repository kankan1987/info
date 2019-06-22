import React from 'react';

import { Layout, Menu, Icon } from 'antd';
import { withRouter, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { login, logout, checkLogin } from './eosio/api/login';
import { contract } from './eosio/api/config';

import LayoutHeader from './LayoutHeader';
import DappPage from './pages/DappPage';
import BihuPage from './pages/BihuPage';
import CandyPage from './pages/CandyPage';
import HomePage from './pages/dashboard/HomePage';
import FngPage from './pages/analysis/FngPage';
import FuturesPage from './pages/analysis/FuturesPage';
import BtcPage from './pages/token/BtcPage';
import EthPage from './pages/token/EthPage';
import EosPage from './pages/token/EosPage';
import AddCandy from './pages/admin/AddCandy';
import AddPost from './pages/admin/AddPost';

import './App.css';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class App extends React.Component {

  componentDidMount(){
    this.props.checkLogin();
  }

  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  menuItem = (path, type, title) => {
    return (
      <Menu.Item key={path}>
        <Link to ={path}>{type ? <Icon type={type} /> : ''}<span>{title}</span></Link>
      </Menu.Item>  
    );
  }

  subMenuTitle = (type, title) => {
    return <span><Icon type={type}/><span>{title}</span></span>
  }

  render() {
    const { login, logout } = this.props;
    const accountName = this.props.account.name;
    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
            <div className="logo" >
              <img src="/favicon.ico" alt=""/>
              {this.state.collapsed ? '' : <span>币圈信息站</span>}
            </div>
            <Menu 
              theme="dark"
              mode="inline"
              defaultSelectedKeys={[this.props.location.pathname]} 
              defaultOpenKeys={['sub1','sub2', 'sub3']}>
              <SubMenu key='sub1' title={this.subMenuTitle('pie-chart', '信息总览')}>
                {this.menuItem('/', false, '信息导航')}
              </SubMenu>
              <SubMenu key='sub2' title={this.subMenuTitle('line-chart', '数据分析')}>
                {this.menuItem('/analysis/fng', false, '恐惧贪婪指数')}
                {this.menuItem('/analysis/futures', false, 'BTC季度合约价格')}
              </SubMenu>
              <SubMenu key='sub3' title={this.subMenuTitle('dollar', '数字货币')}>
                {this.menuItem('/token/btc', false, '比特币')}
                {this.menuItem('/token/eth', false, '以太坊')}
                {this.menuItem('/token/eos', false, 'EOS')}
              </SubMenu>
              {this.menuItem('/dapp', 'appstore', 'DAPP')}
              {this.menuItem('/bihu', 'bulb', '币乎好文')}
              {this.menuItem('/candy', 'heart', '糖果福利')}
              {accountName === contract ? 
              <SubMenu key='sub4' title={this.subMenuTitle('user', '管理员')}>
                {this.menuItem('/admin/addcandy', false, '添加糖果')}
                {this.menuItem('/admin/addpost', false, '添加文章')}
              </SubMenu> : ''}
            </Menu>
          </Sider>
          <Layout>
            <LayoutHeader accountName={accountName} login={login} logout={logout} />      
            <Content style={{ margin: '0 16px' }}>
              <Route path='/' exact component={HomePage}></Route>
              <Route path='/analysis/fng' exact component={FngPage}></Route>
              <Route path='/analysis/futures' exact component={FuturesPage}></Route>
              <Route path='/token/btc' exact component={BtcPage}></Route>
              <Route path='/token/eth' exact component={EthPage}></Route>
              <Route path='/token/eos' exact component={EosPage}></Route>
              <Route path='/dapp' exact component={DappPage}></Route>
              <Route path='/bihu' exact component={BihuPage}></Route>
              <Route path='/candy' exact component={CandyPage}></Route>
              {accountName === contract ?
              <Route path='/admin/addcandy' exact component={AddCandy}></Route> : ''}
              {accountName === contract ?
              <Route path='/admin/addpost' exact component={AddPost}></Route> : ''}
            </Content>
            <Footer style={{ textAlign: 'center' }}>币圈信息站 ©2018 Created by <a href='https://bihu.com/people/14150'>Songguo</a></Footer>
          </Layout>
        </Layout>
    );
  }
}

const mapState = (state) => {
  return {
    account: state.account,
  }
}

const mapDispatch = (dispatch) => {
  return { 
    login(){
      dispatch(login);  
    },
    logout(){
      dispatch(logout);  
    },
    checkLogin(){
      dispatch(checkLogin);
    }
  }
}

export default connect(mapState, mapDispatch)(withRouter(App));
