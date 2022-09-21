interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
  return (
    <a href="" className={"flex rounded-lg overflow-hidden keen-slider__slide"}>
      <img src={props.bannerUrl} alt="game" className="cover w-full" />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 sm:px-2 sm:pb-2 xl:pb-4 xl:px-4">
        <strong className="font-bold text-white block sm:text-[10px] xl:text-lg">{props.title}</strong>
        <span className="font-bold text-zinc-300 text-sm block sm:text-[10px] xl:text-md">{props.adsCount} anúncio(s)</span>
      </div>
    </a>
  )
}
