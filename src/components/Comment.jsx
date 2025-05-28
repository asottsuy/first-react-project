import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'
import { useState } from 'react';

export function Comment({content, onDeleteComment}){

    const [likeCount, setLikeCount] = useState(0);

    function handleLikeComment(){
        setLikeCount(likeCount + 1);
    }


    function handleDeleteComment() {
        //a unica de forma de comunicar entre componentes e atravez das suas propriedades

        onDeleteComment(content)
    }


    return(
        <div className={styles.comment}>
            <Avatar hasBorder={false} src="https://github.com/asottsuy.png" alt=""/>

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Felipe Tatsuya Aso</strong>
                            <time title="12 de Maio às 12:06" dateTime="2025-05-12 12:06:30">Cerca de 1h atrás</time>
                        </div>

                        <button onClick={handleDeleteComment} title="Deletar comentario">
                            <Trash size={20} />
                        </button>
                    </header>

                    <p>{content}</p>
                </div>

                <footer>
                    <button onClick={handleLikeComment}>
                        <ThumbsUp />
                        Aplaudir <span>{likeCount}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}