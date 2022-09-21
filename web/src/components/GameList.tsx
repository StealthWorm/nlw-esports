import axios from 'axios';
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider, KeenSliderPlugin } from 'keen-slider/react'
import { CaretLeft, CaretRight } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { GameBanner } from './GameBanner';

interface Game {
  id?: string,
  title: string,
  banner: string,
  _count: {
    ads: number;
  }
}

export function GameList() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const [games, setGames] = useState<Game[]>([])
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    // loop: true,
    // mode: "free",
    initial: 0,
    slides: {
      perView: 5.5,
      spacing: 40,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
    created() {
      setLoaded(true)
    },
  })

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])


  return (
    <div className="mt-8 w-full overflow-hidden">
      <div className="keen-slider" ref={sliderRef}>
        {games.map((game) => {
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
      {/* {loaded && instanceRef.current && (
        <div className="flex absolute top-0 w-full justify-between h-full items-center rounded-lg overflow-hidden">
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
  )
}
