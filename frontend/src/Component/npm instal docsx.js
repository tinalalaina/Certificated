// src/components/DiplomeDisplay.js
import React, { useRef, useEffect } from 'react';
import diplomeImage from '../assets/diplome.jpg'; // Assurez-vous que l'image est dans le dossier assets

const DiplomeDisplay = ({ nom, prenom, mention }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = diplomeImage;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      ctx.font = '24px Arial';
      ctx.fillStyle = 'white';
      ctx.fillText(`${nom} ${prenom}`, canvas.width / 2, canvas.height / 3);

      ctx.font = '20px Arial';
      ctx.fillText(mention, canvas.width / 2, canvas.height / 2.5);
    };
  }, [nom, prenom, mention]);

  const downloadDiplome = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'diplome.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: 'auto' }}>
      <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
      <button onClick={downloadDiplome} style={{ marginTop: '20px', display: 'block' }}>
        Télécharger le diplôme
      </button>
    </div>
  );
};

export default DiplomeDisplay;