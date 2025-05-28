import { Avatar } from './Avatar';
import styles from './Sidebar.module.css';
import { PencilLine } from '@phosphor-icons/react';

export function Sidebar (){
    return (
        <aside className={styles.sidebar}>
            <img src="https://images.unsplash.com/photo-1530533718754-001d2668365a?q=50&w=500&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                className={styles.cover}/>
            <div className={styles.profile}>
                <Avatar src="https://avatars.githubusercontent.com/u/172545669?v=4"/>

                
                <strong>Felipe Aso</strong>
                <span>Web Developer</span>
            </div>

            <footer>
                <a href="#">
                    <PencilLine size={20}/>
                    Editar seu perfil
                </a>
            </footer>
        </aside>
    )
}