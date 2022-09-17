import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController, CaretDown, CaretUp } from 'phosphor-react';

import { Input } from '../components/Form/input';
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  const [gameSelected, setGameSelected] = useState("")

  // console.log(weekDays)
  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [])

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    console.log(gameSelected);

    if (!data.name) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/games/${gameSelected}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChat: useVoiceChannel
      })

      alert('Anúncio criado com sucesso!')
    } catch (err) {
      console.log(err)
      alert('Erro ao criar o anúncio!')
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-gradient-to-b from-black/60 to-violet-900/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634]/80 backdrop-blur-md  py-8 px-10 text-white shadow-xl shadow-violet-800/80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px]">
        <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <Select.Root
              // value={gameSelected}
              onValueChange={setGameSelected}
            >
              <Select.Trigger className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 inline-flex justify-between">
                <Select.Value placeholder="Selecione o game que deseja jogar" defaultValue="" />
                <Select.Icon >
                  <CaretDown size={18} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal className="bg-zinc-900/70 backdrop-blur-md rounded text-sm text-zinc-100 w-full -mt-1">
                <Select.Content className="rounded-md shadow-md shadow-black">
                  <Select.SelectScrollUpButton className="flex w-full items-center justify-center h-8 text-zinc-100  bg-gradient-to-b from-violet-500/40 to-zinc-500/0">
                    <CaretUp size={20} />
                  </Select.SelectScrollUpButton>

                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    {games.map((game) => {
                      return (
                        <Select.Item value={game.id} className="hover:bg-zinc-800 py-2 px-4" key={game.id}>
                          <Select.ItemText>{game.title}</Select.ItemText>
                          <Select.ItemIndicator />
                        </Select.Item>
                      )
                    }
                    )}
                  </Select.Viewport>
                  <Select.ScrollDownButton className="flex w-full items-center justify-center h-8 text-zinc-100  bg-gradient-to-t from-violet-500/40 to-zinc-500/0">
                    <CaretDown size={20} />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Como te chamam dentro do game?"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input id="discord" name="discord" type="text" placeholder="Usuario#0000" />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar?</label>
              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={setWeekDays}
              >
                <ToggleGroup.Item
                  value="0"
                  title="Domingo"
                  className={`w-8 h-8 rounded ${weekDays.includes("0") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  D
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="1"
                  title="Segunda"
                  className={`w-8 h-8 rounded  ${weekDays.includes("1") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="2"
                  title="Terça"
                  className={`w-8 h-8 rounded  ${weekDays.includes("2") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  T
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="3"
                  title="Quarta"
                  className={`w-8 h-8 rounded  ${weekDays.includes("3") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="4"
                  title="Quinta"
                  className={`w-8 h-8 rounded ${weekDays.includes("4") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  Q
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="5"
                  title="Sexta"
                  className={`w-8 h-8 rounded  ${weekDays.includes("5") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
                <ToggleGroup.Item
                  value="6"
                  title="Sábado"
                  className={`w-8 h-8 rounded ${weekDays.includes("6") ? 'bg-violet-500' : 'bg-zinc-900'}`}
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual o horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input required id="hourStart" name="hourStart" type="time" placeholder="De" />
                <Input required id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
              </div>
            </div>
          </div>

          <div className="mt-2  flex gap-2 text-sm items-center">
            <Checkbox.Root
              checked={useVoiceChannel}
              className="w-6 h-6 rounded bg-zinc-900 p-1"
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true)
                } else {
                  setUseVoiceChannel(false)
                }
              }}
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costume me conectar ao chat de voz
          </div>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors">
              Cancelar
            </Dialog.Close>
            <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors">
              <GameController size={24} />
              Encontrar
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal >
  )
}