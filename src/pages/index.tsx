import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { Router, useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import TodasAulas from '@/components/TodasAulas'
import logo from '../assets/logo.jpg'
import portao from '../assets/portao.png'

const inter = Inter({ subsets: ['latin'] })
// const router= useRouter();

export default function Home() {
  const router = useRouter();
  interface Agendamento {
      id: number;
      titulo: string;
      descricao: string;
      horarioentrada: string,
      status: string;
  }

  interface Props {
      agendamentoList: Agendamento[];
  } 
  const [agendamento, setAgendamento] = useState<Agendamento[]>([]);
  useEffect(() => {
       
          api.get('/agendamentos').then((res) => {
              setAgendamento(res.data)
          })

              .catch((err) => {
                  console.log(err)
                  alert("Error ao encontrar lista de agendamentos")
              })
       
  } ) 
  
    return(
      <>
       <Head>
        <title>Home</title> 
        <link rel="icon" href="https://curso.guilhermegulias.com/wp-content/uploads/2022/01/cropped-LOGO-NYNO-SEM-BORDA-PRA-LOGO.jpg" />
        </Head>
      <div> 
         <nav>
          <ul>
            <li><a href="/">
              <Image src={logo} className='logo' alt=''/>
               </a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            <li><a href="#"></a></li>
            
            <li><a href="#"> </a></li>
            <li><a href="/login">Login</a></li>
            <li><a href="/cadastro">Cadastro</a></li>
          </ul>
        </nav>
        <div style={{display:'flex'}}>
          <h1 className=''  style={{marginTop: '20%', marginLeft: '8%'}}>
            Seja bem vindo a Piano Room
          </h1>
          <Image src={portao} className='portao' alt=''/>
        </div>

      </div>
      <div >
        <h1 className="todasAsAulas">Aulas disponiveis</h1>
        {agendamento.map((agendamento, index) => (      
                  <div className="" key={index} align='center'>
                      <TodasAulas   user={agendamento}   /> 
                  </div>
              ))}
      </div>
      </>
    ) 
  
}
