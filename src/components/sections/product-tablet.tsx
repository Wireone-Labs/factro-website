import Image from "next/image";
import styles from "./product-tablet.module.css";

export interface ProductScreenshot {
  id: string;
  image: string;
  width: number;
  height: number;
  alt: string;
}

export function ProductTablet({ screenshot }: { screenshot: ProductScreenshot }) {
  return (
    <div id={screenshot.id} className={styles.tablet}>
      <div className={styles.camera} aria-hidden="true" />
      <div className={styles.screen}>
        <Image src={`/dashboard/${screenshot.image}`} alt={screenshot.alt} width={screenshot.width} height={screenshot.height} sizes="(min-width: 1920px) 1280px, (min-width: 1280px) 900px, (min-width: 1024px) 70vw, 90vw" draggable={false} />
      </div>
    </div>
  );
}
