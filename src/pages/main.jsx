import React from 'react';
import {Header} from './header/index';
import styles from './style.module.scss';

export const MainScreen = ()=>{
    return <div className={styles.maincontainer}>
        <Header />
        <p>Master Mind game</p>
    </div>
}