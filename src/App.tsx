import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import { Footer, Content } from 'antd/lib/layout/layout';
import Dashboard from './routes/home/Dashboard';
import Station from './routes/station-details/Station';

import { Header } from './components/Header';

type Props = {
  children: React.ReactNode
};

function HOC({ children }: Props) {
  return (
    <>
      <Header />
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        {children}
      </Content>
      {/* <Footer style={{ textAlign: 'center' }}>Indego UI</Footer> */}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={(prop) => <HOC><Dashboard /></HOC>} />
        <Route path='/:kioskId' render={(prop) => <HOC><Station /></HOC>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
