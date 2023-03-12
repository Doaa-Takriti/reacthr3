


import React from 'react';
import Layout from './pages/Layout';
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Changepassword from "./pages/Changepassword";
import ForgetPassword from "./pages/ForgetPassword";
import Loader from './components/Loader';
import Loader2 from './components/Loader2';
import Loader3 from './components/Loader3';
import Loader4 from './components/Loader4';
import Loader5 from './components/Loader5';
import { AuthProvider } from './components/auth';
//import PrivateComponent  from './components/PrivateComponent'

//           <Route  element={<PrivateComponent />} /> </Route >








import { Routes, Route } from 'react-router-dom'
import  NoMatch  from './components/NoMatch'



const LazyDashboard = React.lazy(() => import('./pages/Dashboard'))
const LazyAllemployee = React.lazy(() => import('./pages/Allemployee'))
const LazyAddemployee = React.lazy(() => import('./pages/Addemployee'))
const LazyTraining = React.lazy(() => import('./pages/Training'))
const LazyAddtraining = React.lazy(() => import('./pages/Addtraining'))
const LazyAddtraining2 = React.lazy(() => import('./components/Addtraning2'))
const LazySalary = React.lazy(() => import('./pages/Salary'))
const LazyReward = React.lazy(() => import('./pages/Reward'))

const LazyEditEmployee= React.lazy(() => import('./pages/EditEmployee'))

const LazyDetailEmployee= React.lazy(() => import('./pages/DetailEmployee'))

const LazyDeleteEmployee= React.lazy(() => import('./pages/Deleteemployee'))
const LazyOrg= React.lazy(() => import('./pages/Organizational'))
const LazyEditor= React.lazy(() => import('./pages/Editor1'))






function App() {


  return (
    <div className="App">
          <AuthProvider>

          <Routes>
          <Route path='Login' element={<Login />} />
          <Route path='changepassword' element={<Changepassword/>} />
          <Route path='register' element={<Register/>} />

          <Route path='forgetpassword' element={<ForgetPassword/>} />
          <Route path='*' element={<NoMatch />} />


        <Route path="/" element={<Layout />}>
        <Route
        index
          element={
            <React.Suspense fallback={<Loader2/>}>
              <LazyDashboard />
            </React.Suspense>
          }
        />
          <Route path='/about' element={<About/>} />
          <Route    
          path='/allemployee'
          element={
            <React.Suspense fallback={<Loader/>}>
              <LazyAllemployee />
            </React.Suspense>
          } />
            <Route    
          path='/allemployee/addemployee'
          element={
            <React.Suspense fallback={<Loader3/>}>
              <LazyAddemployee />
            </React.Suspense>
          } />

<Route    
          path='/training'
          element={
            <React.Suspense fallback={<Loader4/>}>
              <LazyTraining />
            </React.Suspense>
          } />
    <Route    
          path='/training/addtraining'
          element={
            <React.Suspense fallback={<Loader3/>}>
              <LazyAddtraining />
            </React.Suspense>
          } />
              <Route    
          path='/training/addtraining2'
          element={
            <React.Suspense fallback={<Loader3/>}>
              <LazyAddtraining2 />
            </React.Suspense>
          } />

<Route    
          path='/Salary'
          element={
            <React.Suspense fallback={<Loader4/>}>
              <LazySalary />
            </React.Suspense>
          } />

o3a2ka 92, [1/23/2023 5:40 AM]
<Route    
          path='/Reward'
          element={
            <React.Suspense fallback={<Loader5/>}>
              <LazyReward />
            </React.Suspense>
          } />
          <Route    
          path='/Org'
          element={
            <React.Suspense fallback={<Loader5/>}>
              <LazyOrg />
            </React.Suspense>
          } />
           <Route    
          path='/Editor'
          element={
            <React.Suspense fallback={<Loader5/>}>
              <LazyEditor />
            </React.Suspense>
          } />
          <Route    
          path='/allemployee/EditEmployee/:id'
          element={
            <React.Suspense fallback={<Loader5/>}>
              <LazyEditEmployee />
            </React.Suspense>
          } />
                <Route    
          path='/allemployee/DetailEmployee/:id'
          element={
            <React.Suspense fallback={<Loader5/>}>
              <LazyDetailEmployee />
            </React.Suspense>
          } />
                  <Route    
          path='/allemployee/DeleteEmployee/:id'
          element={
            <React.Suspense fallback={<Loader5/>}>
              <LazyDeleteEmployee />
            </React.Suspense>
          } />

        </Route>
   
       

      
          
    
      </Routes>

</AuthProvider>
    </div>
  );
}

export default App;