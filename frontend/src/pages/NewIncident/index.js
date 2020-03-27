import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api'

import './style.css'
import logoImg from '../../assets/logo.svg'

const NewIncident = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')

  const history = useHistory()
  const ongId = localStorage.getItem('ongId')

  if (!localStorage.getItem('ongId') && !localStorage.getItem('ongName')) {
    history.push('/')
  }

  const handleNewIncident = async (e) => {
    e.preventDefault()

    const newIncident = {
      title,
      description,
      value
    }

    try {
      await api.post('incidents', newIncident, {
        headers: {
          Authorization: ongId
        } 
      })
      history.push('/profile')
    } catch (err) {
      console.log('Erro ao criar caso, tente novamente');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero "/>
          
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          
          <Link className="nav-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewIncident
