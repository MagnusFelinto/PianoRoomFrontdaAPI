import { FormEvent, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { Agenda } from '../components/Agenda'
import  Modal  from '../components/Modal'
import { useRouter } from 'next/router'
import Aula from '../components/Aula'
import Editar from '@/components/Editar'
import Image from "next/image"; 
import agenda from "../assets/agenda.png"  


export default function agendamento() {
  const [OpenModal,  setOpenModal]  = useState(false)
  const router = useRouter();
  let { token } = router.query
  
 
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
    agendamentoList: Agendamento[];
}
const BACKGROUND_STYLE = {
        position: 'fixed',
        top: '0',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgb(0,0,0, 0.7)',
        zIndex: '1000'
    }

    const MODAL_STYLE = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        padding: '150px',
        backgroundColor: '#c0c0c0',
        borderRadius: '10px',
        color: 'black'
    }

    const BOX_STYLE = {
        alignText: 'center',
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        background: "rgba(0, 0, 0, 0.89)",
        borderRadius: "8px",
        padding: "70px 80px",
    }

    const buttonStyles = `
  button {
    position: relative;
    background: #444;
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    border: none;
    letter-spacing: 0.1rem;
    font-size: 0.8rem;
    padding: 0.8rem 1rem;
    transition: 0.2s;
  }

  button:hover {
    letter-spacing: 0.2rem;
    padding: 0.9rem 1.2rem;
    background: #0FF0FC;
    color: #0FF0FC;
    /* box-shadow: 0 0 35px var#0FF0FC; */
    animation: box 3s infinite;
  }

  button::before {
    content: "";
    position: absolute;
    inset: 2px;
    background: #272822;
  }

  button span {
    position: relative;
    z-index: 1;
  }
  button i {
    position: absolute;
    inset: 0;
    display: block;
  }

  button i::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    left: 80%;
    top: -2px;
    border: 2px solid #0FF0FC;
    background: #272822;
    transition: 0.2s;
  }

  button:hover i::before {
    width: 15px;
    left: 20%;
    animation: move 3s infinite;
  }

  button i::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 2px;
    left: 20%;
    bottom: -2px;
    border: 2px solid #0FF0FC;
    background: #272822;
    transition: 0.2s;
  }

  button:hover i::after {
    width: 15px;
    left: 80%;
    animation: move 3s infinite;
  }
`;
    const inputContainerStyle = `
.input-container {
  position: relative;
  margin-bottom: 25px;
}

.input-container label {
  position: absolute;
  top: 0px;
  left: 0px;
  font-size: 16px;
  color: #fff;
  pointer-event: none;
  transition: all 0.5s ease-in-out;
}

.input-container input {
  border: 0;
  border-bottom: 1px solid #555;
  background: transparent;
  width: 100%;
  padding: 8px 0 5px 0;
  font-size: 16px;
  color: #fff;
}

.input-container input:focus {
  border: none;
  outline: none;
  border-bottom: 1px solid #32aad3;
}

.input-container input:focus ~ label,
.input-container input:valid ~ label {
  top: -12px;
  font-size: 12px;
}
`;
 
    const [id, setId] = useState(0);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [horarioentrada, setHorarioentrada] = useState('');
    const [reserva, setReserva] = useState("AGENDADA");
    async function CadastroAgendamento(event: FormEvent) {
        event.preventDefault()
        try {
            const response = await api.post("/agendamentos", {
                usuario: {
                    id: Number (token),
                },
                titulo: titulo,
                descricao: descricao,
                horarioentrada: horarioentrada,
                status:reserva,
            })

            if (response.status === 201) {
                setId(0)
                setTitulo("")
                setDescricao("")
                setHorarioentrada("")
                setReserva("")
                alert("Agendamento cadastrado com sucesso!")
                router.push(`/agendamentos?token=${token}`)
            }

        } catch (error) {
            console.log(error)
            alert("Falha ao efetuar cadastro do agendamento Dados:" + ` usuario: ${token}, titulo: ${titulo}, descricao : ${descricao}, horarioentrada : ${horarioentrada}, status : ${reserva},`)
        }
    }
const [agendamento, setAgendamento] = useState<Agendamento[]>([]);
 
useEffect(() => {
    if (token) {
        api.get(`/agendamentos/user/${token}`).then((res) => {
            setAgendamento(res.data)
            console.log(agendamento)
        }) 
            .catch((err) => {
                console.log(err)
                alert("Error ao encontrar lista de agendamentos")
            })
    } 
}, [token])  
  return (<> 
   
        <div align='center'>
            <button className='novaAula'    onClick={() => setOpenModal(true)}>Nova Aula</button>
            <Modal  isOpen={OpenModal} setModalOpen={() => setOpenModal(!OpenModal) } token={token}  >
            <div style={BACKGROUND_STYLE}>
                <div className="" style={BOX_STYLE}>
                    <span style={{ cursor: 'pointer', position: 'absolute', top: '5%', right: '5%', color: "#0ff0fc" }} onClick={() => setOpenModal(false)} >
                        X
                    </span>
                    <div>
                        <form onSubmit={CadastroAgendamento}>
                            <span className="text-center">Novo agendamento</span>
                            <div align="center" >
                                <Image src={agenda} style={{ position: 'relative', marginTop: '-80px' }} alt="" />
                            </div>

                            <div className="input-container">
                                <input type="text" onChange={event => setTitulo(event.target.value)} value={titulo} />
                                <label>Titulo</label>
                            </div>
                            <div className="input-container">
                                <input type="text" onChange={event => setDescricao(event.target.value)} value={descricao} />
                                <label>Descrição</label>
                            </div>
                            <div className="input-container">
                                <input type="text" onChange={event => setHorarioentrada(event.target.value)} value={horarioentrada} />
                                <label>Horario</label>
                            </div>
                            <div align="center">
                                <input type="hidden" onChange={event => setReserva(event.target.value)} value={"AGENDADA"} />
                                <button type="submit" className="button">
                                    <span>Agendar</span><i></i>
                                </button> 
                            </div>
                        </form>
                    </div>
                </div>

            </div>
            </Modal> 
             { agendamento.length == 0 ? 
             <div >
                <h1 className=''style={{position:'absolute', marginTop: '50vh', marginLeft: '30vw'}} > 
                      Comece a agenda suas aulas agora mesmo
                </h1>
             </div>:
             agendamento.map((agendamento, index) => ( 
                 
              <div className="" key={index}>
                    <Aula   user={agendamento} /> 
                </div>
            ) )
             }
           
        </div>
        </>)
}