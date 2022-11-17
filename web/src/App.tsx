// JSX Javscript + XML
import * as Dialog from '@radix-ui/react-dialog'; //usar radix para componentes como formularios
import 'keen-slider/keen-slider.min.css'

import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { GameList } from './components/GameList';

import logo from './assets/logo.svg';

import './styles/global.css';

// responsividade
// zod back
// login discord

function App() {
  // sm	640px	@media (min-width: 640px) { ... }
  // md	768px	@media (min-width: 768px) { ... }
  // lg	1024px	@media (min-width: 1024px) { ... }
  // xl	1280px	@media (min-width: 1280px) { ... }
  // 2xl	1536px
  return (
    <div className="flex flex-col max-w-[1344px] mx-auto items-center sm:my-5 lg:my-10">
      <img src={logo} alt="logo" className="sm:w-full sm:absolute sm:opacity-10 sm:z-0 xl:w-[250px] xl:relative xl:opacity-100" />

      <h1 className="text-white font-black mt-8 text-6xl xl:mt-4 sm:mt-20 sm:z-0">
        Seu <span className="bg-first-gradient bg-clip-text text-transparent">duo</span> esta aqui
      </h1>

      <GameList />

      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal />
      </Dialog.Root>
    </div >
  )
}

export default App
