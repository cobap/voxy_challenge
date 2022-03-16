import React, { useState } from 'react';

// Imports Material UI
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import './App.css';

const App = () => {

  // State needed to control text-area
  const [texto, setTexto] = useState('');
  const [quantidadePalavras, setQuantidadePalavras] = useState(0);
  const [textoAjuda, setTextoAjuda] = useState(null);

  // Nosso método vai contar quantas palavras existem na caixa de texto
  // This method will count how many words there is in a sentence (our text area)
  const conta_palavras = () => {

    // Validamos se de fato alguem digitou algum texto
    // Check if there is any input from our end user
    if (texto.replace(/\s+/g, '').trim() === '') {
    
      console.log('Não digitou nada');
      setQuantidadePalavras(-1);
      setTextoAjuda('Type at least one word. Also whitespaces does not count.')
    }
    else {

      // Inspiration: https://www.invertexto.com/contador-caracteres
      // Método inspirado no link: https://www.invertexto.com/contador-caracteres

      // Normalizamos NFD para remover acentos (é, â, etc)
      // We run NFD to remove special char

      // Removemos quebra de linhas e trocamos por espaço (a ordem é importante aqui, se fizermos isso depois, juntamos palavras)
      // Remove linebreaks on others spaces. The order is critical. We need to run this before anything else

      // Usando regex, removemos tudo que não são letras
      // Using regex to filter non-char

      // Depois usamos outros regex para identificar espaços duplos dentro da string, trocando por 1 espaço só
      // Then another regex to remove duple spaces

      // Fazemos o trim para remover espaço extra no início e fim da string
      // Trim to remove leading spaces

      let texto_formatado = texto.normalize('NFD').replace(/(\r\n|\n|\r)/g, " ").replace(/[^a-zA-Z ]/g, "").replace(/\s+/g, ' ').trim()
      let contagem_palavras = texto_formatado.split(' ').length;

      setTextoAjuda(null)
      setQuantidadePalavras(contagem_palavras);

    }


  }

  return (      
      <Box className='main'>
        <Typography variant="h1" component="div" gutterBottom> Contador de palavras / Word Counter 🔮 </Typography>
        <Typography variant='p'> Stop counting manually that long tweet and send it right awa...</Typography>
        
        <TextField id='caixa_texto' label='Digite seu texto aqui' multiline rows={10} sx={{ marginTop: 2, marginBottom: 2, width: 600 }}
          onChange={(evento) => setTexto(evento.target.value)}
        error={quantidadePalavras === -1} helperText={textoAjuda}
        />
        
        <Button variant="contained" size="large" color="secondary" onClick={conta_palavras}> Count for me! </Button>

        {/* Aqui aproveitamos da condicional para mostrar o resultado só caso tenhamos uma quantidade de palavras correta
            Using conditional rendering to show our output to end-user
        */}
        { quantidadePalavras > 0 && 
        <Typography sx={{marginTop: 5, marginBottom: 10}} variant='p'> We've counted {quantidadePalavras} words in your sentence.</Typography>
        }
  
      </Box>
  );
}


export default App;
