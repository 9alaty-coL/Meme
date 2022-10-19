import { Button } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import styles from "./Gallery.module.css";

const apiUrl = "https://api.imgflip.com/get_memes";

interface Meme {
  readonly id: string;
  readonly name: string;
  readonly url: string;
}

const GalleryComponent: FC = () => {
  const [getMeme, setGetMeme] = useState(false);
  const [memes, setMemes] = useState<readonly Meme[]>([]);
  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        alert('Fetch successfully!')
        setMemes(result.data.memes)
      });
  }, [getMeme]);
  return (
    <div className={styles["gallery"]}>
      <Button
        className={styles["gallery__button"]}
        variant="contained"
        onClick={() => setGetMeme((prev) => !prev)}
      >
        Re-fetch memes
      </Button>
      <div className={styles["gallery__memes"]}>
        {memes.map((meme) => (
          <img className={styles["gallery__meme"]} alt="" src={meme.url} />
        ))}
      </div>
    </div>
  );
};

export const Gallery = memo(GalleryComponent);
