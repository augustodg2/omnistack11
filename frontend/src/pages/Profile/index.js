import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'

import api from '../../services/api'

import './style.css'
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logoImg from '../../assets/logo.svg'


const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [incidents, setIncidents] = useState([])

  const history = useHistory()

  const id = localStorage.getItem('ongId')
  const name = localStorage.getItem('ongName')

  useEffect(() => {
    if (loading) {
      api.get('profile', {
        headers: {
          Authorization: id
        }
      })
        .then(response => setIncidents(response.data))
        .then(() => setLoading(false))
    }
  }, [id, loading])

  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.clear()
    localStorage.removeItem('ongId')
    localStorage.removeItem('ongName')
    history.push('/')
  }

  const handleDelete = async (incidentId) => {
    try {
      await api.delete(`incidents/${incidentId}`, {
        headers: {
          Authorization: id
        }
      })
      setIncidents(incidents.filter(incident => incident.id !== incidentId))
    } catch {
      alert('Erro ao deletar o caso, tente novamente')
    }
  }

  if (!localStorage.getItem('ongId') && !localStorage.getItem('ongName')) {
    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <img src={ logoImg } alt=""/>
        <span>Bem vinda, {name}</span>
        <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
        <button onClick={handleLogout}>
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        { loading
            ? <h2>Carregando casos...</h2>
            : incidents.length <= 0
              ? <h3>Não há casos registrados</h3>
              : incidents.map((incident) => (
                  <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                    <button onClick={() => handleDelete(incident.id)}>
                      <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                  </li>
                ))
        }
      </ul>
    </div>
  )
}

export default Profile
