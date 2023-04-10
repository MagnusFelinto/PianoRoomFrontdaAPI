import { api } from "@/lib/axios";
import img from "../assets/agenda.png"
import Close from "../assets/close.png"
import Image from "next/image"
import React, { FormEvent, useEffect, useState } from 'react';
import router, { useRouter } from "next/router";
 


interface Agendamento {
    id: number;
    usuario:{
      id: number
    };
    titulo: string;
    descricao: string;
    horarioentrada: string,
    status: string;
}

interface Props {
    user: Agendamento;
}
interface UsuarioID {
  usuario:{
    id: number
  };
}
interface Props {
  usuario: UsuarioID;
}


const Editar: React.FC<Props> = ({ user, setOpenModa, OpenModal2}  ) => { 
    const [titulo,        setTitulo]        = useState(user.titulo); 
    const [descricao,     setDescricao]     = useState(user.descricao);
    const [horarioentrada,setHorarioentrada]= useState(user.horarioentrada);
 
    const router2 = useRouter();
    let   {token}  = router.query 
    



    async function apagarAgenda(){
        try {
          const response = await api.delete(`/agendamentos/${user.id}`)
    
          if(response.status === 204){
            alert("Agenda apagada com sucesso")
          }  
        } catch (error) {
          console.log(error)
          alert(`Não foi possivel apagar a agenda id: ${user.id}`)
        }
      
      }
 
      // Grandes bugs geram grandes gambiarras
      let [agendamento, setAgendamento] = useState(user);
 
      useEffect(() => { 
        api.get(`/agendamentos/${user.id}`).then((res) => {
            setAgendamento(res.data)
        }) 
            .catch((err) => { 
                alert("Error ao encontrar lista de agendamentos")
            })
     
      }) 
      
       function editarAgenda(event: FormEvent){ 
        event.preventDefault()
        
        try {
            api.put(`/agendamentos/editar/${user.id}`,{
        
              titulo  : titulo,
              descricao  : descricao,
              horarioentrada : horarioentrada 
 
              }).then((res)=>{
                
                if(res.status === 200){ 
                  setTitulo('')
                  setDescricao('')
                  setHorarioentrada('') 
                  alert(`Alteracao feita com sucesso`)   
                }
              })
             
           } 
           catch (error) {  
              alert(`Falha ao editar agendamento  titulo: ${titulo} descricao: ${descricao} Hora: ${horarioentrada}`) 
            } 
        router2.push(`/agendamentos?token=${token}`)
  
      } 
    return (
        <form onSubmit={editarAgenda}> 
           
            <div className="caixa campo"  >
                    <button  className="subicard" onClick={setOpenModa} > 
                    </button>
                <div className="d1" align="center">
                    <input type="text"   className="titulo" onChange={event => setTitulo(event.target.value)} value={titulo} placeholder={user.titulo} />
                </div>
                <div className="" >
                    <div className="parent-div">
                        
                        <div className="box-2 text-div" >
                            <input type="text" className="descricao-input" onChange={event => setDescricao(event.target.value)} value={descricao}  placeholder={user.descricao}/>
                        </div>
                        <div className="box-1" align="center">
                           <input  className="btn-salvar " type="submit" value={"Salvar"} />
                           <button onClick={apagarAgenda} className="btn-exclui">Excluir</button>
                        </div>
                    </div>
                </div>
                <div className="parent-div rodape">
                    <div className="text-1 texto" >
                        <input className="  texto" type="text" onChange={event => setHorarioentrada(event.target.value)} value={horarioentrada}  placeholder={user.horarioentrada}/>
                    </div>  
                </div>
            </div>
        </form>
    );
};

export default Editar;