import { useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

import { format, formatDistance, formatDistanceToNow } from 'date-fns'; //importando dependencias
import ptBR from 'date-fns/locale/pt-BR';


export function Post({ author, publishedAt, content }) { //funcao principal do arquivo

    const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    })
    
    const publisheDateRelativeNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix:  true
    })


    // estado = variavel que eu quero q o compenente monitore
    const [comments, setComments] = useState([ //ele retorna 2 coisas dentro de um array, por se desustrutura a var q vai receber esse retorno
        //a segunda var e uma funcao para alterar o valor e avisar o react q foi alterado
        'Post muito bacana, hein!' //valor inicial
    ])

    //novo estado
    const [newCommentText, setNewCommentText] = useState('') //inicializar um estado com o mesmo tipo q vou armazenar depois
    // 1 param é o valor mais recente digitado
    // 2 param é o valor inserido no momento

    function handleCreateNewComment(){ //funcao q e disparada atraves de uma acao do usuario(click, submit, hover) comeca com handle
        event.preventDefault()

        const newCommentText = event.target.comment.value //event.target = retorna o formulario, pois retorna o elemento que ta recebdno o evento
                                                        //event.target.comment = retorna a textarea inteira
                                                //form->name->valor   
                                                //o 'comment' e o mesmo do name declarado no textarea
        setComments([...comments, newCommentText]); //imutabilidade
        //se passa como  2 parametro o novo valor, e o 1 param os elementos anteriores
        // (...) = copia os valroes ja existentes | spread operator


        setNewCommentText(''); //dizendo que o 2 param do useStatel(valor inserido no momento), agora é uma string vazia
                                //fazendo o newCommentText ser vazio
        
    }

    function handleNewCommentChange(){ //ativa a cada mudança na textarea
        event.target.setCustomValidity('');
        setNewCommentText(event.target.value); //retorna o novo texto inserido pelo usuario
        //e a segunda função do useState que pede o novo valor a ser inserido
        
    }

    function deleteComment(commentToDelete){
        //imutabilidade -> as variaves nao se alteram, se cria uma nova memoria 
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment != commentToDelete;
        })

        setComments(commentsWithoutDeletedOne); //nunca se altera uma informação, sempre criando uma nova informação e salvando no estado.
    }

    function handleNewCommentInvalid(){
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    const isNewCommentEmpty = newCommentText.length == 0;

    return ( //retorna esse DOM
       <article className={styles.post}>
        <header>
            <div className={styles.author}>
                <Avatar src={author.avatarUrl} />
                <div className={styles.authorInfo}>
                    <strong>{author.name}</strong>  
                    <span>{author.role}</span>

                </div>
            </div>

            <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                {publisheDateRelativeNow} 
            </time>
        </header>

        <div className={styles.content}>
            {content.map(line => {
                if (line.type == 'paragraph') {
                    return <p key={line.content}>{line.content}</p>;
                } else if (line.type == 'link') {
                    return <p key={line.content}><a href="#">{line.content}</a></p>;   
                }
            })}
        </div>


        <form onSubmit={handleCreateNewComment} className={styles.commentForm}> 
            <strong>Deixe seu Feedback</strong> 
            <textarea 
                name = "comment" //consigo acessar o elemento atraves do name
                placeholder="Deixe um comentario"
                value={newCommentText} //o valor dele o primeiro param passo no useState
                //ou seja, quando o valor do estado mudar, a textarea reflete a alteração
                onChange={handleNewCommentChange} //monitora cada mudança no conteudo dessa textarea
                //cada mudança essa função e ativada
                required
                onInvalid={handleNewCommentInvalid}//e chamda sempre q o html indentifica q o user tentou fazer um submit, mas o texto e invalido
            />
            
            <footer>
                <button type="submit" disabled={isNewCommentEmpty}>
                    Publicar
                </button>
            </footer>
        </form>

        <div className={styles.commentList}>
            {comments.map(comment => { //percorre o arry de comments e retorna cada um deles como um componente Comment.
                return <Comment 
                            key={comment} 
                            content={comment} 
                            onDeleteComment={deleteComment}/> 
                            //passa como propriedade um 'conteudo', que é o texto atual do arry percorrido (comentario em si)
                            //posso passar uma funcao como pripropriedade
           })}

        </div>
       </article>
    )
}