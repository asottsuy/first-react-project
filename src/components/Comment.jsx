import { ThumbsUp, Trash } from '@phosphor-icons/react'
import styles from './Comment.module.css'
import { Avatar } from './Avatar'

export function Comment({content, onDeleteComment}){
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
                    <button title="Aplaudir">
                        <ThumbsUp />
                        Aplaudir <span>20</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}