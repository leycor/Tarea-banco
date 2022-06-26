import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RecoilRoot } from 'recoil'

const root = document.getElementById('root')
const element = <App />

ReactDOM.createRoot(root).render(
    <RecoilRoot>{element}</RecoilRoot>
)
