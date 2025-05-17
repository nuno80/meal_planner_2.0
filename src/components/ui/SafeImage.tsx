// @filename: src/components/ui/SafeImage.tsx
"use client"; // Questo componente gestirà l'evento onError nel client

import React from 'react'; // useState non è usato qui, ma React sì

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string; // Prop opzionale per un URL di fallback personalizzato
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  onError, // Permette di passare un handler onError dall'esterno, se necessario
  fallbackSrc = "https://placehold.co/600x400/cccccc/ffffff?text=Image+Error&font=lora", // Fallback di default
  className, // Assicurati che className sia passato
  ...props // Raccoglie tutte le altre props standard di <img> (es. width, height, style)
}) => {
  // Non è necessario uno state locale per src, perché modifichiamo direttamente il target dell'evento
  // const [currentSrc, setCurrentSrc] = useState(src); // Non necessario

  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Chiama l'eventuale onError passato come prop, se esiste
    if (onError) {
      onError(event);
    }

    const target = event.target as HTMLImageElement;
    // Impedisce loop infiniti se anche l'immagine di fallback non riesce a caricare
    target.onerror = null; 

    if (fallbackSrc && target.src !== fallbackSrc) { // Controlla anche che non stiamo già provando il fallback
      target.src = fallbackSrc;
    } else if (!fallbackSrc) {
      // Se non c'è un fallbackSrc definito, potresti voler nascondere l'elemento img
      // o mostrare un'icona/testo di errore generico al posto dell'immagine rotta del browser.
      // Per semplicità, qui lo lasciamo mostrare l'icona di immagine rotta del browser.
      // target.style.display = 'none'; // Opzione per nasconderlo
    }
  };

  return (
    <img 
      src={src} 
      alt={alt} 
      onError={handleError}
      className={className} // Applica la classe passata
      {...props} // Passa tutte le altre props
    />
  );
};

export default SafeImage;