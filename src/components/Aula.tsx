import { api } from "@/lib/axios";
import img from "../assets/agenda.png"
import Close from "../assets/close.png"
import Image from "next/image"
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Editar from "./Editar";
import Modal from "./Modal";

interface Agendamento {
    id: number,
    usuario:{
        id: number,
      },
    titulo: string,
    descricao: string,
    horarioentrada: string,
    status: string,
}

interface Props {
    user: Agendamento;
}

const Aula: React.FC<Props> = ({ user  }, idAgd) => {
    let  alterarT = false;
    console.log(user)
    const [OpenModal2, setOpenModal2] = useState(false)

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
                    <button className="close-1"  onClick={apagarAgenda}>
                        <Image className="close"  src={Close} alt={"Butao de fecha"} />
                    </button> 
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
                            <Image className="imagem" src={img} alt={"Foto do professor(a)"} />
                        </div>
                    </div>
                </div>
                <div className="parent-div rodape">
                    <div className="text-1 texto" onClick={() => setOpenModal2(!OpenModal2)}>
                        <p>{user.horarioentrada}</p>
                    </div>
                     
                </div>
            </div>
            <Modal isOpen={OpenModal2} setModalOpen={() => setOpenModal2(!OpenModal2)} >
                <Editar  user={user}  OpenModal2={OpenModal2}  setOpenModa={() => setOpenModal2(!OpenModal2)} />
            </Modal>
        </div>
    );
};

export default Aula;

