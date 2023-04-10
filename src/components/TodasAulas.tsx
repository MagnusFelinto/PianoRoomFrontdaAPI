import { api } from "@/lib/axios";
import img from "../assets/agenda.png"
import Close from "../assets/close.png"
import Image from "next/image"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Editar from "./Editar";
import Modal from "./Modal";

interface Agendamento {
    id: number;
    usuario: {
        id: Number,
        nome: String,
        urlavatar: String,
        email: String,
        senha: String
    };
    titulo: string;
    descricao: string;
    horarioentrada: string,
    status: string;
   
}

interface Props {
    user: Agendamento;
}
interface Usuario {
    id: Number,
    nome: String,
	urlavatar: String,
	email:  String,
	senha:  String
}

interface Prof {
    prof: Usuario;
}
const TodasAulas: React.FC<Props> = ({ user  }) => {
    const [usuario, setUsuario] = useState<Usuario>();
 
    const [OpenModal2, setOpenModal2] = useState(false)
    useEffect(() => {
        if (user.usuario.id) {
            api.get(`/usuario/${user.usuario.id}`).then((res) => {
                setUsuario(res.data);
            })
        } 
    } ) 
    async function apagarAgenda(){
        try {
          const response = await api.delete(`/agendamentos/${user.id}`)
    
          if(response.status === 204){
            alert("Agenda apagada com sucesso")
          } 
    
        } catch (error) {
          console.log(error)
          alert(`não foi possivel apagar a tarefa id: ${user.id}`)
        }
      
      }
    return (
        <div> 
            <div className="caixa campo"  >
                    
                <div className="d1" align="center"> 
                    <h1 className="titulo" onClick={() => setOpenModal2(!OpenModal2)}>
                        {user.titulo}
                    </h1>
                </div>
           
                <div className="" >
                    <div className="parent-div">
                        
                        <div className="box-2 text-div" onClick={() => setOpenModal2(!OpenModal2)}>
                            <p className="descricao">{user.descricao}</p>
                        </div>
                        <div className="box-1" align="center"> 
                            <img src={`${user.usuario.urlavatar}`} className="perfilProf"></img>
                        </div>
                    </div>
                </div>
                <div className="parent-div rodape">
                    <div className="text-1 texto" onClick={() => setOpenModal2(!OpenModal2)}>
                        <div className="rod-1">
                            <p>{user.horarioentrada}</p>
                        </div> 
                        <div className="rod-2">
                            <p className="nomedoprofessor">{user.usuario.nome}</p>
                        </div>
                    </div>
                     
                </div>
            </div>
            
        </div>
    );
};

export default TodasAulas;

