
import styles from '@/styles/Home.module.css'
interface Props {
    id: number;
    titulo: string;
    descricao: string;
    status: string;
  }
export function Agenda(props: Props){

    return(
      <div className="campo">
        <div className="d1">
            <h1 className="titulo">{props.titulo}</h1>
            <div className='descricaobox'>
                <p className="descricao" >{props.descricao} fafasda </p>
                <p>{props.id}</p>
            </div>
        </div>
        <div className="d2">
            <button className='inicia'>{props.status}</button>
            <button className="exclui bg-white" value={props.id} ></button>
        </div>
      </div>
    )
}