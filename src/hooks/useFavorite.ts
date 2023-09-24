'use client';
import { useEffect, useState } from 'react';


export const useFavorite = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
      const item = localStorage.getItem("favorites");
      return item ? JSON.parse(item) : [];
  })

  useEffect(() => {
    console.log(favorites);
    saveFavorite(favorites);
  }, [favorites]);

  const readFavorite = () => {
    var arrString = localStorage.getItem("favorites");
    return (!!arrString) ? JSON.parse(arrString) : [];
  }

  const saveFavorite = (value: number[]) => {
    localStorage.setItem("favorites", JSON.stringify(value));
  }

  const addFavorite = (id: number) => {
    var arr: number[] = readFavorite();
    arr.push(id);
    setFavorites(arr);
  }

  const removeFavorite = (id: number) => {
    var arr: number[] = readFavorite();
    let idx = arr.indexOf(id);
    if (idx !== -1) {
      arr.splice(idx);
      setFavorites(arr);
    }
  }

  return {
    favorites,
    addFavorite,
    removeFavorite
  };
}