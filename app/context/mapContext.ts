import { create } from "zustand";

type Position = {
  lat: number;
  lng: number;
};

type UpdatePosition = {
  lat: number;
  lng: number;
};

type Map = {
  position: {
    lat: number;
    lng: number;
  };
  updatePosition: (args: Position) => void;
  resultPosition: {
    lat: number | null;
    lng: number | null;
  };
  updateResultPosition: (args: Position) => void;
  toggleOpen: boolean;
  updateToggleOpen: (args: boolean) => void;
};

const useMapContext = create<Map>((set) => ({
  position: { lat: -5.4400196, lng: 105.2622609 },
  updatePosition: (args: Position) => set({ position: args }),
  resultPosition: {
    lat: null,
    lng: null,
  },
  updateResultPosition: (args) => set({ resultPosition: args }),
  toggleOpen: false,
  updateToggleOpen: (args) => set({ toggleOpen: args }),
}));

export { useMapContext };
