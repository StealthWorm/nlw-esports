// JSX Javscript + XML
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'; //usar radix para componentes como formularios
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

import { CreateAdBanner } from './components/CreateAdBanner';
import { GameBanner } from './components/GameBanner';
import { CreateAdModal } from './components/CreateAdModal';

import logo from './assets/logo.svg';

import './styles/global.css';
import axios from 'axios';
import { ArrowElbowLeft, ArrowElbowRight, ArrowLeft, ArrowRight, ArrowUpRight, CaretLeft, CaretRight } from 'phosphor-react';

interface Game {
  id?: string,
  title: string,
  banner: string,
  _count: {
    ads: number;
  }
}

// responsividade
// zod back
// react-hook-form front
// login discord

function App() {
  const [games, setGames] = useState<Game[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    // loop: true,
    mode: "free",
    initial: 0,
    slides: {
      origin: "auto", 
      perView: 5.5,
      spacing: 40,
      number: games.length,
    },
    range: {
      min: 0,
      max: 5,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  return (
    <div className="flex flex-col max-w-[1344px] mx-auto items-center sm:my-5 lg:my-10">
      <img src={logo} alt="logo" />

      <h1 className="text-6xl text-white font-black mt-10">
        Seu <span className="bg-first-gradient bg-clip-text text-transparent">duo</span> esta aqui
      </h1>

      <div ref={sliderRef} className="keen-slider mt-8 w-full">
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

        {/* {loaded && instanceRef.current && (
          <div className="absolute flex w-full justify-between h-full items-center rounded-lg overflow-hidden">
            <div
              className={`flex cursor-pointer h-full items-center ${currentSlide === 0 ? 'pointer-events-none text-zinc-500' : 'pointer-events-auto text-white shadow-xl backdrop-blur-sm'}`}
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            >
              <CaretLeft size={40} />
            </div>
            <div
              className={`flex cursor-pointer h-full items-center ${currentSlide === instanceRef.current.track.details.slides.length - 1 ? 'pointer-events-none text-zinc-500' : 'pointer-events-auto text-white shadow-xl backdrop-blur-sm'}`}
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            >
              <CaretRight size={40} />
            </div>
          </div>
        )} */}
      </div>

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div >
  )
}

export default App
