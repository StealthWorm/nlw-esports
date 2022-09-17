// JSX Javscript + XML
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'; //usar radix para componentes como formularios

import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import { CreateAdModal } from './components/CreateAdModal';

import logo from './assets/logo.svg';

import './styles/global.css';
import axios from 'axios';

interface Game {
  id?: string,
  title: string,
  banner: string,
  _count: {
    ads: number;
  }
}

// responsividade
// keen-slider para carrossel
// zod back
// react-hook-form front
// login discord
function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  return (
    <div className="flex flex-col max-w-[1344px] mx-auto items-center sm:my-5 lg:my-10">
      <img src={logo} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-10">
        Seu <span className="bg-first-gradient bg-clip-text text-transparent">duo</span> esta aqui
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-8">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.banner}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
