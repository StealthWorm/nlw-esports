export interface GameParams {
  id: string;
  title: string;
  banner: string;
}

// tipagem para definir as rotas possiveis de seleção
export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      home: undefined;
      game: GameParams;
    }
  }
}