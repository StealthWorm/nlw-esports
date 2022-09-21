import { useEffect, useState, FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Label from '@radix-ui/react-label';
import { Check, GameController, CaretDown, CaretUp, StarFour } from 'phosphor-react';
import { Resolver, useForm, FieldValues } from "react-hook-form";

import { Input, FormValues } from '../components/Form/input';
import axios from 'axios';
import Toggle from './Form/Toggle';

interface Game {
  id: string;
  title: string;
}

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)
  const [gameSelected, setGameSelected] = useState("")

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FieldValues>();
  const onSubmit = handleSubmit((data, e: any) => handleCreateAd(data, e));

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => {
      setGames(response.data)
    })
  }, [reset])

  // console.log(weekDays)

  async function handleCreateAd(data: FieldValues, event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const values = Object.fromEntries(formData);
    data = values;

    // console.log(data)

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

      window.dispatchEvent(new KeyboardEvent('keydown', {
        key: "escape",
        keyCode: 27,
      }));
      
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

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">Qual o game?</label>
            <Select.Root {...register("game", { required: !gameSelected })} onValueChange={setGameSelected}  >
              <Select.Trigger className={`bg-zinc-900 py-3 px-4 rounded text-sm  inline-flex justify-between items-center relative focus ${!gameSelected && errors.game ? "border border-red-500 text-zinc-500" : ""} ${gameSelected ? "text-zinc-100" : "text-zinc-500"}`}>
                <Select.Value placeholder="Selecione o game que deseja jogar" />
                <Select.Icon>
                  <CaretDown size={18} />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal className="flex w-full overflow-hidden rounded-md shadow-md shadow-black bg-zinc-900/70 backdrop-blur-md">
                <Select.Content className="text-zinc-100">
                  <Select.SelectScrollUpButton className="flex items-center justify-center h-8 text-zinc-100 bg-gradient-to-b from-violet-500/40 to-zinc-500/0 ">
                    <CaretUp size={20} />
                  </Select.SelectScrollUpButton>

                  <Select.Viewport>
                    {games.map((game) => {
                      return (
                        <Select.Item value={game.id} className="hover:bg-zinc-800 py-2 px-6 flex items-center" key={game.id}>
                          <Select.ItemIndicator className="absolute left-2 text-violet-500">
                            <StarFour size={10} />
                          </Select.ItemIndicator>
                          <Select.ItemText>{game.title}</Select.ItemText>
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
            {!gameSelected && errors.game && <span className="text-[12px] text-red-500 -mt-1">É preciso informar um jogo</span>}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Seu nome (ou nickname)</label>
            <Input
              id="name"
              type="text"
              placeholder="Como te chamam dentro do game?"
              register={register}
              required={true}
              errors={errors.name}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
              <Input register={register}
                id="yearsPlaying"
                name="yearsPlaying"
                type="number"
                min="0"
                max="100"
                placeholder="Tudo bem ser ZERO"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="discord">Qual seu Discord?</label>
              <Input register={register}
                id="discord"
                name="discord"
                type="text"
                placeholder="Usuario#0000"
              />
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
                <Toggle value="0" title="Domingo" text="D" checked={weekDays.includes("0")} />
                <Toggle value="1" title="Segunda" text="S" checked={weekDays.includes("1")} />
                <Toggle value="2" title="Terça" text="T" checked={weekDays.includes("2")} />
                <Toggle value="3" title="Quarta" text="Q" checked={weekDays.includes("3")} />
                <Toggle value="4" title="Quinta" text="Q" checked={weekDays.includes("4")} />
                <Toggle value="5" title="Sexta" text="S" checked={weekDays.includes("5")} />
                <Toggle value="6" title="Sábado" text="S" checked={weekDays.includes("6")} />
              </ToggleGroup.Root>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual o horário do dia?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input register={register}
                  id="hourStart"
                  name="hourStart"
                  type="time"
                  placeholder="De"
                />
                <Input register={register}
                  id="hourEnd"
                  name="hourEnd"
                  type="time"
                  placeholder="Até"
                />
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
            <Dialog.Close type="button" className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors" onClick={() => { reset(); setGameSelected("") }}>
              Cancelar
            </Dialog.Close>
            <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600  transition-colors">
              <GameController size={24} />
              Encontrar
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal >
  )
}